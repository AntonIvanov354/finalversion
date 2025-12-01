# torch - основной фреймворк для нейросетей
#
# transformers - библиотека для готовых моделей ИИ
#
# datasets - для работы с датасетами
#
# rouge_score - для оценки качества суммаризации
#
# nltk - для обработки естественного языка
#
# flask - для создания веб-сервера
import torch
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    DataCollatorForSeq2Seq,
    Seq2SeqTrainingArguments,
    Seq2SeqTrainer,
    pipeline
)
from datasets import load_dataset
import numpy as np
from rouge_score import rouge_scorer
import nltk
from flask import Flask, request, jsonify
import pandas as pd
import warnings
import re

warnings.filterwarnings('ignore')

try:
    nltk.download('punkt', quiet=True)
except:
    pass


class RussianTextSummarizer:
    def __init__(self, model_name="IlyaGusev/rut5_base_sum_gazeta"):
        self.model_name = model_name
        self.tokenizer = None
        self.model = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Используется устройство: {self.device}")

    def load_model(self):
        """Загрузка предобученной модели"""
        print("Загрузка модели и токенизатора...")
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(self.model_name)
        self.model.to(self.device)
        print("✅ Модель успешно загружена!")

    def split_text_into_chunks(self, text, max_chunk_size=2000):
        """Разбивает текст на осмысленные части"""
        # Разбиваем по предложениям
        sentences = re.split(r'(?<=[.!?])\s+', text)

        chunks = []
        current_chunk = ""

        for sentence in sentences:
            # Если добавление предложения не превысит лимит
            if len(current_chunk) + len(sentence) <= max_chunk_size:
                current_chunk += sentence + " "
            else:
                # Сохраняем текущий чанк и начинаем новый
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = sentence + " "

        # Добавляем последний чанк
        if current_chunk:
            chunks.append(current_chunk.strip())

        return chunks

    def summarize_large_text(self, text, target_length=10000, max_chunk_size=2000):
        """Суммаризация больших текстов"""
        if self.model is None:
            self.load_model()

        print(f"📊 Обрабатываю текст: {len(text)} символов")

        # Разбиваем текст на части
        chunks = self.split_text_into_chunks(text, max_chunk_size)
        print(f"📁 Разбито на {len(chunks)} частей")

        summaries = []
        total_summary_length = 0

        for i, chunk in enumerate(chunks, 1):
            print(f"🔍 Обрабатываю часть {i}/{len(chunks)}...")

            # Определяем длину суммаризации для этой части
            chunk_ratio = len(chunk) / len(text)
            chunk_target_length = max(100, int(target_length * chunk_ratio))

            try:
                chunk_summary = self.summarize_text(
                    chunk,
                    max_length=chunk_target_length + 100,
                    min_length=chunk_target_length - 50
                )
                summaries.append(chunk_summary)
                total_summary_length += len(chunk_summary)

                print(f"✅ Часть {i}: {len(chunk)} → {len(chunk_summary)} символов")

            except Exception as e:
                print(f"❌ Ошибка в части {i}: {e}")
                # В случае ошибки добавляем оригинальный чанк
                summaries.append(chunk[:500] + "...")

        # Если суммарная длина все еще больше целевой, делаем финальную суммаризацию
        if total_summary_length > target_length * 1.2:
            print("🎯 Делаю финальную суммаризацию...")
            combined_summary = " ".join(summaries)
            final_summary = self.summarize_text(
                combined_summary,
                max_length=target_length + 1000,
                min_length=target_length - 1000
            )
            return final_summary
        else:
            return " ".join(summaries)

    def summarize_text(self, text, max_length=150, min_length=30, num_beams=4):
        """Суммаризация текста (базовая версия)"""
        if self.model is None:
            self.load_model()

        # Ограничиваем длину входного текста
        if len(text) > 3000:
            text = text[:3000] + "... [текст обрезан]"

        inputs = self.tokenizer(
            text,
            max_length=1024,
            truncation=True,
            padding=True,
            return_tensors="pt"
        ).to(self.device)

        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_length=max_length,
                min_length=min_length,
                num_beams=num_beams,
                early_stopping=True,
                repetition_penalty=2.5,
                length_penalty=1.0,
                no_repeat_ngram_size=3
            )

        summary = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return summary

    def preprocess_function(self, examples, max_input_length=512, max_target_length=128):
        """Предобработка данных для обучения"""
        inputs = examples["text"]
        targets = examples["summary"]

        model_inputs = self.tokenizer(
            inputs,
            max_length=max_input_length,
            truncation=True,
            padding="max_length",
            return_tensors="pt"
        )

        labels = self.tokenizer(
            targets,
            max_length=max_target_length,
            truncation=True,
            padding="max_length",
            return_tensors="pt"
        )

        model_inputs["labels"] = labels["input_ids"]
        return model_inputs

    def load_and_prepare_data(self):
        """Загрузка и подготовка датасета"""
        print("📊 Загрузка датасета...")

        try:
            dataset = load_dataset("IlyaGusev/gazeta", split="train[:500]")
            dataset = dataset.train_test_split(test_size=0.1, seed=42)

            tokenized_datasets = dataset.map(
                self.preprocess_function,
                batched=True,
                remove_columns=dataset["train"].column_names
            )

            return tokenized_datasets
        except Exception as e:
            print(f"Ошибка загрузки датасета: {e}")
            return self.create_sample_data()

    def create_sample_data(self):
        """Создание демо-данных если датасет недоступен"""
        print("Создание демо-данных...")

        sample_data = {
            "text": [
                "Российские ученые разработали новую систему искусственного интеллекта для анализа медицинских снимков. Технология показала эффективность в 95% случаев и может значительно ускорить процесс диагностики заболеваний.",
                "Компания Яндекс запустила сервис для автоматического реферирования научных статей. Система использует алгоритмы машинного обучения и помогает исследователям быстрее находить релевантные работы.",
                "Исследователи из МГУ представили новую модель для обработки естественного языка. Модель превосходит аналоги по точности и скорости работы с русскоязычными текстами."
            ],
            "summary": [
                "Ученые создали ИИ для анализа медицинских снимков с эффективностью 95%.",
                "Яндекс запустил сервис автореферирования научных статей.",
                "МГУ разработал точную модель для обработки русского языка."
            ]
        }

        from datasets import Dataset
        dataset = Dataset.from_dict(sample_data)
        dataset = dataset.train_test_split(test_size=0.3, seed=42)

        tokenized_datasets = dataset.map(
            self.preprocess_function,
            batched=True,
        )

        return tokenized_datasets

    def train_model(self, output_dir="./russian_summarizer"):
        """Обучение модели"""
        print("🎯 Начало обучения модели...")

        tokenized_datasets = self.load_and_prepare_data()

        training_args = Seq2SeqTrainingArguments(
            output_dir=output_dir,
            evaluation_strategy="epoch",
            learning_rate=2e-5,
            per_device_train_batch_size=2,
            per_device_eval_batch_size=2,
            weight_decay=0.01,
            save_total_limit=2,
            num_train_epochs=2,
            predict_with_generate=True,
            fp16=torch.cuda.is_available(),
            logging_steps=10,
            save_steps=100,
            warmup_steps=50,
        )

        data_collator = DataCollatorForSeq2Seq(
            self.tokenizer,
            model=self.model,
            padding=True
        )

        trainer = Seq2SeqTrainer(
            model=self.model,
            args=training_args,
            train_dataset=tokenized_datasets["train"],
            eval_dataset=tokenized_datasets["test"],
            data_collator=data_collator,
            tokenizer=self.tokenizer,
        )

        print("🔄 Запуск обучения...")
        trainer.train()

        trainer.save_model()
        self.tokenizer.save_pretrained(output_dir)

        print(f"✅ Модель сохранена в {output_dir}")
        return trainer

    def evaluate_summary(self, original_text, generated_summary, reference_summary=None):
        """Оценка качества суммаризации"""
        scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'], use_stemmer=True)

        if reference_summary:
            scores = scorer.score(reference_summary, generated_summary)
            print("=== ОЦЕНКА ROUGE ===")
            for key in scores:
                print(
                    f"{key}: Precision: {scores[key].precision:.3f}, Recall: {scores[key].recall:.3f}, F1: {scores[key].fmeasure:.3f}")

        original_words = len(original_text.split())
        summary_words = len(generated_summary.split())
        compression_ratio = original_words / summary_words if summary_words > 0 else 0

        print(f"\n=== СТАТИСТИКА ===")
        print(f"Исходный текст: {len(original_text)} символов, {original_words} слов")
        print(f"Суммаризация: {len(generated_summary)} символов, {summary_words} слов")
        print(f"Коэффициент сжатия: {compression_ratio:.1f}x")

        return {
            'original_length': original_words,
            'summary_length': summary_words,
            'compression_ratio': compression_ratio
        }


def process_large_text_file(input_file, output_file, target_chars=10000):
    """Обработка большого текстового файла"""
    summarizer = RussianTextSummarizer()
    summarizer.load_model()

    try:
        # Чтение файла
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()

        print(f"📖 Прочитан файл: {len(text)} символов")

        if len(text) > 150000:
            print("⚠️ Текст превышает 150,000 символов, обрезаю...")
            text = text[:150000]

        # Суммаризация
        print("🎯 Начинаю суммаризацию...")
        summary = summarizer.summarize_large_text(text, target_length=target_chars)

        # Сохранение результата
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("=== РЕЗУЛЬТАТ СУММАРИЗАЦИИ ===\n\n")
            f.write(summary)
            f.write(f"\n\n=== СТАТИСТИКА ===\n")
            f.write(f"Исходный текст: {len(text)} символов\n")
            f.write(f"Суммаризация: {len(summary)} символов\n")
            f.write(f"Сжатие: {len(text) / len(summary):.1f}x\n")

        print(f"✅ Результат сохранен в: {output_file}")
        print(f"📊 Итог: {len(text)} → {len(summary)} символов")

        return summary

    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return None


def interactive_large_text_summarizer():#fileNameBase, fileName):
    """Интерактивный режим для работы с большими текстами"""
#    print("🇷🇺 СУММАРИЗАТОР БОЛЬШИХ ТЕКСТОВ")
 #   print("=" * 50)

    summarizer = RussianTextSummarizer()
    summarizer.load_model()

    while True:
  #      print("\n" + "=" * 50)
   #     print("1 📝 Ввести текст вручную")
    #    print("2 📁 Обработать текстовый файл")
     #   print("3 🚪 Выход")
      #  print("=" * 50)
        filename = "/home/abama/Pictures/finalversion/py/txt/file.txt"

        if not filename:
            filename = filename + ".txt"

        output_file = filename.replace('.txt', '_summary.txt')

        if process_large_text_file(filename, output_file):
            print(f"🎉 Файл обработан успешно!")
        else:
            print("❌ Ошибка обработки файла")
""" if choice == "1":
            print("📝 Введите текст (поддерживается до 150,000 символов):")
            print("(введите 'КОНЕЦ' на отдельной строке для завершения)")

            lines = []
            total_chars = 0

            while True:
                line = input()
                if line.strip() == 'КОНЕЦ':
                    break
                lines.append(line)
                total_chars += len(line)

                if total_chars >= 150000:
                    print("⚠️ Достигнут лимит в 150,000 символов")
                    break

            text = "".join(lines)

            if text:
                print(f"📊 Текст получен: {len(text)} символов")
                target_length = min(10000, len(text) // 15)  # Целевая длина ~6.7% от оригинала

                summary = summarizer.summarize_large_text(text, target_length)
                print("✅ РЕЗУЛЬТАТ:")
                print("—" * 50)
                print(summary)
                print("—" * 50)
                print(f"📊 Сжатие: {len(text)} → {len(summary)} символов")

                # Сохранение
                save = input("💾 Сохранить результат? (y/n): ").lower()
                if save == 'y':
                    filename = input("Имя файла (без .txt): ").strip()
                    if not filename:
                        filename = "summary_result"

                    with open(f"{filename}.txt", 'w', encoding='utf-8') as f:
                        f.write(summary)
                    print(f"✅ Сохранено в {filename}.txt")
            else:
                print("❌ Текст не введен!"

        elif choice == "2":

        elif choice == "3":
            print("👋 До свидания!")
            break
        else:
            print("❌ Неверный выбор!")"""


def main():#fileNameBase, fileName):
    """Главная функция запуска"""
    print("🇷🇺 RUSSIAN LARGE TEXT SUMMARIZATION AI")
    print("=" * 60)
    print("📊 Поддерживает тексты до 150,000 символов")
    print("🎯 Сокращает до ~10,000 символов")
    print("=" * 60)

    # Проверка доступности GPU
    if torch.cuda.is_available():
        print(f"🎯 GPU доступен: {torch.cuda.get_device_name(0)}")
    else:
        print("⚡ Используется CPU")

    # Запуск интерактивного режима
    interactive_large_text_summarizer()#fileNameBase, fileName)
main()
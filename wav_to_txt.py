import speech_recognition as sr
from pydub import AudioSegment
import os

"""number_of_files = 1  # Задайте нужное количество файлов
q = "/home/abama/Documents/konvertationfile/itogTxt"
FileNameBase = 'a'
"""
async def convert_large_audio_to_text(audio_file_path):
    """Преобразует аудиофайл в текст, обрабатывая его по частям."""
    recognizer = sr.Recognizer()
    full_text = ""

    # Загружаем аудиофайл с помощью pydub
    audio = AudioSegment.from_file(audio_file_path, format="wav")

    # Деля на части чуть меньше чем 1 минута (например, по 50 секунд)
    segment_length_ms = 50 * 1000  # 50 секунд
    segments = [audio[i:i + segment_length_ms] for i in range(0, len(audio), segment_length_ms)]

    # Распознаём текст из каждого сегмента
    for i, segment in enumerate(segments):
        # Сохраняем сегмент во временный файл
        segment.export("temporaryFile.wav", format="wav")

        with sr.AudioFile("temporaryFile.wav") as source:
            audio_data = recognizer.record(source)
            try:
                # Распознаем текст в сегменте
                text = recognizer.recognize_google(audio_data, language='ru-RU')
                full_text += text + " "  # Добавляем текст сегмента к полному тексту
                print(f"Сегмент {i+1}/{len(segments)} распознан.")
            except sr.UnknownValueError:
                print(f"Сегмент {i+1} не удалось распознать.")
            except sr.RequestError as e:
                print(f"Ошибка запроса к сервису: {e}")

    return full_text

async def main(FileNameBase, filePath):#, filePathFinal):
    fileName = FileNameBase
    filePath = filePath
    filePathFinal = "/home/abama/Desktop/finalversion/py/itogTxt"
    #b = str(i)
    audio_file_path = os.path.join(filePath)#)  # Укажите путь к вашему аудиофайлу
    print(f"Обработка файла: {audio_file_path}")

    # Преобразуем аудиофайл в текст
    text = await convert_large_audio_to_text(audio_file_path)

    # Выводим результат
    print("Распознанный текст:")
    print(text)

    # Сохраняем текст в файл
    bara = os.path.join(filePathFinal , FileNameBase + ".txt")
    with open(bara, "w", encoding='utf-8') as itog:
        itog.write(text)
        
    return text
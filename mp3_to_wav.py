import speech_recognition as sr
from pydub import AudioSegment
import os

async def konvertationmp3_to_wav(file_base_name, pathFile):
    # Укажите путь к вашей папке с файлами
    path = pathFile
    file_base_name = file_base_name

    input_file = os.path.join(path, f"{file_base_name}")
    output_file = os.path.join(path, f"{file_base_name}.wav")  # Сохраним как .wav

    # Проверяем, существует ли файл
    if os.path.exists(input_file):
        # Загрузка звукового файла в формате MP3
        audio_mp3 = AudioSegment.from_file(input_file, format="mp3", ffmpeg="\\home\\abama\\Desktop\\ffmpeg-8.0.1\\compat")
        
        # Конвертация в формат WAV
        audio_mp3.export(output_file, format="wav")
        print(f"Конвертация {input_file} в {output_file} завершена.")
    else:
        print(f"Файл {input_file} не найден.")

    return output_file
        
#if __name__ == "__main__":
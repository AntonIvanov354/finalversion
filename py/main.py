from typicalRequestTxt import konvertationWavTotxt
from typicalRequestMp3 import konvertationMp3TWav
from bridge import finalWork
import asyncio

async def konvertation():
    #ищем файл на пк
    filename = input("Введите имя вашего файла: ")
    file_path = input("Введите путь к вашему файлу: ")

    #Шаг 1: Конвертация из mp3 в wav.
    print(f"Step number one, path file mp3: {filename}")
    mp3_to_wav = await konvertationMp3TWav(filename, file_path)
    print(f"conversion result to wav, name file: {mp3_to_wav}")

    #Шаг 2: Конвертация из wav в txt.
    wav_to_txt = await konvertationWavTotxt(filename, mp3_to_wav)
    print(f"conversion result to txt, name file: {wav_to_txt}")

    #Шаг 3: Сокращение текст из файла txt.
    final_step = await finalWork(wav_to_txt)
    print(f"final veriosn txt: {final_step}")

if __name__ == "__main__":
    asyncio.run(konvertation())
from mp3_to_wav import konvertationmp3_to_wav

async def konvertationMp3TWav(nameFileBase, pathFile):
    nameFile = nameFileBase
    path = pathFile
    #pathFile = '/home/abama/Documents/konvertationfile/konvertationfile/audioFileUser/'
    try:
        fileWav = await konvertationmp3_to_wav(nameFile, path)
        return fileWav
    except Exception as e:
        print(f'Ошибка: {e}')
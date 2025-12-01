from wav_to_txt import main

async def konvertationWavTotxt(fileNameBase,filePath, filePathFinal):
    fileName = fileNameBase
    filePath = filePath
    FilePathFinal = '/home/abama/Desktop/finalversion/py/itogTxt'
    try:
        textConten =  await main(fileNameBase, filePath, filePathFinal)
    except Exception as e:
        print(f'Error: {e}')
    return textConten
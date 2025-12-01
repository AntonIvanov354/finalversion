from main1 import main

async def finalWork(filePath, filName):
    try:
        with open(filePath, "r", encoding='utf-8') as file:
            textFile = file.read()
            
        itogText = await main(textFile)
    except Exception as e:
        print(f'Error: {e}')
    return itogText
from finalaction import main

async def finalWork(fileName):#filePath, 
    try:
        with open(fileName, "r", encoding='utf-8') as file:
            textFile = file.read()
            
        itogText = await main(textFile)
        print(itogText)

    except Exception as e:
        print(f'Error: {e}')

    return itogText
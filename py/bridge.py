from finalaction import main

async def finalWork(filName):#filePath, 
    try:
        with open(filName, "r", encoding='utf-8') as file:
            textFile = file.read()
            
        itogText = await main(textFile)
        print(itogText)
    except Exception as e:
        print(f'Error: {e}')
    return itogText
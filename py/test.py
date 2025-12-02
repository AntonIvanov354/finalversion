from fastapi import FastAPI, File, UploadFile, HTTPException
#from fastapi.responses import JSONResponse
import os
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
#import aiofiles
from typicalRequestTxt import konvertationWavTotxt
from typicalRequestMp3 import konvertationMp3TWav
from bridge import finalWork

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ← СПИСОК и только домен:порт
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#file_path = '/home/abama/Documents/konvertationfile/konvertationfile/audioFileUser/py'

@app.post("/work")
async def upload_file(file: UploadFile = File(...)):#Ошибка найдена, она тут. Ток хз в чем(

    try:
        
        #upload_dir = Path("audioFileUser")
        #upload_dir.mkdir(exist_ok=True)

        file_location = Path(__file__).parent / file.filename
        fileName = file.filename

        contents = await file.read()
        with open(file_location, "wb") as f:
            f.write(contents)
        
        fileLocationFinal = Path(file_location).parent #str(file_location).replace(f"/{fileName}.mp3", " ")
        print(f'Пусть к файлу: {fileLocationFinal}')

        print(f'Название файла: {fileName}')
        #Mp3 to wav
       # fileWav = await konvertationMp3TWav(fileName, fileLocationFinal)
       # print(fileWav)
#
       # fileTxtPatrh = await konvertationWavTotxt(fileName, fileWav)
#
       # print(Path(fileWav).name)
#
       # abbreviatedText = await finalWork(Path(fileTxtPatrh).name)

        return{
            "data":{
                "message": "Аудио файл успешно сохранен",
                "filename": 'fileName',
                "textFile": 'abbreviatedText'
            }
        }
    
    except Exception as e:
        print(f"Error: {e}")
        return {
            'data':{
                "message": f"Ошибка при сохранении аудио файла!, {e}"
                
            }
        }
            
@app.post("/a")
def a():
            return{
            "data":{
                "message": "Аудио файл успешно сохранен",
                "filename":'aa',
                "textFile": 'jj'
            }
        }
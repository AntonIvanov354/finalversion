from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
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

@app.post("/work_file")
async def upload_file(file: UploadFile = File(...)):
    try:
        
       # upload_dir = Path("audioFileUser")
       # upload_dir.mkdir(exist_ok=True)

        file_location = Path(__file__).parent / file.filename
        fileName = file.filename

        contents = await file.read()
        with open(file_location, "wb") as f:
            f.write(contents)
        
        fileLocationFinal = str(file_location).replace(f"/{fileName}.mp3", "")
        print(fileLocationFinal)

        print(fileName)
        #Mp3 to wav
        fileWav = await konvertationMp3TWav(fileName, fileLocationFinal)
        print(fileWav)

        await konvertationWavTotxt(fileName, fileWav)

        abbreviatedText = await finalWork(fileName)
        return{
            "data":{
                "message": "Аудио файл успешно сохранен",
                "filename": file.filename,
                "textFile": abbreviatedText
            }
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "message": f"Ошибка при сохранении аудио файла: {str(e)}"
            }
        )
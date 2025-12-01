from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
#import aiofiles
from typicalRequestTxt import konvertationWavTotxt
from typicalRequestMp3 import konvertationMp3TWav

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем все домены (для разработки)
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы
    allow_headers=["*"],  # Разрешаем все заголовки
)
#file_path = '/home/abama/Documents/konvertationfile/konvertationfile/audioFileUser/py'

@app.post("/work_file")
async def upload_file(file: UploadFile = File(...)):
    try:
        
        upload_dir = Path("audioFileUser")
        upload_dir.mkdir(exist_ok=True)

        file_location = upload_dir / file.filename
        fileName = file.filename

        contents = await file.read()
        with open(file_location, "wb") as f:
            f.write(contents)
        print(fileName)
        #Mp3 to wav
        await konvertationMp3TWav(fileName, file_location)

        #Wav to txt

        return{
            "data":{
                "message": "Аудио файл успешно сохранен",
                "filename": file.filename,
                "textFile": await konvertationWavTotxt(fileName, file_location)
            }
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "message": f"Ошибка при сохранении аудио файла: {str(e)}"
            }
        )
from fastapi import FastAPI, Depends, Cookie, UploadFile, HTTPException, Form
from sqlalchemy.ext.asyncio import AsyncSession
#from app.database import get_db
#from app.models import UserHistory
#from app.schemas import UserHistoryResponse
#from app.utils.password_and_token import get_current_user
from fastapi.middleware.cors import CORSMiddleware
import aiofiles
#from pathlib import Path
import os
#import sys
#Импорт всех файлов дла конвертации:
from typicalRequestTxt import konvertationWavTotxt
from typicalRequestMp3 import konvertationMp3TWav
from bridge import finalWork
from pydantic import BaseModel

window = FastAPI()

window.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
data = [
    {"id": 6739, "username": "Антон"},
    {"id": 1234, "username": "Артём"},
    {"id": 1654, "username": "Арсений"},
    {"id": 7890, "username": "Миша"},
    {"id": 9876, "username": "Леха"},
]
@window.post("/checkserver")
async def checkServer():
    return {"message": "True"}
class Userdata(BaseModel):
    id: str
@window.post("/id")
async def chekcookie1(id_cookie1: str = Cookie(None)):
     return{
            "data": {
                "username": 'a',
                "userid":id_cookie1.id
            }
        }
            
@window.post("/chekcookie2")
async def chekcookie(id_cookie: str):
    try:
        for id in data:
            if id.get('id') == id_cookie:
                return{
                        "data": {
                            "username": id["username"],
                            "userid": id["id"]
                        }
                }
            
            else:
                print('Abama')
    except Exception as e:
        return{
                "data":{
                    "messsage": f"Ошибка: {e}"
                }
            }
@window.post("/uploadfile")#, response_model=UserHistoryResponse)
async def upload_file(file: UploadFile, access_token: str | None = Cookie(default=None)):# db: AsyncSession = Depends(get_db)):
   # user_id = get_current_user(access_token)
    try:

        if not file.filename.endswith((".mp3", ".wav")):
            raise HTTPException(status_code=400, detail="Неподдерживаемый формат файла")

        filename = file.filename
        file_path = os.getcwd()

        async with aiofiles.open(filename, "wb") as f:
            data = await file.read()
            await f.write(data)

        #converted_text = "А у носатого хоббита, мозг опух"

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

        return{
            "message": "Успешно!",
            #"data":{
            #"filename": 'filename',
            "textFile": final_step
            #}
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            "data":{
                "message:" f"ОШибка при сохрании/обработки/отправки файла, {e}"
            }
        }
 #   new_record = UserHistory(user_id=user_id, file_name=file.filename, text_result=converted_text)
#
 #   db.add(new_record)
 #   await db.commit()
 #   await db.refresh(new_record)

  #  return new_record изменить!

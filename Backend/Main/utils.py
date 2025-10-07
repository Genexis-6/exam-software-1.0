import jwt
from .config import settings
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from jwt.exceptions import InvalidSignatureError, DecodeError
import pandas as pd
from io import BytesIO
from random import shuffle
from typing import List
import uuid
import math

SK = settings.SECRET_KEY
ALGO = settings.ALGO

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

def generate_hash_password(password):
    return pwd_context.hash(password)


def verify_hash_password(passord, hash_pass):
    return pwd_context.verify(passord, hash=hash_pass)




def generate_access_token(user_email, user_id, time_:Optional[timedelta]):
    to_encode = {
        "id": user_id,
        "sub":user_email
    }
    if  time_:
        exp = datetime.utcnow() + time_
    else:
        exp = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": exp})
    return jwt.encode(to_encode, SK, algorithm=ALGO)


def generate_refresh_token(user_id, user_email):
    to_encode = {
        "id": user_id,
        "sub": user_email,
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(to_encode, SK, algorithm=ALGO)


async def verify_token(token:str):
    try:
        payload = jwt.decode(token, SK, algorithms=[ALGO])
        user_email:str = payload.get("sub")
        user_id: str = payload.get("id")
        exp:float = payload.get("exp")
        
        if not user_email or not user_id:
            return "invalid_token"
        
        if exp and datetime.utcnow().timestamp() > exp:
            return "time_expired"
        
        return{
            "user_email": user_email,
            "user_id": user_id,
            "exp": exp
        }
    except DecodeError as e:
        return "error_decoding"
    except Exception as e:
        return f"main error: {e}"
    
    
    


def extract_qa_from_excel(file):
    required_keys = {'Question', 'A', 'B', 'C', 'D', 'Answer'}
    excel_io = BytesIO(file)
    
    try:
        data = pd.read_excel(excel_io)
        if not required_keys.issubset(data.columns):
            return "invalid file stucture"
        all_qa = [
            {
                "quest":str(q['Question']).strip("\xa0"),
                "a_": str(q["A"]).strip("\xa0"),
                "b_": str(q["B"]).strip("\xa0"),
                "c_": str(q["C"]).strip("\xa0"),
                "d_":str(q["D"]).strip("\xa0"),
                "ans": str(q["Answer"]).strip("\xa0"),
                "quest_id": str(uuid.uuid4()),
            } for a,q in data.iterrows()
        ]
        return all_qa
    except BaseException:
        return "error extracting file"
    
    
def format_datetime(time):
    dt_obj = datetime.fromisoformat(str(time))
    date = dt_obj.strftime("%d %b %Y %H:%M")
    return date

def shuffle_questions(list:List, length) -> List:
    shuffle(list)
    if not length:
        return list
    return list[:length:]



async def handle_score_summation(user_answers, db_answers):
    return sum(
        1 for ans in user_answers if db_answers.get(ans["id"]) == ans["option"]
    )
    
    
async def convert_timer(timer) -> str:
    hr = timer/3600
    min = float(f"0.{str(hr).split(".")[1]}") * 60
    sec = float(f"0.{str(min).split(".")[1]}") * 60
    return f"{int(hr)} hr : {int(min)} min : {int(sec)} sec "
    
from dotenv import load_dotenv
import os
load_dotenv()


class DevelopmentBaseConfig:
    DATABASE_URL = os.getenv("DATABASE_URL", "")
    SECRET_KEY = os.getenv("SECRET_KEY", "")
    ALGO = os.getenv("ALGO", "")
    APP = os.getenv("APP", "")
    DEBUG = os.getenv("DEBUG", "")
    PORT = int(os.getenv("PORT", ""))
    
    

settings = DevelopmentBaseConfig()
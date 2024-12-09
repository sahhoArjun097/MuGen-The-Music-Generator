import os
from decouple import config

class Config:
    SECRET_KEY = config('SECRET_KEY', default='your-secret-key')
    MONGO_URI = config('MONGO_URI', default='your-mongo-uri')

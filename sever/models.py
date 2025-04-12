from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import uuid

mongo = PyMongo()
bcrypt = Bcrypt()

class User:
    def __init__(self, email, password, token=500):
        self.email = email
        self.password = password
        self.token = token
        self.songs = []

    def save_to_db(self):
        hashed_password = bcrypt.generate_password_hash(self.password).decode("utf-8")
        user_data = {
            "email": self.email,
            "password": hashed_password,
            "token": self.token,
            "songs":self.songs
        }
        mongo.db.users.insert_one(user_data)

    @staticmethod
    def find_by_email(email):
        return mongo.db.users.find_one({"email": email})

    @staticmethod
    def verify_password(input_password, stored_password):
        return bcrypt.check_password_hash(stored_password, input_password)



class CloudStorage:
    def __init__(self, email, file_url, mood ,file_type):
        self.user_email = email
        self.file_url = file_url
        self.file_type = file_type, 
        self.mood = mood 

    def save_to_db(self):
        """Save uploaded file details to MongoDB and reference in user model"""
        file_data = {
            "user_email": self.user_email,
            "file_url": self.file_url,
            "file_type": self.file_type,
            "file_mood": self.mood
        }
        inserted_file = mongo.db.files.insert_one(file_data)
        file_id = inserted_file.inserted_id

        mongo.db.users.update_one(
            {"email": self.user_email},
            {"$push": {"songs": file_id}})
   
    @staticmethod
    def get_files_by_email(email):
        return list(mongo.db.files.find({"user_email": email},
        {"_id": 0, "file_url": 1, "file_mood": 1 }))


    @staticmethod
    def get_files_by_user(email):
        """Retrieve all files uploaded by a user"""
        return list(mongo.db.files.find({"email": email}))  
    
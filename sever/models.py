from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import uuid

mongo = PyMongo()
bcrypt = Bcrypt()

class User:
    def __init__(self, email, password):
        self.email = email
        self.password = password
    
    def save_to_db(self):
        hashed_password = bcrypt.generate_password_hash(self.password).decode("utf-8")
        user_data = {"email": self.email, "password": hashed_password}
        mongo.db.users.insert_one(user_data)
    
    @staticmethod
    def save_google_user(user_data):
        """Save Google authenticated users"""
        mongo.db.users.insert_one(user_data)
 
    @staticmethod
    def find_by_email(email):
        return mongo.db.users.find_one({"email": email})
    
    @staticmethod
    def verify_password(input_password, stored_password):
        return bcrypt.check_password_hash(stored_password, input_password)





from flask_pymongo import PyMongo
from datetime import datetime

mongo = PyMongo()

# class GeneratedSong:
#     def __init__(self, user_email, file_url):
#         self.user_email = user_email
#         self.file_url = file_url
#         self.generated_at = datetime.utcnow()

#     def save_to_db(self):
#         """Save the generated song info to MongoDB"""
#         song_data = {
#             "user_email": self.user_email,
#             "file_url": self.file_url,
#             "generated_at": self.generated_at
#         }
#         mongo.db.generated_songs.insert_one(song_data)

#     @staticmethod
#     def get_songs_by_user(email):
#         """Retrieve all songs generated by a user"""
#         return list(mongo.db.generated_songs.find({"user_email": email}, {"_id": 0}))


class CloudStorage:
    def __init__(self, email, file_url, file_type):
        self.email = email
        self.file_url = file_url
        self.file_type = file_type

    def save_to_db(self):
        """Save uploaded file details to MongoDB"""
        file_data = {
            "email": self.email,
            "file_url": self.file_url,
            "file_type": self.file_type,
        }
        mongo.db.files.insert_one(file_data)  # FIXED

    @staticmethod
    def get_files_by_user(email):
        """Retrieve all files uploaded by a user"""
        return list(mongo.db.files.find({"email": email}, {"_id": 0}))  
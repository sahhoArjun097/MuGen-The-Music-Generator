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

    # @staticmethod
    # def deduct_token(email):
    #     user = mongo.db.users.find_one({"email": email})
    #     if not user:
    #         raise ValueError("User not found")

    #     if user.get("token", 0) <= 0:
    #         raise ValueError("No tokens left")

    #     mongo.db.users.update_one(
    #         {"email": email},
    #         {"$inc": {"token": -1}}
    #     )
    #     return True

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
    def __init__(self, email, file_url, mood ,file_type):
        self.user_email = email
        self.file_url = file_url
        self.file_type = file_type, 
        self.mood = mood # e.g., image, video, audio

    def save_to_db(self):
        """Save uploaded file details to MongoDB and reference in user model"""
        file_data = {
            "user_email": self.user_email,
            "file_url": self.file_url,
            "file_type": self.file_type,
            "file_mood": self.mood
        }
        # Insert file and get inserted ID
        inserted_file = mongo.db.files.insert_one(file_data)
        file_id = inserted_file.inserted_id

        # Update user's songs array
        mongo.db.users.update_one(
            {"email": self.user_email},
            {"$push": {"songs": file_id}})
        
        
          # FIXED
    @staticmethod
    def get_files_by_email(email):
        return list(mongo.db.files.find({"user_email": email},
        {"_id": 0, "file_url": 1, "file_mood": 1 }))


    @staticmethod
    def get_files_by_user(email):
        """Retrieve all files uploaded by a user"""
        return list(mongo.db.files.find({"email": email}))  
    
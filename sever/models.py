from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

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
        return mongo.db.users.find_one({"email": email}, {"_id": 0})
    
    @staticmethod
    def verify_password(input_password, stored_password):
        return bcrypt.check_password_hash(stored_password, input_password)


class CloudStorage:
    def __init__(self, email, file_url, file_type):
        self.email = email
        self.file_url = file_url
        self.file_type = file_type  # e.g., image, video, audio

    def save_to_db(self):
        """Save uploaded file details to MongoDB"""
        file_data = {
            "email": self.email,
            "file_url": self.file_url,
            "file_type": self.file_type,
        }
        mongo.db.files.insert_one(file_data)

    @staticmethod
    def get_files_by_user(email):
        """Retrieve all files uploaded by a user"""
        return list(mongo.db.files.find({"user_email": email}, {"_id": 0}))

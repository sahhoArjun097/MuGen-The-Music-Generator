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
    def find_by_email(email):
        return mongo.db.users.find_one({"email": email})
    
    @staticmethod
    def verify_password(input_password, stored_password):
        return bcrypt.check_password_hash(stored_password, input_password)

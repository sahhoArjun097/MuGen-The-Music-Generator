import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader

# Load environment variables from .env file
load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    CLOUD_NAME = os.getenv("CLOUD_NAME")  # ✅ Fixed assignment
    API_KEY = os.getenv("API_KEY")        # ✅ Fixed assignment
    API_SECRET = os.getenv("API_SECRET")  # ✅ Removed extra space

# Configure Cloudinary with loaded environment variables
cloudinary.config(
    cloud_name=Config.CLOUD_NAME,
    api_key=Config.API_KEY,
    api_secret=Config.API_SECRET
)


def upload_to_cloudinary(file_path):
    try:
        response = cloudinary.uploader.upload(file_path)
        file_url = response.get("secure_url") 
        return file_url
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        return None
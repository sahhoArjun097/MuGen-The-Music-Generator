from flask import Blueprint, request, jsonify,send_file
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User
from models import CloudStorage
from config import cloudinary
from werkzeug.datastructures import FileStorage
from config import  upload_to_cloudinary
import io
import threading
auth_bp = Blueprint('auth', __name__)
from flask_bcrypt import Bcrypt
import uuid
import os
from bson import ObjectId
from config import client
import hmac
import hashlib
bcrypt = Bcrypt()

# register

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Email and password required"}), 400
    
    if User.find_by_email(data['email']):
        return jsonify({"msg": "User already exists"}), 400
    
    new_user = User(data['email'], data['password'])

    new_user.save_to_db()
    
    return jsonify({"msg": "User created successfully"}), 201


# login 

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.find_by_email(data['email'])
    print("User:", user)
    if user and User.verify_password(data['password'], user['password']):
        access_token = create_access_token(identity=user['email'])

        user_data = {
            "id":str(user["_id"]),
            "email": user["email"],
            "token": user.get("token", 500),
            "songs": user.get("songs", []), 
        }
        return jsonify({
            "access_token": access_token,
            "msg": "Successfully logged in",
            "user": user_data
        }), 200

    return jsonify({"msg": "Invalid credentials"}), 401

@auth_bp.route('/google-login', methods=['POST'])
def google_login():
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")
    profile_picture = data.get("profile_picture")
    token = 500
    songs = []
    if not email:
        return jsonify({"error": "Invalid data"}), 400


    existing_user = User.find_by_email(email)
    
    if not existing_user:
     
        new_user = {
            "email": email,
            "name": name,
            "profile_picture": profile_picture,
            "token":token,
            "songs":songs 
        }
        User.save_google_user(new_user) 
    access_token = create_access_token(identity=email)
    user = User.find_by_email(email)

    return jsonify({"access_token": access_token, "user": user, "msg": "Google login successful"}), 200

# Logout route
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"msg": "Successfully logged out"}), 


# addign songs to the user  
@auth_bp.route('/<email>/songs', methods=['GET'])
def get_songs_by_email(email):
    songs = CloudStorage.get_files_by_email(email)
    return jsonify(songs), 200

# -----------------------------------------------------------------


def perform_upload(file, email,mood):
    """Core logic for uploading the file"""
    if not email:
        raise ValueError("User email is required")

    if not file:
        raise ValueError("No file uploaded")

    if not file.filename.endswith('.mp3'):
        raise ValueError("Only MP3 files are allowed")

    file_path = f"temp_{file.filename}"
    file.save(file_path)

    try:

        upload_result = cloudinary.uploader.upload(file_path, resource_type="video")
        file_url = upload_result.get("secure_url")

        file_data = CloudStorage(email, file_url,mood, "audio")
        file_data.save_to_db()
        return file_url
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)


# generating song to the 


@auth_bp.route('/<id>/generate-song', methods=['POST'])
def generate_song(id):
    file_path = "songs/gana2.mp3"
    data = request.get_json()
    email = data.get("email")
    token_cost = 50 
    success, result = User.deduct_token(email, token_cost)
    print(result)
    print(data)
    try:
        with open(file_path, "rb") as f:
            file_content = f.read()

        file_obj = FileStorage(
            stream=io.BytesIO(file_content),
            filename="gana2.mp3",
            content_type="audio/mp3"
        )
        threading.Thread(target=perform_upload, args=(file_obj, data['email'],data['mood'])).start()
        return send_file(file_path, as_attachment=True)
    except ValueError as ve:
        return jsonify({"msg": str(ve)}), 400
    except Exception as e:
        return jsonify({"msg": "Error generating song", "error": str(e)}), 500

    # mood = request.json.get('mood')
    # song_number = request.json.get('song_number')
    # tempo = 120
    # scale_type = 0

    # if song_number > 5:
    #     return jsonify({"msg": "Song Limit reached!!"}), 200


    # if mood == 'Cheerful':
    #     tempo = 130
    # elif mood == 'Sorrow':
    #     tempo = 104
    #     scale_type = 1
    # elif mood == 'Up Lifting':
    #     tempo = 120
    #     scale_type = 0
    # elif mood == 'Dark':
    #     tempo = 100
    #     scale_type = 1
    
    # generate_midi(tempo=tempo, output_file=f"{id}-{song_number}", scale_type=scale_type)


@auth_bp.route('/create-order',methods=['POST'])
def create_order():
    data = request.get_json()
    amount = data.get("amount") 

    payment = client.order.create({
        "amount": int(amount) * 100, 
        "currency": "INR",
        "payment_capture": 1
    })
    print(payment)
    return jsonify(payment)

@auth_bp.route("/paymentverification", methods=["POST"])
def verify_payment():
    data = request.form if request.form else request.get_json()

    razorpay_order_id = data.get("razorpay_order_id")
    razorpay_payment_id = data.get("razorpay_payment_id")
    razorpay_signature = data.get("razorpay_signature")

    body = f"{razorpay_order_id}|{razorpay_payment_id}"
    expected_signature = hmac.new(
        bytes(os.getenv("RAZORPAY_KEY_SECRET"), 'utf-8'),
        bytes(body, 'utf-8'),
        hashlib.sha256
    ).hexdigest()
    print(expected_signature)

    if expected_signature == razorpay_signature:
        return jsonify({"success": True, "message": "Payment Verified"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid Signature"}), 400




# @auth_bp.route('/upload', methods=['POST'])
# def upload_file(file=None, user_email=None):
#     """Handles file upload from both user and generated song."""
#       # Get the uploaded file from request
#     if user_email is None:
#         user_email = request.form.get("user_email")

#     if not user_email:
#         return jsonify({"msg": "User email is required"}), 400

#     if not file:
#         return jsonify({"msg": "No file uploaded"}), 400

#     if not file.filename.endswith('.mp3'):
#         return jsonify({"msg": "Only MP3 files are allowed"}), 400

#     file_path = f"temp_{file.filename}"  # Save file temporarily
#     file.save(file_path)

#     try:
#         # ✅ Upload to Cloudinary
#         upload_result = cloudinary.uploader.upload(file_path, resource_type="video")
#         file_url = upload_result.get("secure_url")

#         # ✅ Save to MongoDB
#         file_data = CloudStorage(user_email, file_url, "audio")
#         file_data.save_to_db()

#         return jsonify({
#             "msg": "File uploaded successfully",
#             "file_url": file_url
#         }), 201

#     except Exception as e:
#         os.remove(file_path)  # Cleanup on error
#         return jsonify({"msg": "File upload failed", "error": str(e)}), 500

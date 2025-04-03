from flask import Blueprint, request, jsonify,send_file
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User
from models import CloudStorage
from config import cloudinary
from config import  upload_to_cloudinary
auth_bp = Blueprint('auth', __name__)
from flask_bcrypt import Bcrypt
import uuid
import os


bcrypt = Bcrypt()
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


from bson import ObjectId

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.find_by_email(data['email'])

    if user and User.verify_password(data['password'], user['password']):
        access_token = create_access_token(identity=user['email'])

        user_data = {
            # Convert ObjectId to string
            "email": user["email"],
            "tokens": user.get("tokens", 500),
            "songs": user.get("songs", []),  # Fetch songs
        }

        return jsonify({
            "access_token": access_token,
            "msg": "Successfully logged in",
            "user": user_data
        }), 200

    return jsonify({"msg": "Invalid credentials"}), 401


# Google Login route
@auth_bp.route('/google-login', methods=['POST'])
def google_login():
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")
    profile_picture = data.get("profile_picture")

    if not email:
        return jsonify({"error": "Invalid data"}), 400


    existing_user = User.find_by_email(email)
    
    if not existing_user:
     
        new_user = {
            "email": email,
            "name": name,
            "profile_picture": profile_picture,
           
        }
        User.save_google_user(new_user)  # Function to store Google user in DB
    access_token = create_access_token(identity=email)
    user = User.find_by_email(email)

    return jsonify({"access_token": access_token, "user": user, "msg": "Google login successful"}), 200






# Logout route
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"msg": "Successfully logged out"}), 200






@auth_bp.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('file')  # Get file, return None if not found
    print(file)
    user_email = request.form.get("user_email")
    print(user_email)

    if not user_email:
        return jsonify({"msg": "User email is required"}), 400
    print(file)

    file_url = None
    file_type = None

    if file:
        # Save file locally (optional) or read it directly
        file_path = f"temp_{file.filename}"
        file.save(file_path)
          # Print the files received
        # Upload to Cloudinary
        file_url = upload_to_cloudinary(file_path)
        print(file_url)
        file_type = file.content_type

        if not file_url:
            return jsonify({"msg": "File upload failed"}), 500

    # Save file info to MongoDB (even if no file is uploaded)
    file_data = CloudStorage(user_email, file_url, file_type)
    file_data.save_to_db()

    return jsonify({
        "msg": "Data saved successfully",
        "file_url": file_url if file_url else "No file uploaded"
    }), 201





@auth_bp.route('/upload-audio', methods=['POST'])
def upload_audio():
    """Upload generated audio to Cloudinary & save in MongoDB."""
    print("Request Files:", request.files)
    print("Request Form Data:", request.form)
    if 'file' not in request.files: 
        return jsonify({"msg": "No audio file uploaded"}), 400
    file = request.files['file']  
    user_email = request.form.get("user_email")
    if not user_email:
        return jsonify({"msg": "User email is required"}), 400
    if file.filename == '':
        return jsonify({"msg": "No file selected"}), 400
    if not file.filename.endswith((".wav", ".mp3")):
        return jsonify({"msg": "Invalid file format"}), 400
    try:
        file_path = f"temp_{file.filename}"
        file.save(file_path)  
        file_url = upload_to_cloudinary(file_path)
        if not file_url:
            return jsonify({"msg": "File upload failed"}), 500
        file_data = CloudStorage(user_email, file_url, "audio/wav")
        file_data.save_to_db()
        os.remove(file_path)
        return jsonify({
            "msg": "Generated song uploaded successfully!",
            "file_url": file_url
        }), 201
    except Exception as e:
        return jsonify({"msg": "Error uploading song", "error": str(e)}), 500



        
@auth_bp.route('/<id>/generate-song', methods=['POST'])

def generate_song(id):
    file_path = "gana2.mp3"
    return send_file(file_path, as_attachment=True), 200
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

    
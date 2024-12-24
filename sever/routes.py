from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User

auth_bp = Blueprint('auth', __name__)

# Register route
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

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.find_by_email(data['email'])
    if user and User.verify_password(data['password'], user['password']):
        access_token = create_access_token(identity=user['email'])
        return jsonify({"access_token": access_token, "msg": "Successfully logged in"}), 200
    return jsonify({"msg": "Invalid credentials"}), 401

# Logout route
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"msg": "Successfully logged out"}), 200

from flask import Blueprint, request, jsonify
from app import mongo, bcrypt

main = Blueprint('main', __name__)

users_collection = mongo.db.users

@main.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({'error': 'Request content type must be application/json'}), 400

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    age = data.get('age')
    phone = data.get('phone')

    if not email or not password or not username or not age or not phone:
        return jsonify({'error': 'Missing email or password'}), 400


    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = {
         'email': email,
        'password': hashed_password,
        'username': username,
        'age': age,
        'phone': phone
    }
    mongo.db.users.insert_one(user)
    return jsonify({'message': 'User registered successfully!'}), 201

from flask import jsonify, request
from app import mongo, bcrypt

@main.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({'error': 'Request content type must be application/json'}), 400

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    
    if not email or not password:
        return jsonify({'error': 'Email and password are required!'}), 400


    user = mongo.db.users.find_one({'email': email})
    if not user:
        return jsonify({'error': 'User not found!'}), 404

    # password
    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid password!'}), 401


    return jsonify({
        'message': 'Login successful!',
        'user': "user login successfully"
    }), 200

@main.route('/users', methods=['GET'])
def get_users():
    users = users_collection.find()
    users_list = [{
        'id': str(user['_id']),
        'username': user['username'],
        'email': user['email']
    } for user in users]
    return jsonify(users_list), 200


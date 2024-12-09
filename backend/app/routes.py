from flask import Blueprint, request, jsonify
from app import mongo, bcrypt

main = Blueprint('main', __name__)

users_collection = mongo.db.users

@main.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already registered'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = {
        'username': username,
        'email': email,
        'password': hashed_password
    }
    users_collection.insert_one(new_user)
    return jsonify({'message': 'User registered successfully'}), 201

@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({'email': email})
    if user and bcrypt.check_password_hash(user['password'], password):
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': str(user['_id']),
                'username': user['username'],
                'email': user['email']
            }
        }), 200

    return jsonify({'error': 'Invalid email or password'}), 401

@main.route('/users', methods=['GET'])
def get_users():
    users = users_collection.find()
    users_list = [{
        'id': str(user['_id']),
        'username': user['username'],
        'email': user['email']
    } for user in users]
    return jsonify(users_list), 200


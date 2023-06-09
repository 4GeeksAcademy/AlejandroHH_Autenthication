"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity



api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    is_active = data.get('is_active')

    signUp = User(name = name, email = email, password = password, is_active = is_active)
    print(signUp)

    if not signUp:
        return jsonify({"message": "Complete the fields!"}), 400

    db.session.add(signUp)
    db.session.commit()

    return jsonify({"message":"You have been successfully registered!"}), 200


@api.route('/login', methods=['POST'])
def login():
    
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Complete the fields!"}), 400
    user = User.query.filter_by(email=email, password=password).first()
    
    if not user:
        return jsonify({"message": "Error, this user doesn't exist"})
    

    if user.password != password:
         return jsonify({"message":"Incorrect password"})
    

    token = create_access_token(identity = user.email)
    return jsonify({"user_token": token}), 200

    

@api.route('/private', methods=['POST'])
@jwt_required()
def private():

        data = request.json
        userID = get_jwt_identity()
        print(userID)

        user = User.query.get(userID)
        print(user)
        
        return jsonify({"message":"Enjoy your subscription!"})

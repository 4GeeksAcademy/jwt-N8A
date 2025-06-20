"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Testing this is coming from routes.py"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = bcrypt.hashpw(
        data.get("password", "").strip().encode('utf-8'), bcrypt.gensalt()
    ).decode('utf-8')

    if not email or not password or not username:
        return jsonify({"error": "Missing email and/or username and/or password"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    new_user = User(
        username=username,
        email=email,
        password=password,  # !!!!HASSSH IT!!!!!
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully",
        "user": new_user.serialize()
    }), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not email and not username:
        return jsonify({"error": "You must provide either email or username."}), 400

    if not password:
        return jsonify({"error": "Please enter Password to continue."})

    # Find user by email or username but not both

    user = None
    if email:
        user = User.query.filter_by(email=email).first()
    elif username:
        user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
        return jsonify({"error": "Wrong Password"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful!",
        "access_token": access_token
    }), 200

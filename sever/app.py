from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models import mongo
from routes import auth_bp

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
mongo.init_app(app)
jwt = JWTManager(app)
CORS(app, origins=["http://localhost:5173"])  # Adjust frontend URL

# Register routes
app.register_blueprint(auth_bp, url_prefix='/')

if __name__ == "__main__":
    app.run(debug=True)

# from flask import Flask
# from flask_jwt_extended import JWTManager
# from config import Config
# from models import mongo
# from routes import auth_bp

# app = Flask(__name__)
# app.config.from_object(Config)

# # Initialize extensions
# mongo.init_app(app)
# jwt = JWTManager(app)

# # Register routes
# app.register_blueprint(auth_bp)

# if __name__ == "__main__":
#     app.run(debug=True)

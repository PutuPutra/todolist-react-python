from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS  # Import CORS

from models.todo import db
from routes.home_bp import home_bp
from routes.todo_bp import todo_bp

app = Flask(__name__)
app.config.from_object('config')

# Aktifkan CORS untuk aplikasi
CORS(app)

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(home_bp, url_prefix='/')
app.register_blueprint(todo_bp, url_prefix='/todos')

if __name__ == '__main__':
    app.debug = True
    app.run(port=5000)

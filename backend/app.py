import os
import sys

# Ensure workspace root is in sys.path
workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if workspace_root not in sys.path:
    sys.path.insert(0, workspace_root)

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from backend.database import db

def create_app():
    # Resolve directory paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    workspace_root = os.path.abspath(os.path.join(current_dir, '..'))
    frontend_dir = os.path.join(workspace_root, 'frontend')
    db_dir = os.path.join(workspace_root, 'database')
    os.makedirs(db_dir, exist_ok=True)
    db_path = os.path.join(db_dir, 'truspot.db')

    app = Flask(__name__, static_folder=frontend_dir, static_url_path='')
    app.config['SECRET_KEY'] = 'truspot-secure-secret-key-2026-prod'
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app, supports_credentials=True)
    db.init_app(app)

    # Register blueprints
    from backend.routes.auth_routes import auth_bp
    from backend.routes.places_routes import places_bp
    from backend.routes.questions_routes import questions_bp
    from backend.routes.guides_routes import guides_bp
    from backend.routes.business_routes import business_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(places_bp)
    app.register_blueprint(questions_bp)
    app.register_blueprint(guides_bp)
    app.register_blueprint(business_bp)

    # Auto-seed database if empty
    with app.app_context():
        db.create_all()
        from backend.models import City
        if City.query.count() == 0:
            print("Database is empty. Running seed...")
            from backend.seed import seed_database
            seed_database()

    # Frontend serving routes
    @app.route('/')
    def serve_index():
        return send_from_directory(frontend_dir, 'index.html')

    @app.route('/<path:path>')
    def serve_static(path):
        full_path = os.path.join(frontend_dir, path)
        if os.path.exists(full_path):
            return send_from_directory(frontend_dir, path)
        return send_from_directory(frontend_dir, 'index.html')

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Resource not found'}), 404

    return app

app = create_app()

if __name__ == '__main__':
    print("Starting TRUSPOT Local Discovery Platform on http://0.0.0.0:8000 (accessible on both laptop and mobile) ...")
    app.run(host='0.0.0.0', port=8000, debug=True)

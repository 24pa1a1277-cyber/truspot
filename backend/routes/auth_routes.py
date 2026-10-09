from flask import Blueprint, request, jsonify, session
from backend.database import db
from backend.models import User, SavedItem, Place, Guide, Question

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    role = data.get('role', 'explorer')
    city = data.get('city', 'Tanuku')
    business_name = data.get('business_name', '').strip()

    if not name or not email or not password:
        return jsonify({'error': 'Name, email, and password are required.'}), 400

    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters.'}), 400

    # Public self-registration only permits 'explorer' or 'guide'
    if role not in ['explorer', 'guide']:
        role = 'explorer'

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'A user with this email already exists.'}), 409

    user = User(
        name=name,
        email=email,
        role=role,
        city=city,
        business_name=business_name if role == 'business' else ''
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    session['user_id'] = user.id
    return jsonify({
        'message': 'Registration successful.',
        'user': user.to_dict()
    }), 201


@auth_bp.route('/business/login', methods=['POST'])
def business_login():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    remember = data.get('remember', True)

    if not email or not password:
        return jsonify({'error': 'Merchant email and password are required.'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid merchant credentials.'}), 401

    user_role = (user.role or '').strip().lower()
    if user_role not in ['business', 'business_owner']:
        return jsonify({'error': 'Access denied: User does not hold verified Business Owner privileges.'}), 403

    session['user_id'] = user.id
    session.permanent = remember

    return jsonify({
        'message': 'Merchant authentication successful.',
        'user': user.to_dict()
    })


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    remember = data.get('remember', True)

    if not email or not password:
        return jsonify({'error': 'Email and password are required.'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password.'}), 401

    session['user_id'] = user.id
    session.permanent = remember

    return jsonify({
        'message': 'Login successful.',
        'user': user.to_dict()
    })


@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully.'})


@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'user': None})

    user = db.session.get(User, user_id)
    if not user:
        session.pop('user_id', None)
        return jsonify({'user': None})

    return jsonify({'user': user.to_dict()})


@auth_bp.route('/saved', methods=['GET'])
def get_saved():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    saved = SavedItem.query.filter_by(user_id=user_id).all()
    saved_places = []
    saved_guides = []
    saved_questions = []

    for item in saved:
        if item.item_type == 'place':
            p = db.session.get(Place, item.item_id)
            if p:
                saved_places.append(p.to_dict())
        elif item.item_type == 'guide':
            g = db.session.get(Guide, item.item_id)
            if g:
                saved_guides.append(g.to_dict())
        elif item.item_type == 'question':
            q = db.session.get(Question, item.item_id)
            if q:
                saved_questions.append(q.to_dict())

    return jsonify({
        'places': saved_places,
        'guides': saved_guides,
        'questions': saved_questions,
        'saved_ids': {
            'place': [item.item_id for item in saved if item.item_type == 'place'],
            'guide': [item.item_id for item in saved if item.item_type == 'guide'],
            'question': [item.item_id for item in saved if item.item_type == 'question']
        }
    })


@auth_bp.route('/saved/toggle', methods=['POST'])
def toggle_save():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Please log in to save items.'}), 401

    data = request.get_json() or {}
    item_type = data.get('item_type')
    item_id = data.get('item_id')

    if not item_type or not item_id:
        return jsonify({'error': 'item_type and item_id are required.'}), 400

    existing = SavedItem.query.filter_by(user_id=user_id, item_type=item_type, item_id=item_id).first()
    if existing:
        db.session.delete(existing)
        db.session.commit()
        return jsonify({'saved': False, 'message': 'Item removed from saved list.'})
    else:
        new_save = SavedItem(user_id=user_id, item_type=item_type, item_id=item_id)
        db.session.add(new_save)
        db.session.commit()
        return jsonify({'saved': True, 'message': 'Item saved successfully.'})

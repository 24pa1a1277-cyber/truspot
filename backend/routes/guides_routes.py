from flask import Blueprint, request, jsonify, session
from backend.database import db
from backend.models import Guide, GuidePlace, User, City, Place, Review, Question, Answer

guides_bp = Blueprint('guides', __name__, url_prefix='/api')

@guides_bp.route('/guides', methods=['GET'])
def get_guides():
    city_param = request.args.get('city', '').strip()
    query_str = request.args.get('q', '').strip()

    db_query = Guide.query

    if city_param and city_param.lower() not in ['all', 'all cities']:
        if city_param.isdigit():
            db_query = db_query.filter(Guide.city_id == int(city_param))
        else:
            city_obj = City.query.filter(City.name.ilike(f"%{city_param}%")).first()
            if city_obj:
                db_query = db_query.filter(Guide.city_id == city_obj.id)

    if query_str:
        db_query = db_query.filter(
            db.or_(
                Guide.title.ilike(f"%{query_str}%"),
                Guide.description.ilike(f"%{query_str}%")
            )
        )

    guides_list = db_query.order_by(Guide.likes_count.desc(), Guide.created_at.desc()).all()
    return jsonify([g.to_dict() for g in guides_list])


@guides_bp.route('/guides/<int:guide_id>', methods=['GET'])
def get_guide(guide_id):
    guide = db.session.get(Guide, guide_id)
    if not guide:
        return jsonify({'error': 'Guide not found'}), 404
    return jsonify(guide.to_dict())


@guides_bp.route('/guides', methods=['POST'])
def create_guide():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Please log in to curate a guide.'}), 401

    user = db.session.get(User, user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json() or {}
    title = data.get('title', '').strip()
    description = data.get('description', '').strip()
    city_id = data.get('city_id', 1)
    cover_image = data.get('cover_image', '').strip()
    place_ids = data.get('place_ids', [])

    if not title or not description:
        return jsonify({'error': 'Title and description are required.'}), 400

    if not cover_image:
        cover_image = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"

    guide = Guide(
        city_id=int(city_id),
        user_id=user_id,
        title=title,
        description=description,
        cover_image=cover_image
    )
    db.session.add(guide)
    db.session.flush()

    for idx, pid in enumerate(place_ids, 1):
        gp = GuidePlace(
            guide_id=guide.id,
            place_id=int(pid),
            order_index=idx,
            note="Handpicked local highlight"
        )
        db.session.add(gp)

    db.session.commit()
    return jsonify({'message': 'Curated guide published successfully!', 'guide': guide.to_dict()}), 201


@guides_bp.route('/guides/<int:guide_id>/like', methods=['POST'])
def like_guide(guide_id):
    guide = db.session.get(Guide, guide_id)
    if not guide:
        return jsonify({'error': 'Guide not found'}), 404

    guide.likes_count += 1
    db.session.commit()
    return jsonify({'message': 'Guide upvoted!', 'likes_count': guide.likes_count})


@guides_bp.route('/contributors/<int:user_id>', methods=['GET'])
def get_contributor(user_id):
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({'error': 'Contributor not found'}), 404

    # Calculate badges
    reviews_count = Review.query.filter_by(user_id=user.id).count()
    guides_count = Guide.query.filter_by(user_id=user.id).count()
    answers_count = Answer.query.filter_by(user_id=user.id).count()

    badges = []
    if guides_count >= 1:
        badges.append({'name': 'Local Curator', 'icon': 'compass', 'color': 'emerald'})
    if reviews_count >= 3:
        badges.append({'name': 'Top Reviewer', 'icon': 'star', 'color': 'amber'})
    if answers_count >= 2:
        badges.append({'name': 'Community Guru', 'icon': 'help-circle', 'color': 'blue'})
    if user.role == 'guide':
        badges.append({'name': 'Verified Local Guide', 'icon': 'award', 'color': 'indigo'})

    reviews = Review.query.filter_by(user_id=user.id).order_by(Review.created_at.desc()).limit(10).all()
    guides = Guide.query.filter_by(user_id=user.id).order_by(Guide.created_at.desc()).limit(10).all()

    return jsonify({
        'user': user.to_dict(),
        'badges': badges,
        'stats': {
            'reviews_count': reviews_count,
            'guides_count': guides_count,
            'answers_count': answers_count
        },
        'recent_reviews': [r.to_dict() for r in reviews],
        'guides': [g.to_dict() for g in guides]
    })

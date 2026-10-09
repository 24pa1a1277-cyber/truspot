import json
from functools import wraps
from flask import Blueprint, request, jsonify, session
from backend.database import db
from backend.models import User, Place, BusinessProfile, Review, PlaceAmenity, Category, City

business_bp = Blueprint('business', __name__, url_prefix='/api/business')

def require_business_owner(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'error': 'Please log in as a verified business owner.'}), 401

        user = db.session.get(User, user_id)
        if not user:
            return jsonify({'error': 'User not found.'}), 404

        role = (user.role or '').strip().lower()
        if role not in ['business', 'business_owner']:
            return jsonify({'error': 'Access restricted to verified business owners.'}), 403

        return f(user, *args, **kwargs)
    return decorated_function

@business_bp.route('/dashboard', methods=['GET'])
@require_business_owner
def get_dashboard(current_user):
    user_id = current_user.id
    user = current_user

    # Fetch user's claimed business profiles or places
    profiles = BusinessProfile.query.filter_by(user_id=user_id).all()
    places_data = []
    total_views = 0
    all_reviews = []

    for bp in profiles:
        place = bp.place_rel
        if place:
            p_dict = place.to_dict(include_reviews=True)
            p_dict['is_claimed'] = True
            p_dict['business_profile_id'] = bp.id
            places_data.append(p_dict)
            total_views += place.views_count
            for r in place.reviews:
                all_reviews.append(r.to_dict())

    avg_rating = 0.0
    if all_reviews:
        avg_rating = round(sum(r['rating'] for r in all_reviews) / len(all_reviews), 1)

    return jsonify({
        'user': user.to_dict(),
        'places': places_data,
        'stats': {
            'total_places': len(places_data),
            'total_views': total_views,
            'total_reviews': len(all_reviews),
            'average_rating': avg_rating
        },
        'recent_reviews': sorted(all_reviews, key=lambda x: x['id'], reverse=True)[:10]
    })


@business_bp.route('/claim', methods=['POST'])
@require_business_owner
def claim_place(current_user):
    user_id = current_user.id
    data = request.get_json() or {}
    place_id = data.get('place_id')

    if not place_id:
        return jsonify({'error': 'place_id is required.'}), 400

    place = db.session.get(Place, place_id)
    if not place:
        return jsonify({'error': 'Place not found.'}), 404

    existing = BusinessProfile.query.filter_by(place_id=place_id).first()
    if existing:
        if existing.user_id == user_id:
            return jsonify({'message': 'You have already claimed this listing.', 'profile': existing.to_dict()})
        return jsonify({'error': 'This business has already been claimed by another owner.'}), 400

    profile = BusinessProfile(
        user_id=user_id,
        place_id=place_id,
        is_verified=True,
        views_count=place.views_count
    )
    place.is_verified = True
    db.session.add(profile)
    db.session.commit()

    return jsonify({'message': 'Business successfully claimed!', 'profile': profile.to_dict()}), 201


@business_bp.route('/places', methods=['POST'])
@require_business_owner
def create_place(current_user):
    user_id = current_user.id
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    city_id = data.get('city_id')
    category_id = data.get('category_id')
    subcategory_id = data.get('subcategory_id')
    address = data.get('address', '').strip()
    phone = data.get('phone', '').strip()
    website = data.get('website', '').strip()
    price_level = data.get('price_level', '₹₹')
    description = data.get('description', '').strip()
    image_url = data.get('image_url', '').strip()
    amenities = data.get('amenities', [])
    opening_hours = data.get('opening_hours', {})

    if not name or not city_id or not category_id or not address:
        return jsonify({'error': 'Name, city, category, and address are required.'}), 400

    city = db.session.get(City, int(city_id))
    lat = city.lat if city else 16.7570
    lng = city.lng if city else 81.6790

    if not image_url:
        image_url = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"

    place = Place(
        name=name,
        city_id=int(city_id),
        category_id=int(category_id),
        subcategory_id=int(subcategory_id) if subcategory_id else None,
        address=address,
        latitude=lat,
        longitude=lng,
        phone=phone or '+91 98765 43210',
        website=website,
        price_level=price_level,
        opening_hours_json=json.dumps(opening_hours) if opening_hours else json.dumps({"All Days": "09:00 - 21:00"}),
        description=description,
        image_url=image_url,
        is_demo=False,
        is_verified=True
    )
    db.session.add(place)
    db.session.flush()

    for a in amenities:
        if a.strip():
            db.session.add(PlaceAmenity(place_id=place.id, amenity_name=a.strip()))

    # Associate with BusinessProfile
    bp = BusinessProfile(user_id=user_id, place_id=place.id, is_verified=True)
    db.session.add(bp)
    db.session.commit()

    return jsonify({'message': 'Listing created successfully!', 'place': place.to_dict()}), 201


@business_bp.route('/places/<int:place_id>', methods=['PUT'])
@business_bp.route('/manage-venue/<int:place_id>', methods=['GET', 'PUT'])
@require_business_owner
def update_place(current_user, place_id):
    user_id = current_user.id
    bp = BusinessProfile.query.filter_by(place_id=place_id, user_id=user_id).first()
    if not bp:
        return jsonify({'error': 'You do not have permission to manage this listing.'}), 403

    place = db.session.get(Place, place_id)
    if not place:
        return jsonify({'error': 'Place not found.'}), 404

    if request.method == 'GET':
        return jsonify({'place': place.to_dict(include_reviews=True), 'profile': bp.to_dict()})

    data = request.get_json() or {}
    if 'name' in data:
        place.name = data['name'].strip()
    if 'address' in data:
        place.address = data['address'].strip()
    if 'phone' in data:
        place.phone = data['phone'].strip()
    if 'website' in data:
        place.website = data['website'].strip()
    if 'description' in data:
        place.description = data['description'].strip()
    if 'price_level' in data:
        place.price_level = data['price_level']
    if 'image_url' in data and data['image_url'].strip():
        place.image_url = data['image_url'].strip()
    if 'opening_hours' in data:
        place.opening_hours_json = json.dumps(data['opening_hours'])

    if 'amenities' in data and isinstance(data['amenities'], list):
        PlaceAmenity.query.filter_by(place_id=place.id).delete()
        for a in data['amenities']:
            if a.strip():
                db.session.add(PlaceAmenity(place_id=place.id, amenity_name=a.strip()))

    db.session.commit()
    return jsonify({'message': 'Listing updated successfully!', 'place': place.to_dict()})


@business_bp.route('/analytics', methods=['GET'])
@require_business_owner
def get_analytics(current_user):
    user_id = current_user.id
    profiles = BusinessProfile.query.filter_by(user_id=user_id).all()
    places_data = []
    total_views = 0
    all_reviews = []

    for bp in profiles:
        place = bp.place_rel
        if place:
            p_dict = place.to_dict(include_reviews=True)
            places_data.append(p_dict)
            total_views += place.views_count
            for r in place.reviews:
                all_reviews.append(r.to_dict())

    avg_rating = round(sum(r['rating'] for r in all_reviews) / len(all_reviews), 1) if all_reviews else 0.0

    return jsonify({
        'user': current_user.to_dict(),
        'total_places': len(places_data),
        'total_views': total_views,
        'total_reviews': len(all_reviews),
        'average_rating': avg_rating,
        'analytics_summary': {
            'search_impressions': total_views * 4 + 120,
            'engagement_rate': f"{round((len(all_reviews) / max(total_views, 1)) * 100, 2)}%",
            'growth_mom': '+18.4%'
        }
    })


@business_bp.route('/reviews/<int:review_id>/reply', methods=['POST'])
@require_business_owner
def reply_to_review(current_user, review_id):
    user_id = current_user.id
    review = db.session.get(Review, review_id)
    if not review:
        return jsonify({'error': 'Review not found.'}), 404

    bp = BusinessProfile.query.filter_by(place_id=review.place_id, user_id=user_id).first()
    if not bp:
        return jsonify({'error': 'You do not own the business associated with this review.'}), 403

    data = request.get_json() or {}
    reply_text = data.get('reply', '').strip()
    if not reply_text:
        return jsonify({'error': 'Reply text cannot be empty.'}), 400

    review.business_reply = reply_text
    db.session.commit()

    return jsonify({'message': 'Official business reply posted.', 'review': review.to_dict()})

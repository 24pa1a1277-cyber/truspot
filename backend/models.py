from datetime import datetime, timezone
import json
from werkzeug.security import generate_password_hash, check_password_hash
from backend.database import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default='explorer')  # explorer, guide, business
    city = db.Column(db.String(100), default='Tanuku')
    bio = db.Column(db.Text, default='')
    avatar = db.Column(db.String(300), default='')
    business_name = db.Column(db.String(150), default='')
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    reviews = db.relationship('Review', backref='author', lazy=True, cascade='all, delete-orphan')
    questions = db.relationship('Question', backref='author', lazy=True, cascade='all, delete-orphan')
    answers = db.relationship('Answer', backref='author', lazy=True, cascade='all, delete-orphan')
    guides = db.relationship('Guide', backref='author', lazy=True, cascade='all, delete-orphan')
    saved_items = db.relationship('SavedItem', backref='user', lazy=True, cascade='all, delete-orphan')
    business_profiles = db.relationship('BusinessProfile', backref='owner', lazy=True, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'city': self.city,
            'bio': self.bio,
            'avatar': self.avatar or f"https://ui-avatars.com/api/?name={self.name.replace(' ', '+')}&background=0D9488&color=fff",
            'business_name': self.business_name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'stats': {
                'reviews_count': len(self.reviews),
                'guides_count': len(self.guides),
                'answers_count': len(self.answers)
            }
        }


class City(db.Model):
    __tablename__ = 'cities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    state = db.Column(db.String(100), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(300), default='')
    description = db.Column(db.Text, default='')

    places = db.relationship('Place', backref='city_rel', lazy=True)
    questions = db.relationship('Question', backref='city_rel', lazy=True)
    guides = db.relationship('Guide', backref='city_rel', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'state': self.state,
            'lat': self.lat,
            'lng': self.lng,
            'image_url': self.image_url,
            'description': self.description,
            'places_count': len(self.places)
        }


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    icon = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, default='')

    subcategories = db.relationship('Subcategory', backref='category_rel', lazy=True, cascade='all, delete-orphan')
    places = db.relationship('Place', backref='category_rel', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'icon': self.icon,
            'description': self.description,
            'subcategories': [sub.to_dict() for sub in self.subcategories]
        }


class Subcategory(db.Model):
    __tablename__ = 'subcategories'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100), nullable=False)

    places = db.relationship('Place', backref='subcategory_rel', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'category_id': self.category_id,
            'name': self.name,
            'slug': self.slug
        }


class Place(db.Model):
    __tablename__ = 'places'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    subcategory_id = db.Column(db.Integer, db.ForeignKey('subcategories.id'), nullable=True)
    address = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    phone = db.Column(db.String(50), default='+91 98765 43210')
    website = db.Column(db.String(200), default='')
    price_level = db.Column(db.String(10), default='₹₹')  # ₹, ₹₹, ₹₹₹
    opening_hours_json = db.Column(db.Text, default='{}')
    description = db.Column(db.Text, default='')
    image_url = db.Column(db.String(350), default='')
    is_demo = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
    views_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    amenities = db.relationship('PlaceAmenity', backref='place_rel', lazy=True, cascade='all, delete-orphan')
    reviews = db.relationship('Review', backref='place_rel', lazy=True, cascade='all, delete-orphan', order_by='Review.created_at.desc()')
    business_profile = db.relationship('BusinessProfile', backref='place_rel', uselist=False, cascade='all, delete-orphan')

    @property
    def average_rating(self):
        if not self.reviews:
            return 4.5  # default baseline
        return round(sum(r.rating for r in self.reviews) / len(self.reviews), 1)

    @property
    def review_count(self):
        return len(self.reviews)

    def check_open_now(self):
        # Opening hours JSON format: {"Monday": "09:00 - 22:00", "Tuesday": "09:00 - 22:00", ...}
        # Or {"all_days": "09:00 - 22:00"} or "24/7"
        try:
            if not self.opening_hours_json:
                return True
            hours_data = json.loads(self.opening_hours_json) if isinstance(self.opening_hours_json, str) else self.opening_hours_json
            if isinstance(hours_data, dict) and hours_data.get('is_24_7'):
                return True
            now = datetime.now()
            current_day = now.strftime('%A')
            current_time = now.strftime('%H:%M')

            time_slot = hours_data.get(current_day) or hours_data.get('all_days')
            if not time_slot or 'Closed' in time_slot:
                return False
            if '24 Hours' in time_slot or '24/7' in time_slot:
                return True
            
            parts = [p.strip() for p in time_slot.split('-')]
            if len(parts) == 2:
                open_t, close_t = parts
                if open_t <= current_time <= close_t:
                    return True
            return True  # Fallback to open
        except Exception:
            return True

    def to_dict(self, include_reviews=False):
        parsed_hours = {}
        try:
            if self.opening_hours_json:
                parsed_hours = json.loads(self.opening_hours_json) if isinstance(self.opening_hours_json, str) else self.opening_hours_json
        except Exception:
            parsed_hours = {"All Days": "09:00 - 21:00"}

        amenities_list = [a.amenity_name for a in self.amenities]

        # Calculate rating breakdown
        rating_breakdown = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        for r in self.reviews:
            r_int = int(round(r.rating))
            if 1 <= r_int <= 5:
                rating_breakdown[r_int] += 1

        data = {
            'id': self.id,
            'name': self.name,
            'city_id': self.city_id,
            'city_name': self.city_rel.name if self.city_rel else '',
            'category_id': self.category_id,
            'category_name': self.category_rel.name if self.category_rel else '',
            'category_slug': self.category_rel.slug if self.category_rel else '',
            'category_icon': self.category_rel.icon if self.category_rel else 'tag',
            'subcategory_id': self.subcategory_id,
            'subcategory_name': self.subcategory_rel.name if self.subcategory_rel else '',
            'address': self.address,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'phone': self.phone,
            'website': self.website,
            'price_level': self.price_level,
            'opening_hours': parsed_hours,
            'is_open_now': self.check_open_now(),
            'description': self.description,
            'image_url': self.image_url,
            'is_demo': self.is_demo,
            'is_verified': self.is_verified,
            'views_count': self.views_count,
            'average_rating': self.average_rating,
            'review_count': self.review_count,
            'rating_breakdown': rating_breakdown,
            'amenities': amenities_list,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

        if include_reviews:
            data['reviews'] = [r.to_dict() for r in self.reviews]

        return data


class PlaceAmenity(db.Model):
    __tablename__ = 'place_amenities'

    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, db.ForeignKey('places.id'), nullable=False)
    amenity_name = db.Column(db.String(100), nullable=False)


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, db.ForeignKey('places.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    helpful_count = db.Column(db.Integer, default=0)
    is_demo = db.Column(db.Boolean, default=True)
    business_reply = db.Column(db.Text, default=None)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        user_info = self.author.to_dict() if self.author else {
            'id': None,
            'name': 'Local Explorer',
            'role': 'explorer',
            'avatar': 'https://ui-avatars.com/api/?name=Local+User'
        }
        return {
            'id': self.id,
            'place_id': self.place_id,
            'place_name': self.place_rel.name if self.place_rel else '',
            'user_id': self.user_id,
            'user_name': user_info['name'],
            'user_role': user_info['role'],
            'user_avatar': user_info['avatar'],
            'rating': self.rating,
            'comment': self.comment,
            'helpful_count': self.helpful_count,
            'is_demo': self.is_demo,
            'business_reply': self.business_reply,
            'created_at': self.created_at.strftime('%b %d, %Y') if self.created_at else 'Recently'
        }


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    category = db.relationship('Category', lazy=True)
    answers = db.relationship('Answer', backref='question_rel', lazy=True, cascade='all, delete-orphan', order_by='Answer.helpful_count.desc()')

    def to_dict(self):
        return {
            'id': self.id,
            'city_id': self.city_id,
            'city_name': self.city_rel.name if self.city_rel else 'All Cities',
            'category_id': self.category_id,
            'category_name': self.category.name if self.category else 'General',
            'user_id': self.user_id,
            'author_name': self.author.name if self.author else 'Anonymous',
            'author_role': self.author.role if self.author else 'explorer',
            'author_avatar': self.author.avatar if self.author else '',
            'title': self.title,
            'content': self.content,
            'answers_count': len(self.answers),
            'status': 'Answered' if len(self.answers) > 0 else 'Open',
            'created_at': self.created_at.strftime('%b %d, %Y') if self.created_at else 'Recently',
            'answers': [ans.to_dict() for ans in self.answers]
        }


class Answer(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    helpful_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'question_id': self.question_id,
            'user_id': self.user_id,
            'author_name': self.author.name if self.author else 'Local Contributor',
            'author_role': self.author.role if self.author else 'guide',
            'author_avatar': self.author.avatar if self.author else '',
            'content': self.content,
            'helpful_count': self.helpful_count,
            'created_at': self.created_at.strftime('%b %d, %Y') if self.created_at else 'Recently'
        }


class Guide(db.Model):
    __tablename__ = 'guides'

    id = db.Column(db.Integer, primary_key=True)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    cover_image = db.Column(db.String(350), default='')
    likes_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    guide_places = db.relationship('GuidePlace', backref='guide_rel', lazy=True, cascade='all, delete-orphan', order_by='GuidePlace.order_index')

    def to_dict(self):
        places_data = []
        for gp in self.guide_places:
            place_item = gp.place_rel.to_dict() if gp.place_rel else {}
            place_item['guide_note'] = gp.note
            place_item['order_index'] = gp.order_index
            places_data.append(place_item)

        return {
            'id': self.id,
            'city_id': self.city_id,
            'city_name': self.city_rel.name if self.city_rel else 'All Cities',
            'user_id': self.user_id,
            'author_name': self.author.name if self.author else 'Local Guide',
            'author_bio': self.author.bio if self.author else '',
            'author_avatar': self.author.avatar if self.author else '',
            'author_role': self.author.role if self.author else 'guide',
            'title': self.title,
            'description': self.description,
            'cover_image': self.cover_image,
            'likes_count': self.likes_count,
            'places_count': len(self.guide_places),
            'places': places_data,
            'created_at': self.created_at.strftime('%b %d, %Y') if self.created_at else 'Recently'
        }


class GuidePlace(db.Model):
    __tablename__ = 'guide_places'

    id = db.Column(db.Integer, primary_key=True)
    guide_id = db.Column(db.Integer, db.ForeignKey('guides.id'), nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey('places.id'), nullable=False)
    order_index = db.Column(db.Integer, default=1)
    note = db.Column(db.String(255), default='')

    place_rel = db.relationship('Place', lazy=True)


class SavedItem(db.Model):
    __tablename__ = 'saved_items'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    item_type = db.Column(db.String(50), nullable=False)  # 'place', 'guide', 'question'
    item_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'item_type': self.item_type,
            'item_id': self.item_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class BusinessProfile(db.Model):
    __tablename__ = 'business_profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey('places.id'), nullable=False)
    is_verified = db.Column(db.Boolean, default=True)
    views_count = db.Column(db.Integer, default=42)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'place_id': self.place_id,
            'is_verified': self.is_verified,
            'views_count': self.views_count,
            'place': self.place_rel.to_dict() if self.place_rel else None
        }

import re
from flask import Blueprint, request, jsonify, session
from backend.database import db
from backend.models import Place, City, Category, Subcategory, Review, PlaceAmenity, User

places_bp = Blueprint('places', __name__, url_prefix='/api')

def parse_natural_language_query(query_text):
    """
    Extracts structured intent from queries like:
    'Show me cafes in Tanuku',
    'List all vegan spots in the database',
    'List electronics hubs and shopping malls across Tanuku, Rajahmundry, and Vijayawada',
    'best vegetarian restaurants in Tanuku',
    'Find EV charging stations along NH-16 in Vijayawada, Rajahmundry, and Tanuku',
    '4 star hospitals in Hyderabad'
    """
    extracted = {
        'cities': [],
        'city': None,
        'category_slugs': [],
        'category_slug': None,
        'subcategory_slugs': [],
        'min_rating': None,
        'price_level': None,
        'open_now': False,
        'amenity_keywords': [],
        'residual_words': [],
        'clean_query': query_text.strip()
    }
    
    q_lower = query_text.lower()
    consumed_spans = []

    # 1. City extraction (handles multi-city queries e.g. "across Tanuku, Rajahmundry, and Vijayawada")
    cities_map = {
        'tanuku': 'Tanuku',
        'rajahmundry': 'Rajahmundry',
        'rajamahendravaram': 'Rajahmundry',
        'vijayawada': 'Vijayawada',
        'hyderabad': 'Hyderabad',
        'secunderabad': 'Hyderabad',
        'bengaluru': 'Bengaluru',
        'bangalore': 'Bengaluru'
    }
    matched_cities = []
    for key, val in cities_map.items():
        for m in re.finditer(r'\b' + re.escape(key) + r'\b', q_lower):
            consumed_spans.append((m.start(), m.end()))
            if val not in matched_cities:
                matched_cities.append(val)
    if matched_cities:
        extracted['cities'] = matched_cities
        extracted['city'] = matched_cities[0]

    # 2. Subcategory patterns (ordered from specific/multi-word to general)
    subcat_patterns = [
        # Food & Dining
        ('vegan', ['vegan', 'plant-based', 'plant based', 'pure plant']),
        ('vegetarian', ['vegetarian', 'pure veg', 'veg mess', 'tiffin']),
        ('cafes', ['cafe', 'cafes', 'coffee lounge', 'coffee', 'brew hub', 'brewpub']),
        ('bakeries', ['bakery', 'bakeries', 'bakers', 'patisserie', 'bakehouse', 'artisan bakery']),
        ('fast food', ['fast food', 'chaat', 'burger']),
        ('street food', ['street food', 'food street', 'thindi beedi', 'food court', 'food stalls', 'bajji row', 'bajji']),
        ('desserts', ['dessert', 'desserts', 'sweets', 'sweet', 'rose milk']),
        ('ice cream', ['ice cream', 'ice creams', 'icecream', 'ice cream parlour', 'ice cream parlours', 'ice cream parlor', 'ice cream parlors', 'ice cream lounge', 'parlour', 'parlours', 'parlor', 'parlors']),
        ('family dining', ['family dining', 'family restaurant']),
        ('fine dining', ['fine dining']),
        ('food delivery', ['food delivery', 'cloud kitchen', 'kitchen hub', 'swiggy', 'zomato', 'kitchen pod', 'cloud hub']),
        ('restaurants', ['restaurant', 'restaurants', 'dining']),

        # Travel & Stay
        ('resorts', ['resort', 'resorts', 'spa resort', 'resort & spa']),
        ('lodges', ['lodge', 'lodges', 'deluxe lodge', 'guest house']),
        ('homestays', ['homestay', 'homestays', 'villa stays', 'villa stay', 'executive homestay']),
        ('tourist places', ['tourist place', 'tourist places', 'tourist spots', 'tourist spot', 'caves', 'riverbank', 'ghat']),
        ('attractions', ['attraction', 'attractions', 'film city', 'biological park', 'barrage', 'cultural complex']),
        ('parks', ['park', 'parks', 'gardens', 'garden', 'cubbon park', 'ntr gardens']),
        ('temples', ['temple', 'temples', 'mandir', 'iskcon', 'kshetram']),
        ('museums', ['museum', 'museums', 'heritage archive', 'jubilee museum']),
        ('weekend getaways', ['weekend getaway', 'weekend getaways', 'getaway', 'getaways', 'eco-tourism', 'hills']),
        ('travel agencies', ['travel agency', 'travel agencies', 'tours & travels', 'tours', 'travels', 'sotc', 'akbar travels', 'southern travels', 'wings tourism']),
        ('hotels', ['hotel', 'hotels', 'luxury hotel']),

        # Healthcare
        ('hospitals', ['hospital', 'hospitals', 'medical college']),
        ('clinics', ['clinic', 'clinics', 'poly clinic', 'general practice', 'nursing home', 'outpatient']),
        ('dentists', ['dentist', 'dentists', 'dental', 'dental clinic', 'dental hospital']),
        ('pharmacies', ['pharmacy', 'pharmacies', 'chemist', 'drugstore', 'medplus', 'apollo pharmacy']),
        ('diagnostic centers', ['diagnostic center', 'diagnostic centers', 'diagnostic laboratory', 'diagnostics and lab', 'diagnostics', 'diagnostic', 'lab']),
        ('eye care', ['eye care', 'eye hospital', 'eye clinics', 'nethralaya', 'lvpei', 'vision eye']),
        ('physiotherapy', ['physiotherapy', 'physio', 'rehabilitation']),
        ('medical specialists', ['medical specialist', 'medical specialists', 'specialist', 'specialists', 'oncology', 'cancer care', 'gastroenterology', 'cardiac', 'critical care']),

        # Shopping
        ('shopping malls', ['shopping mall', 'shopping malls', 'mall', 'malls']),
        ('clothing', ['clothing', 'apparel', 'textile', 'saree', 'cloth market', 'trends', 'kalaniketan', 'kalamandir']),
        ('electronics', ['electronics', 'electronic', 'electronics market', 'electronics hub', 'electronics hubs', 'appliances']),
        ('supermarkets', ['supermarket', 'supermarkets', 'hypermarket', 'grocery', 'smart point']),
        ('jewellery', ['jewellery', 'jewelry', 'jewellers', 'jewelers', 'gold', 'tanishq', 'lalitha jewellery']),
        ('furniture', ['furniture', 'godrej interio', 'home centre', 'ikea', 'damro']),
        ('local markets', ['local market', 'local markets', 'market corridor', 'bazaar', 'laad bazaar', 'kr market', 'city market']),
        ('book stores', ['book store', 'book stores', 'book depot', 'books', 'book world', 'book house']),
        ('gift shops', ['gift shop', 'gift shops', 'gifts', 'gift shoppe', 'archies', 'novelties']),

        # Education
        ('schools', ['school', 'schools', 'high school']),
        ('colleges', ['college', 'colleges', 'junior college', 'degree college', 'arts college']),
        ('universities', ['university', 'universities', 'iisc', 'osmania university', 'adikavi nannaya']),
        ('coaching centers', ['coaching center', 'coaching centers', 'coaching academy', 'coaching hub', 'coaching', 'allen', 'aakash', 'iit academy', 'techno & iit']),
        ('training institutes', ['training institute', 'training institutes', 'training center', 'tech training', 'jspiders', 'naresh i technologies', 'niit']),
        ('libraries', ['library', 'libraries', 'grandhalayam', 'central library']),
        ('skill centers', ['skill center', 'skill centers', 'skill development', 'skill hub', 'nttf', 'apssdc', 'iti']),

        # Essential Services
        ('police stations', ['police station', 'police stations', 'police']),
        ('fire stations', ['fire station', 'fire stations', 'fire brigade']),
        ('emergency services', ['emergency services', 'emergency service', 'disaster management', '108 emergency', '108', 'ambulance']),
        ('government offices', ['government office', 'government offices', 'government headquarters', 'municipal corporation', 'municipal council', 'bbmp', 'ghmc', 'vmc', 'rmc', 'head office', 'collectorate']),
        ('banks', ['bank', 'banks', 'state bank of india', 'sbi', 'union bank']),
        ('atms', ['atm', 'atms', 'cash machine', 'cash recycler']),
        ('post offices', ['post office', 'post offices', 'head post office', 'general post office', 'gpo', 'hpo']),
        ('electricity services', ['electricity service', 'electricity services', 'electricity office', 'electricity', 'bescom', 'tsspdcl', 'apspdcl', 'apepdcl']),
        ('water services', ['water service', 'water services', 'water supply', 'water works', 'bwssb', 'hmwssb']),
        ('gas services', ['gas service', 'gas services', 'gas agency', 'gail gas', 'bhagyanagar gas', 'godavari gas']),
        ('repair services', ['repair service', 'repair services', 'appliance repair', 'urban company', 'refrigeration']),

        # Transportation & Automotive
        ('petrol pumps', ['petrol pump', 'petrol pumps', 'fuel station', 'petrol bunk', 'auto care centre', 'auto fuel']),
        ('ev charging', ['ev charging station', 'ev charging stations', 'ev charging', 'ev charger', 'ev pulse', 'charging station', 'shell recharge', 'ather grid', 'chargezone', 'relux']),
        ('car service', ['car service', 'car workshop', 'car service hubs', 'car service hub', 'bosch car service', 'gomechanic', 'authorized workshop', 'kalyani motors workshop']),
        ('bike service', ['bike service', 'bike point', 'two wheeler works', 'royal enfield service']),
        ('car wash', ['car wash', 'foam wash', 'auto spa', 'speed car wash', '3m car care']),
        ('tyre shops', ['tyre shop', 'tyre shops', 'tyre centre', 'tyre house', 'tyres']),
        ('car dealers', ['car dealer', 'car dealers', 'car showroom', 'maruti suzuki arena', 'coastal toyota', 'passenger showroom']),
        ('bike dealers', ['bike dealer', 'bike dealers', 'two wheeler showroom', 'popular motor world', 'orange tvs']),
        ('driving schools', ['driving school', 'driving schools', 'motor driving school', 'driving academy']),
        ('rental services', ['rental service', 'rental services', 'car rental', 'taxi rental', 'self drive', 'self drive rentals', 'zoomcar', 'revv', 'avis']),
        ('parking', ['parking ground', 'paid parking', 'parking area', 'multi-level car parking', 'multi-level parking', 'parking', 'mlcp'])
    ]

    # 2. Subcategory patterns (longest matches first to avoid sub-phrase collisions)
    all_patterns = []
    for sub_name, syns in subcat_patterns:
        for s in syns:
            all_patterns.append((s, sub_name))
    all_patterns.sort(key=lambda x: len(x[0]), reverse=True)

    matched_subcategories = []
    claimed_ranges = []
    for s, sub_name in all_patterns:
        for m in re.finditer(r'\b' + re.escape(s) + r'\b', q_lower):
            m_start, m_end = m.start(), m.end()
            # Do not match if this range overlaps with an already-claimed longer pattern
            if any(not (m_end <= c_start or m_start >= c_end) for c_start, c_end in claimed_ranges):
                continue
            claimed_ranges.append((m_start, m_end))
            consumed_spans.append((m_start, m_end))
            if sub_name not in matched_subcategories:
                matched_subcategories.append(sub_name)

    # Disambiguate generic restaurants if a specific dining style is requested
    specific_food = {'vegan', 'vegetarian', 'cafes', 'bakeries', 'fast food', 'street food', 'desserts', 'ice cream', 'family dining', 'fine dining', 'food delivery'}
    if 'restaurants' in matched_subcategories and any(s in matched_subcategories for s in specific_food):
        matched_subcategories.remove('restaurants')

    extracted['subcategory_slugs'] = matched_subcategories

    # 3. Category hints
    cat_keywords = {
        'food-dining': ['food', 'dining', 'cuisine', 'eat'],
        'travel-stay': ['travel', 'tourism', 'stay', 'accommodations', 'vacation'],
        'healthcare': ['healthcare', 'health', 'medical'],
        'shopping': ['shopping', 'retail'],
        'education': ['education', 'academic', 'learning'],
        'essential-services': ['essential services', 'civic', 'municipal', 'utilities'],
        'transport-automotive': ['transportation', 'automotive', 'transit', 'vehicle']
    }
    matched_categories = []
    for cat_slug, words in cat_keywords.items():
        for w in words:
            for m in re.finditer(r'\b' + re.escape(w) + r'\b', q_lower):
                consumed_spans.append((m.start(), m.end()))
                if cat_slug not in matched_categories:
                    matched_categories.append(cat_slug)
    extracted['category_slugs'] = matched_categories
    if matched_categories:
        extracted['category_slug'] = matched_categories[0]

    # 4. Rating hints
    if re.search(r'\b5[\s-]star\b', q_lower):
        extracted['min_rating'] = 4.8
    elif re.search(r'\b4[\s-]star\b|4\+|top[\s-]rated|best', q_lower):
        extracted['min_rating'] = 4.0
    elif re.search(r'\b3[\s-]star\b|3\+', q_lower):
        extracted['min_rating'] = 3.0

    # 5. Price hints
    if any(k in q_lower for k in ['cheap', 'budget', 'affordable', 'under 1000', 'under ₹1000', 'low cost']):
        extracted['price_level'] = '₹'
    elif any(k in q_lower for k in ['luxury', 'fine dining', 'premium', '5 star hotel']):
        extracted['price_level'] = '₹₹₹'

    # 6. Open now hints
    if 'open now' in q_lower or '24/7' in q_lower or '24 hours' in q_lower or 'late night' in q_lower:
        extracted['open_now'] = True

    # 7. Amenity keywords
    if re.search(r'\b(vegetarian|pure veg)\b', q_lower) and 'vegetarian' not in matched_subcategories:
        extracted['amenity_keywords'].append('Vegetarian')
    if re.search(r'\b(vegan|plant-based)\b', q_lower) and 'vegan' not in matched_subcategories:
        extracted['amenity_keywords'].append('Vegan Options')
    if 'wifi' in q_lower or 'wi-fi' in q_lower:
        extracted['amenity_keywords'].append('Wi-Fi')
    if 'parking' in q_lower and 'parking' not in matched_subcategories:
        extracted['amenity_keywords'].append('Parking')
    if 'pool' in q_lower:
        extracted['amenity_keywords'].append('Swimming Pool')

    # 8. Residual words for specific keyword searches
    mask = [False] * len(q_lower)
    for start, end in consumed_spans:
        for idx in range(start, end):
            mask[idx] = True

    filler_words = {
        'show', 'me', 'list', 'all', 'in', 'the', 'database', 'spots', 'places', 'spot', 'place',
        'find', 'give', 'top', 'recommend', 'across', 'along', 'and', 'for', 'near', 'best',
        'with', 'to', 'of', 'at', 'on', 'per', 'sector', 'subsectors', 'subsector', 'directory',
        'hub', 'hubs', 'center', 'centers', 'verified', 'service', 'services', 'store', 'stores',
        'shop', 'shops', 'corridor', 'station', 'stations', 'highway', 'nh-16', 'nh16', 'pure',
        'ground-truth', 'ground', 'truth', 'between', 'area', 'town', 'city', 'cities',
        'chain', 'chains', 'outlet', 'outlets', 'branch', 'branches', 'point', 'points',
        'location', 'locations', 'zone', 'zones', 'line', 'lines', 'row', 'stall', 'stalls',
        'popular', 'famous', 'local', 'good', 'available'
    }

    unconsumed_chars = []
    for i, ch in enumerate(q_lower):
        if not mask[i]:
            unconsumed_chars.append(ch)
        else:
            unconsumed_chars.append(' ')
    unconsumed_text = ''.join(unconsumed_chars)
    tokens = [t.strip() for t in re.split(r'[^a-zA-Z0-9]+', unconsumed_text) if len(t.strip()) > 2]
    residual = [t for t in tokens if t not in filler_words]
    extracted['residual_words'] = residual

    return extracted


@places_bp.route('/cities', methods=['GET'])
def get_cities():
    cities = City.query.order_by(City.name).all()
    return jsonify([c.to_dict() for c in cities])


@places_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([c.to_dict() for c in categories])


@places_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'truspot-api'})


@places_bp.route('/places', methods=['GET'])
@places_bp.route('/places/smart-search', methods=['GET'])
def get_places():
    query_str = request.args.get('q', '').strip()
    city_param = request.args.get('city', '').strip()
    category_param = request.args.get('category', '').strip()
    subcategory_param = request.args.get('subcategory', '').strip()
    price_level = request.args.get('price_level', '').strip()
    min_rating = request.args.get('min_rating', type=float)
    open_now_param = request.args.get('open_now', '').lower() in ['1', 'true', 'yes']
    verified_param = request.args.get('verified', '').lower()
    demo_param = request.args.get('demo', '').lower()
    amenity_filter = request.args.get('amenities', '').strip()
    sort_by = request.args.get('sort_by', 'relevance')
    limit = request.args.get('limit', type=int)

    # Start base query
    db_query = Place.query

    # Apply Natural Language Parsing if query string exists
    nl_parsed = {}
    if query_str:
        nl_parsed = parse_natural_language_query(query_str)
        if min_rating is None and nl_parsed['min_rating']:
            min_rating = nl_parsed['min_rating']
        if not price_level and nl_parsed['price_level']:
            price_level = nl_parsed['price_level']
        if not open_now_param and nl_parsed['open_now']:
            open_now_param = True

    # Filter by City
    if city_param and city_param.lower() not in ['all', 'all cities']:
        if city_param.isdigit():
            db_query = db_query.filter(Place.city_id == int(city_param))
        else:
            city_obj = City.query.filter(City.name.ilike(f"%{city_param}%")).first()
            if city_obj:
                db_query = db_query.filter(Place.city_id == city_obj.id)
    elif nl_parsed.get('cities'):
        city_objs = City.query.filter(City.name.in_(nl_parsed['cities'])).all()
        if city_objs:
            db_query = db_query.filter(Place.city_id.in_([c.id for c in city_objs]))

    # Filter by Subcategory
    if subcategory_param and subcategory_param.lower() not in ['all', 'all subcategories']:
        if subcategory_param.isdigit():
            db_query = db_query.filter(Place.subcategory_id == int(subcategory_param))
        else:
            slug_val = subcategory_param.lower().replace(' ', '-')
            sub_obj = Subcategory.query.filter((Subcategory.slug == slug_val) | (Subcategory.slug == subcategory_param) | (Subcategory.name.ilike(subcategory_param))).first()
            if sub_obj:
                db_query = db_query.filter(Place.subcategory_id == sub_obj.id)
    elif nl_parsed.get('subcategory_slugs'):
        sub_filters = []
        for s_tag in nl_parsed['subcategory_slugs']:
            slug_variant = s_tag.replace(' ', '-')
            sub_filters.append(Subcategory.slug == slug_variant)
            sub_filters.append(Subcategory.name.ilike(s_tag))
        matching_subs = Subcategory.query.filter(db.or_(*sub_filters)).all()
        if matching_subs:
            db_query = db_query.filter(Place.subcategory_id.in_([s.id for s in matching_subs]))

    # Filter by Category
    if category_param and category_param.lower() not in ['all', 'all categories']:
        if category_param.isdigit():
            db_query = db_query.filter(Place.category_id == int(category_param))
        else:
            cat_obj = Category.query.filter((Category.slug == category_param) | (Category.name.ilike(f"%{category_param}%"))).first()
            if cat_obj:
                db_query = db_query.filter(Place.category_id == cat_obj.id)
    elif not nl_parsed.get('subcategory_slugs') and nl_parsed.get('category_slugs'):
        cat_objs = Category.query.filter(Category.slug.in_(nl_parsed['category_slugs'])).all()
        if cat_objs:
            db_query = db_query.filter(Place.category_id.in_([c.id for c in cat_objs]))

    # Filter by Price Level
    if price_level and price_level.lower() != 'all':
        prices = [p.strip() for p in price_level.split(',') if p.strip()]
        if prices:
            db_query = db_query.filter(Place.price_level.in_(prices))

    # Filter by Verified status
    if verified_param in ['1', 'true', 'yes']:
        db_query = db_query.filter(Place.is_verified == True)

    # Filter by Demo status
    if demo_param in ['1', 'true', 'yes']:
        db_query = db_query.filter(Place.is_demo == True)

    # Keyword text matching on place name or description
    residual_words = nl_parsed.get('residual_words', [])
    if residual_words:
        search_filters = []
        for w in residual_words:
            search_filters.append(Place.name.ilike(f"%{w}%"))
            search_filters.append(Place.description.ilike(f"%{w}%"))
            search_filters.append(Place.address.ilike(f"%{w}%"))
        db_query = db_query.filter(db.or_(*search_filters))
    elif query_str and not nl_parsed.get('cities') and not nl_parsed.get('subcategory_slugs') and not nl_parsed.get('category_slugs'):
        words = [w for w in re.split(r'\s+', query_str) if len(w) > 2 and w.lower() not in ['the', 'and', 'for', 'near', 'best', 'with', 'in']]
        if words:
            search_filters = []
            for w in words:
                search_filters.append(Place.name.ilike(f"%{w}%"))
                search_filters.append(Place.description.ilike(f"%{w}%"))
                search_filters.append(Place.address.ilike(f"%{w}%"))
            db_query = db_query.filter(db.or_(*search_filters))

    places_list = db_query.all()

    # In-memory dynamic filters (amenities, live open_now, and computed rating)
    filtered = []
    amenity_tags = [a.strip().lower() for a in amenity_filter.split(',') if a.strip()] if amenity_filter else []
    if nl_parsed.get('amenity_keywords'):
        amenity_tags.extend([ak.lower() for ak in nl_parsed['amenity_keywords']])

    for p in places_list:
        # Check min rating
        if min_rating is not None and p.average_rating < min_rating:
            continue

        # Check open now
        if open_now_param and not p.check_open_now():
            continue

        # Check amenities
        if amenity_tags:
            place_amenities = [a.amenity_name.lower() for a in p.amenities]
            # Match any or all amenity tags
            has_matching_amenity = any(
                any(req_a in pa for pa in place_amenities)
                for req_a in amenity_tags
            )
            if not has_matching_amenity:
                continue

        filtered.append(p)

    # Sorting
    if sort_by == 'rating_desc':
        filtered.sort(key=lambda x: (x.average_rating, x.review_count), reverse=True)
    elif sort_by == 'reviews_desc':
        filtered.sort(key=lambda x: x.review_count, reverse=True)
    elif sort_by == 'price_asc':
        price_order = {'₹': 1, '₹₹': 2, '₹₹₹': 3}
        filtered.sort(key=lambda x: price_order.get(x.price_level, 2))
    elif sort_by == 'price_desc':
        price_order = {'₹': 1, '₹₹': 2, '₹₹₹': 3}
        filtered.sort(key=lambda x: price_order.get(x.price_level, 2), reverse=True)
    elif sort_by == 'newest':
        filtered.sort(key=lambda x: x.created_at, reverse=True)
    else:  # relevance
        filtered.sort(key=lambda x: (x.average_rating * 10 + min(x.review_count, 50)), reverse=True)

    if limit and limit > 0:
        filtered = filtered[:limit]

    return jsonify({
        'total': len(filtered),
        'parsed_query': nl_parsed if query_str else None,
        'places': [p.to_dict() for p in filtered]
    })


@places_bp.route('/places/<int:place_id>', methods=['GET'])
def get_place_details(place_id):
    place = db.session.get(Place, place_id)
    if not place:
        return jsonify({'error': 'Place not found'}), 404

    # increment view count
    place.views_count += 1
    db.session.commit()

    return jsonify(place.to_dict(include_reviews=True))


@places_bp.route('/places/<int:place_id>/reviews', methods=['POST'])
def add_review(place_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Please log in to write a review.'}), 401

    place = db.session.get(Place, place_id)
    if not place:
        return jsonify({'error': 'Place not found'}), 404

    data = request.get_json() or {}
    rating = data.get('rating')
    comment = data.get('comment', '').strip()

    if not rating or not comment:
        return jsonify({'error': 'Rating (1-5) and comment are required.'}), 400

    try:
        rating_val = float(rating)
        if not (1.0 <= rating_val <= 5.0):
            return jsonify({'error': 'Rating must be between 1 and 5.'}), 400
    except ValueError:
        return jsonify({'error': 'Invalid rating number.'}), 400

    # Check if user already reviewed
    existing_review = Review.query.filter_by(place_id=place_id, user_id=user_id).first()
    if existing_review:
        existing_review.rating = rating_val
        existing_review.comment = comment
        db.session.commit()
        return jsonify({
            'message': 'Your review was updated successfully.',
            'review': existing_review.to_dict(),
            'place': place.to_dict()
        })

    new_review = Review(
        place_id=place_id,
        user_id=user_id,
        rating=rating_val,
        comment=comment,
        is_demo=False
    )
    db.session.add(new_review)
    db.session.commit()

    return jsonify({
        'message': 'Review submitted successfully!',
        'review': new_review.to_dict(),
        'place': place.to_dict()
    }), 201


@places_bp.route('/places/<int:place_id>/reviews/<int:review_id>', methods=['PUT'])
def edit_review(place_id, review_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    review = db.session.get(Review, review_id)
    if not review or review.place_id != place_id:
        return jsonify({'error': 'Review not found'}), 404

    if review.user_id != user_id:
        return jsonify({'error': 'You can only edit your own reviews.'}), 403

    data = request.get_json() or {}
    rating = data.get('rating')
    comment = data.get('comment', '').strip()

    if rating:
        review.rating = float(rating)
    if comment:
        review.comment = comment

    db.session.commit()
    return jsonify({'message': 'Review updated.', 'review': review.to_dict()})


@places_bp.route('/places/<int:place_id>/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(place_id, review_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    review = db.session.get(Review, review_id)
    if not review or review.place_id != place_id:
        return jsonify({'error': 'Review not found'}), 404

    if review.user_id != user_id:
        return jsonify({'error': 'You can only delete your own reviews.'}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully.'})


@places_bp.route('/places/<int:place_id>/reviews/<int:review_id>/helpful', methods=['POST'])
def vote_helpful_review(place_id, review_id):
    review = db.session.get(Review, review_id)
    if not review or review.place_id != place_id:
        return jsonify({'error': 'Review not found'}), 404

    review.helpful_count += 1
    db.session.commit()
    return jsonify({'message': 'Thank you for your feedback!', 'helpful_count': review.helpful_count})

import os
import sys

# Ensure workspace root is in sys.path
workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if workspace_root not in sys.path:
    sys.path.insert(0, workspace_root)

import json
from datetime import datetime, timezone
from backend.database import db
from backend.models import (
    User, City, Category, Subcategory, Place, PlaceAmenity,
    Review, Question, Answer, Guide, GuidePlace, BusinessProfile
)

def seed_database():
    print("Beginning database seed...")

    # 1. Cities
    cities_data = [
        {
            'name': 'Tanuku',
            'state': 'Andhra Pradesh',
            'lat': 16.7570,
            'lng': 81.6790,
            'image_url': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
            'description': 'A vibrant agricultural and commercial hub in West Godavari, renowned for traditional Andhra cuisine, welcoming warmth, and rich culture.'
        },
        {
            'name': 'Rajahmundry',
            'state': 'Andhra Pradesh',
            'lat': 16.9891,
            'lng': 81.7840,
            'image_url': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
            'description': 'The cultural capital of Andhra Pradesh, resting on the sacred Godavari river, famous for historic ghats, cotton handlooms, and spicy river fish delicacies.'
        },
        {
            'name': 'Vijayawada',
            'state': 'Andhra Pradesh',
            'lat': 16.5062,
            'lng': 80.6480,
            'image_url': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
            'description': 'The City of Victory on the banks of Krishna River, home to Kanaka Durga Temple, bustling trade, and iconic South Indian tiffins.'
        },
        {
            'name': 'Hyderabad',
            'state': 'Telangana',
            'lat': 17.3850,
            'lng': 78.4867,
            'image_url': 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
            'description': 'City of Pearls and high-tech powerhouse, blending historic Nizami palaces, aromatic Biryani, with a world-class IT corridor.'
        },
        {
            'name': 'Bengaluru',
            'state': 'Karnataka',
            'lat': 12.9716,
            'lng': 77.5946,
            'image_url': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
            'description': 'India’s Silicon Valley and Garden City, celebrated for lush parks, vibrant craft breweries, artisanal cafes, and cosmopolitan energy.'
        }
    ]

    city_objs = {}
    for cdata in cities_data:
        existing = City.query.filter_by(name=cdata['name']).first()
        if not existing:
            c = City(**cdata)
            db.session.add(c)
            db.session.flush()
            city_objs[c.name] = c
        else:
            city_objs[existing.name] = existing

    # 2. Categories & Subcategories
    categories_spec = [
        {
            'name': 'Food & Dining',
            'slug': 'food-dining',
            'icon': 'utensils',
            'description': 'Restaurants, cozy cafes, traditional Andhra tiffins, street eats and sweet shops.',
            'subs': ['Restaurants', 'Cafes', 'Bakeries', 'Fast Food', 'Street Food', 'Vegetarian', 'Vegan', 'Desserts', 'Ice Cream', 'Family Dining', 'Fine Dining', 'Food Delivery']
        },
        {
            'name': 'Travel & Stay',
            'slug': 'travel-stay',
            'icon': 'compass',
            'description': 'Comfortable hotels, riverfront resorts, peaceful temples and scenic parks.',
            'subs': ['Hotels', 'Resorts', 'Lodges', 'Homestays', 'Tourist Places', 'Attractions', 'Parks', 'Temples', 'Museums', 'Weekend Getaways', 'Travel Agencies']
        },
        {
            'name': 'Healthcare',
            'slug': 'healthcare',
            'icon': 'heart-pulse',
            'description': 'Multi-specialty hospitals, 24/7 pharmacies, diagnostic centers and emergency clinics.',
            'subs': ['Hospitals', 'Clinics', 'Dentists', 'Pharmacies', 'Diagnostic Centers', 'Eye Care', 'Physiotherapy', 'Medical Specialists']
        },
        {
            'name': 'Shopping',
            'slug': 'shopping',
            'icon': 'shopping-bag',
            'description': 'Modern shopping malls, authentic textile stores, supermarkets and gift boutiques.',
            'subs': ['Shopping Malls', 'Clothing', 'Electronics', 'Supermarkets', 'Grocery', 'Jewellery', 'Furniture', 'Local Markets', 'Book Stores', 'Gift Shops']
        },
        {
            'name': 'Education',
            'slug': 'education',
            'icon': 'graduation-cap',
            'description': 'Prestigious schools, colleges, institutes, libraries and skill academies.',
            'subs': ['Schools', 'Colleges', 'Universities', 'Coaching Centers', 'Training Institutes', 'Libraries', 'Skill Centers']
        },
        {
            'name': 'Essential Services',
            'slug': 'essential-services',
            'icon': 'shield-alert',
            'description': 'Emergency police, fire stations, banks, 24/7 ATMs, power & municipal helplines.',
            'subs': ['Police Stations', 'Fire Stations', 'Emergency Services', 'Government Offices', 'Banks', 'ATMs', 'Post Offices', 'Electricity Services', 'Water Services', 'Gas Services', 'Repair Services']
        },
        {
            'name': 'Transport & Automotive',
            'slug': 'transport-automotive',
            'icon': 'car',
            'description': 'Fuel stations, EV charging points, car & bike service centers, car rentals.',
            'subs': ['Petrol Pumps', 'EV Charging', 'Car Service', 'Bike Service', 'Car Wash', 'Tyre Shops', 'Car Dealers', 'Bike Dealers', 'Driving Schools', 'Rental Services', 'Parking']
        }
    ]

    cat_objs = {}
    subcat_objs = {}

    for cspec in categories_spec:
        cat = Category.query.filter_by(slug=cspec['slug']).first()
        if not cat:
            cat = Category(
                name=cspec['name'],
                slug=cspec['slug'],
                icon=cspec['icon'],
                description=cspec['description']
            )
            db.session.add(cat)
            db.session.flush()
        cat_objs[cat.slug] = cat

        for sub_name in cspec['subs']:
            sub_slug = sub_name.lower().replace(' ', '-').replace('&', 'and')
            sub = Subcategory.query.filter_by(category_id=cat.id, name=sub_name).first()
            if not sub:
                sub = Subcategory(
                    category_id=cat.id,
                    name=sub_name,
                    slug=sub_slug
                )
                db.session.add(sub)
                db.session.flush()
            subcat_objs[(cat.slug, sub_name)] = sub

    # 3. Demo Users
    users_data = [
        {
            'email': 'explorer@demo.truspot.local',
            'name': 'Aarav Sharma',
            'role': 'explorer',
            'city': 'Hyderabad',
            'bio': 'Curious urban explorer searching for hidden culinary gems, scenic nature spots, and reliable local services.',
            'avatar': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        },
        {
            'email': 'guide@demo.truspot.local',
            'name': 'Priya Varma',
            'role': 'guide',
            'city': 'Tanuku',
            'bio': 'Passionate food explorer and West Godavari native with over 150+ authentic verified discoveries across AP.',
            'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
        },
        {
            'email': 'business@demo.truspot.local',
            'name': 'Srikanth Reddy',
            'role': 'business',
            'city': 'Rajahmundry',
            'business_name': 'Riverview Grand Hotel & Dining',
            'bio': 'Hospitality professional managing verified boutique stays and fine dining spaces along Godavari River.',
            'avatar': 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'
        },
        {
            'email': 'kavya@demo.truspot.local',
            'name': 'Kavya Rao',
            'role': 'guide',
            'city': 'Bengaluru',
            'bio': 'Coffee lover, heritage architecture enthusiast, and tech worker documenting the soul of Bengaluru & Vijayawada.',
            'avatar': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
        }
    ]

    user_objs = {}
    for udata in users_data:
        u = User.query.filter_by(email=udata['email']).first()
        if not u:
            u = User(
                email=udata['email'],
                name=udata['name'],
                role=udata['role'],
                city=udata['city'],
                bio=udata['bio'],
                avatar=udata['avatar'],
                business_name=udata.get('business_name', '')
            )
            u.set_password('demo123')
            db.session.add(u)
            db.session.flush()
        user_objs[u.role] = u

    db.session.commit()

    # 4. Realistic Places across all 5 cities
    places_raw = [
        # --- TANUKU ---
        {
            'city': 'Tanuku',
            'category': 'food-dining',
            'subcategory': 'Vegetarian',
            'name': 'Sri Krishna Vilas Pure Veg',
            'address': 'Main Road, Near Old Bus Stand, Tanuku, AP 534211',
            'latitude': 16.7578,
            'longitude': 81.6785,
            'phone': '+91 8819 224455',
            'website': 'https://srikrishnavilas-tanuku.local',
            'price_level': '₹',
            'hours': {'Monday': '06:30 - 22:30', 'Tuesday': '06:30 - 22:30', 'Wednesday': '06:30 - 22:30', 'Thursday': '06:30 - 22:30', 'Friday': '06:30 - 22:30', 'Saturday': '06:30 - 23:00', 'Sunday': '06:30 - 23:00'},
            'desc': 'Legendary traditional Andhra vegetarian tiffin center famous for ghee karam podi idlis, crispy pesarattu, and aromatic filter coffee.',
            'image_url': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Vegetarian', 'Dine-in', 'Takeaway', 'Family Friendly', 'Breakfast', 'Parking'],
            'is_verified': True
        },
        {
            'city': 'Tanuku',
            'category': 'food-dining',
            'subcategory': 'Restaurants',
            'name': 'Godavari Ruchulu Family Dining',
            'address': 'Rastrapathi Road, Near Clock Tower, Tanuku, AP 534211',
            'latitude': 16.7552,
            'longitude': 81.6812,
            'phone': '+91 8819 228899',
            'website': 'https://godavariruchulu.local',
            'price_level': '₹₹',
            'hours': {'all_days': '11:00 - 23:00'},
            'desc': 'Authentic West Godavari home-style spices, Natukodi pulusu with Garelu, Avakaya biryani, and river-fresh prawn fry.',
            'image_url': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Delivery', 'Dine-in', 'Takeaway', 'Family Friendly', 'Air Conditioned', 'Parking'],
            'is_verified': True
        },
        {
            'city': 'Tanuku',
            'category': 'travel-stay',
            'subcategory': 'Hotels',
            'name': 'Hotel Vytla Residency',
            'address': 'Opposite Railway Station, Station Road, Tanuku, AP 534211',
            'latitude': 16.7595,
            'longitude': 81.6760,
            'phone': '+91 8819 231122',
            'website': 'https://vytlaresidency.local',
            'price_level': '₹₹',
            'hours': {'is_24_7': True},
            'desc': 'Modern executive stay offering clean spacious rooms, complimentary high-speed Wi-Fi, 24/7 room service, and banquet halls.',
            'image_url': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Wi-Fi', 'Parking', 'Free Breakfast', '24/7 Front Desk', 'Air Conditioned'],
            'is_verified': True
        },
        {
            'city': 'Tanuku',
            'category': 'healthcare',
            'subcategory': 'Hospitals',
            'name': 'Sri Venkateswara Multi-Specialty Hospital',
            'address': 'Venkatrayapuram, Tanuku, AP 534215',
            'latitude': 16.7530,
            'longitude': 81.6850,
            'phone': '+91 8819 220108',
            'website': 'https://svhospital-tanuku.local',
            'price_level': '₹₹',
            'hours': {'is_24_7': True},
            'desc': 'Trusted healthcare destination with 24/7 emergency trauma care, in-house pharmacy, ICU facilities, and senior cardiologists.',
            'image_url': 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
            'amenities': ['24/7 Service', 'Emergency Availability', 'In-house Pharmacy', 'Insurance Support', 'Ambulance Service'],
            'is_verified': True
        },
        {
            'city': 'Tanuku',
            'category': 'essential-services',
            'subcategory': 'Police Stations',
            'name': 'Tanuku Town Police Station',
            'address': 'Main High Road, Tanuku, AP 534211',
            'latitude': 16.7565,
            'longitude': 81.6795,
            'phone': '+91 8819 222100',
            'website': '',
            'price_level': '₹',
            'hours': {'is_24_7': True},
            'desc': 'Local municipal law enforcement and public grievance cell operating 24 hours daily with prompt response patrols.',
            'image_url': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
            'amenities': ['24/7 Availability', 'Emergency status', 'Public Assistance'],
            'is_verified': True
        },
        {
            'city': 'Tanuku',
            'category': 'transport-automotive',
            'subcategory': 'EV Charging',
            'name': 'Jio-bp Pulse Fast EV Charger',
            'address': 'NH-16 Bypass Junction, Tanuku, AP 534211',
            'latitude': 16.7620,
            'longitude': 81.6880,
            'phone': '+91 1800 891 9023',
            'website': 'https://jiobppulse.com',
            'price_level': '₹₹',
            'hours': {'is_24_7': True},
            'desc': 'High-power 60kW DC CCS2 dual-gun fast charging station with covered waiting lounge and tire pressure check point.',
            'image_url': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
            'amenities': ['EV Support', '24/7 Service', 'Fast Charging', 'Restrooms', 'Parking'],
            'is_verified': True
        },

        # --- RAJAHMUNDRY ---
        {
            'city': 'Rajahmundry',
            'category': 'travel-stay',
            'subcategory': 'Hotels',
            'name': 'Riverview Grand Hotel & Dining',
            'address': 'Kotilingala Ghat Road, Rajahmundry, AP 533101',
            'latitude': 16.9940,
            'longitude': 81.7780,
            'phone': '+91 883 244 5566',
            'website': 'https://riverviewgrand.local',
            'price_level': '₹₹₹',
            'hours': {'is_24_7': True},
            'desc': 'Panoramic views of the majestic Godavari river and arch bridge, rooftop infinity pool, lavish suites, and curated boat cruise bookings.',
            'image_url': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Swimming Pool', 'Wi-Fi', 'Parking', 'Free Breakfast', 'River View', 'Dine-in'],
            'is_verified': True
        },
        {
            'city': 'Rajahmundry',
            'category': 'food-dining',
            'subcategory': 'Fast Food',
            'name': 'Sri Kanya Comfort Biryani & Tiffins',
            'address': 'Danavaipeta, Rajahmundry, AP 533103',
            'latitude': 16.9910,
            'longitude': 81.7820,
            'phone': '+91 883 246 7890',
            'website': 'https://srikanya-rjy.local',
            'price_level': '₹₹',
            'hours': {'all_days': '10:30 - 23:00'},
            'desc': 'Beloved for fiery Rayalaseema & Godavari style Donne biryani, Ulvacharu chicken biryani, and tender mutton chukka fry.',
            'image_url': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Takeaway', 'Delivery', 'Dine-in', 'Family Friendly', 'Air Conditioned'],
            'is_verified': True
        },
        {
            'city': 'Rajahmundry',
            'category': 'shopping',
            'subcategory': 'Clothing',
            'name': 'Kothapalli Silk & Handloom Sarees',
            'address': 'Main Bazaar, Near Syamala Theatre, Rajahmundry, AP 533101',
            'latitude': 16.9880,
            'longitude': 81.7850,
            'phone': '+91 883 242 1234',
            'website': '',
            'price_level': '₹₹',
            'hours': {'all_days': '10:00 - 21:30'},
            'desc': 'Authentic traditional Godavari cottons, Uppada silk pattu, and pure hand-woven wedding sarees directly from local artisan weavers.',
            'image_url': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Local Handlooms', 'Air Conditioned', 'Card Payments', 'Gift Packing'],
            'is_verified': True
        },
        {
            'city': 'Rajahmundry',
            'category': 'healthcare',
            'subcategory': 'Hospitals',
            'name': 'GSL Medical College & Super Specialty Hospital',
            'address': 'NH-16, Laxmipuram, Rajahmundry, AP 533296',
            'latitude': 17.0250,
            'longitude': 81.8100,
            'phone': '+91 883 248 4999',
            'website': 'https://gslhospital.local',
            'price_level': '₹₹',
            'hours': {'is_24_7': True},
            'desc': 'Premier regional hospital with Level-1 emergency trauma care, 1000+ beds, advanced radiology, and 24/7 blood bank.',
            'image_url': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
            'amenities': ['24/7 Service', 'Emergency Availability', 'In-house Pharmacy', 'Insurance Support', 'ICU'],
            'is_verified': True
        },
        {
            'city': 'Rajahmundry',
            'category': 'transport-automotive',
            'subcategory': 'Car Service',
            'name': 'Bosch Car Service Godavari Hub',
            'address': 'Jallikakinada Road, Morampudi, Rajahmundry, AP 533106',
            'latitude': 16.9750,
            'longitude': 81.8020,
            'phone': '+91 883 249 5555',
            'website': 'https://boschcarservice.in',
            'price_level': '₹₹',
            'hours': {'all_days': '08:30 - 20:00'},
            'desc': 'Certified multi-brand car servicing, computerized engine scanning, wheel alignment, periodic oil service, and denting & painting.',
            'image_url': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Vehicle Type', 'Car Service', 'Genuine Parts', 'Waiting Lounge', 'Warranty Support'],
            'is_verified': True
        },

        # --- VIJAYAWADA ---
        {
            'city': 'Vijayawada',
            'category': 'food-dining',
            'subcategory': 'Vegetarian',
            'name': 'Babai Hotel Vintage Tiffins',
            'address': 'MG Road, Governorpet, Vijayawada, AP 520002',
            'latitude': 16.5120,
            'longitude': 80.6280,
            'phone': '+91 866 257 6677',
            'website': 'https://babaihotel.local',
            'price_level': '₹',
            'hours': {'Monday': '06:00 - 22:30', 'Tuesday': '06:00 - 22:30', 'Wednesday': '06:00 - 22:30', 'Thursday': '06:00 - 22:30', 'Friday': '06:00 - 22:30', 'Saturday': '06:00 - 23:00', 'Sunday': '06:00 - 23:00'},
            'desc': 'Historic breakfast institution loved since 1942 for its soft melt-in-mouth idlis soaked in homemade white butter (venna) and spicy podi.',
            'image_url': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Vegetarian', 'Takeaway', 'Dine-in', 'Iconic Heritage', 'Quick Service'],
            'is_verified': True
        },
        {
            'city': 'Vijayawada',
            'category': 'travel-stay',
            'subcategory': 'Temples',
            'name': 'Sri Durga Malleswara Swamy Varla Devasthanam',
            'address': 'Indrakeeladri Hill, Vijayawada, AP 520001',
            'latitude': 16.5140,
            'longitude': 80.6050,
            'phone': '+91 866 242 3600',
            'website': 'https://kanakadurgatemple.org',
            'price_level': '₹',
            'hours': {'all_days': '04:00 - 21:00'},
            'desc': 'Revered hilltop temple of Goddess Kanaka Durga overlooking Krishna river and Prakasam Barrage. Peaceful spiritual ambiance.',
            'image_url': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Spiritual', 'Shoe Stand', 'Prasadam Counter', 'Ropeway / Lift', 'Scenic View'],
            'is_verified': True
        },
        {
            'city': 'Vijayawada',
            'category': 'shopping',
            'subcategory': 'Shopping Malls',
            'name': 'PVP Square Mall & Multiplex',
            'address': 'MG Road, Benz Circle, Vijayawada, AP 520010',
            'latitude': 16.5020,
            'longitude': 80.6510,
            'phone': '+91 866 667 7888',
            'website': 'https://pvpsquare.com',
            'price_level': '₹₹',
            'hours': {'all_days': '10:00 - 22:30'},
            'desc': 'Vijayawada premier shopping destination featuring international fashion brands, multi-cuisine food court, and multiplex cinema.',
            'image_url': 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Parking', 'Food Court', 'Cinema', 'Air Conditioned', 'Kids Play Zone'],
            'is_verified': True
        },
        {
            'city': 'Vijayawada',
            'category': 'healthcare',
            'subcategory': 'Hospitals',
            'name': 'Manipal Hospital Vijayawada',
            'address': 'Near Varun Motors, Tadepalli, Vijayawada, AP 522501',
            'latitude': 16.4850,
            'longitude': 80.6120,
            'phone': '+91 866 646 6666',
            'website': 'https://manipalhospitals.com/vijayawada',
            'price_level': '₹₹₹',
            'hours': {'is_24_7': True},
            'desc': 'Tertiary care hospital offering robotic surgery, 24/7 cardiac emergency unit, pediatric ICU, and comprehensive health checkups.',
            'image_url': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
            'amenities': ['24/7 Service', 'Emergency Availability', 'In-house Pharmacy', 'Insurance Support', 'Ambulance'],
            'is_verified': True
        },
        {
            'city': 'Vijayawada',
            'category': 'essential-services',
            'subcategory': 'Fire Stations',
            'name': 'Vijayawada Central Fire Station',
            'address': 'Governorpet, Near Bus Stand, Vijayawada, AP 520002',
            'latitude': 16.5100,
            'longitude': 80.6250,
            'phone': '101',
            'website': '',
            'price_level': '₹',
            'hours': {'is_24_7': True},
            'desc': 'Primary municipal emergency response department for fire rescue, flood relief, and disaster emergency mitigation.',
            'image_url': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
            'amenities': ['24/7 Availability', 'Emergency status', 'Disaster Relief'],
            'is_verified': True
        },

        # --- HYDERABAD ---
        {
            'city': 'Hyderabad',
            'category': 'food-dining',
            'subcategory': 'Fine Dining',
            'name': 'Jewel of Nizam – The Minar',
            'address': 'The Golkonda Resort, Gandipet, Hyderabad, TS 500075',
            'latitude': 17.3910,
            'longitude': 78.3280,
            'phone': '+91 40 3069 6969',
            'website': 'https://golkondaresorts.com',
            'price_level': '₹₹₹',
            'hours': {'all_days': '12:30 - 23:30'},
            'desc': 'Exquisite tower dining 100 feet in the sky serving royal Nizami delicacies, slow-cooked Kacchi Dum Biryani, and Haleem.',
            'image_url': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Fine Dining', 'Dine-in', 'Outdoor Seating', 'Valet Parking', 'Scenic View'],
            'is_verified': True
        },
        {
            'city': 'Hyderabad',
            'category': 'food-dining',
            'subcategory': 'Cafes',
            'name': 'Roastery Coffee House',
            'address': 'Road No. 14, Banjara Hills, Hyderabad, TS 500034',
            'latitude': 17.4190,
            'longitude': 78.4350,
            'phone': '+91 40 2355 4567',
            'website': 'https://roasterycoffee.co.in',
            'price_level': '₹₹',
            'hours': {'all_days': '08:00 - 23:00'},
            'desc': 'Gorgeous bungalow cafe with lush green patio, serving single-origin estate brews, French press, sourdough toasts, and artisanal pastas.',
            'image_url': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Wi-Fi', 'Outdoor Seating', 'Pet Friendly', 'Takeaway', 'Dine-in', 'Parking'],
            'is_verified': True
        },
        {
            'city': 'Hyderabad',
            'category': 'healthcare',
            'subcategory': 'Hospitals',
            'name': 'Apollo Hospitals Jubilee Hills',
            'address': 'Road No. 72, Film Nagar, Jubilee Hills, Hyderabad, TS 500033',
            'latitude': 17.4240,
            'longitude': 78.4110,
            'phone': '+91 40 2360 7777',
            'website': 'https://hyderabad.apollohospitals.com',
            'price_level': '₹₹₹',
            'hours': {'is_24_7': True},
            'desc': 'JCI-accredited world class medical institute renowned for cardiology, oncology, organ transplants, and 24/7 air ambulance response.',
            'image_url': 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
            'amenities': ['24/7 Service', 'Emergency Availability', 'In-house Pharmacy', 'Insurance Support', 'Appointment Booking'],
            'is_verified': True
        },
        {
            'city': 'Hyderabad',
            'category': 'travel-stay',
            'subcategory': 'Attractions',
            'name': 'Golconda Fort & Sound-Light Show',
            'address': 'Ibrahim Bagh, Hyderabad, TS 500008',
            'latitude': 17.3833,
            'longitude': 78.4011,
            'phone': '+91 40 2351 2401',
            'website': 'https://telanganatourism.gov.in',
            'price_level': '₹',
            'hours': {'all_days': '09:00 - 17:30'},
            'desc': 'Magnificent medieval citadel famous for acoustic marvels, diamond trade history (Koh-i-Noor origin), and captivating evening light show.',
            'image_url': 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Heritage Tour', 'Parking', 'Guide Support', 'Scenic Views'],
            'is_verified': True
        },
        {
            'city': 'Hyderabad',
            'category': 'transport-automotive',
            'subcategory': 'EV Charging',
            'name': 'Tata Power EZ Charge Hitec City',
            'address': 'Cyber Gateway, Madhapur, Hitec City, Hyderabad, TS 500081',
            'latitude': 17.4480,
            'longitude': 78.3750,
            'phone': '+91 1800 209 5161',
            'website': 'https://tatapower.com/ev',
            'price_level': '₹₹',
            'hours': {'is_24_7': True},
            'desc': 'Ultra-fast public EV charging station located in the heart of Cyberabad with CCS2, CHAdeMO and Type-2 connectors.',
            'image_url': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
            'amenities': ['EV Support', '24/7 Service', 'Fast Charging', 'App Integration', 'Restrooms'],
            'is_verified': True
        },

        # --- BENGALURU ---
        {
            'city': 'Bengaluru',
            'category': 'food-dining',
            'subcategory': 'Cafes',
            'name': 'Third Wave Coffee Indiranagar',
            'address': '12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560038',
            'latitude': 12.9719,
            'longitude': 77.6412,
            'phone': '+91 80 4370 1234',
            'website': 'https://thirdwavecoffeeroasters.com',
            'price_level': '₹₹',
            'hours': {'all_days': '07:30 - 01:00'},
            'desc': 'Signature specialty cafe buzzing with coders, founders, and students. Pour-overs, cold brew tonic, and delicious bagel sandwiches.',
            'image_url': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Wi-Fi', 'Outdoor Seating', 'Pet Friendly', 'Takeaway', 'Dine-in', 'Open Late'],
            'is_verified': True
        },
        {
            'city': 'Bengaluru',
            'category': 'food-dining',
            'subcategory': 'Vegetarian',
            'name': 'Vidyarthi Bhavan Gandhi Bazaar',
            'address': 'Gandhi Bazaar Main Road, Basavanagudi, Bengaluru, KA 560004',
            'latitude': 12.9449,
            'longitude': 77.5714,
            'phone': '+91 80 2667 7588',
            'website': 'https://vidyarthibhavan.in',
            'price_level': '₹',
            'hours': {'Monday': '06:30 - 11:30', 'Tuesday': '06:30 - 11:30', 'Wednesday': '06:30 - 11:30', 'Thursday': 'Closed', 'Friday': '06:30 - 11:30', 'Saturday': '06:30 - 12:00', 'Sunday': '06:30 - 12:00'},
            'desc': 'Iconic heritage cafe functioning since 1943. Known worldwide for thick, golden, crispy butter Masala Dosa stacked sky-high by waiters.',
            'image_url': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Vegetarian', 'Heritage Landmark', 'Dine-in', 'Takeaway'],
            'is_verified': True
        },
        {
            'city': 'Bengaluru',
            'category': 'travel-stay',
            'subcategory': 'Parks',
            'name': 'Cubbon Park & Bamboo Groves',
            'address': 'Kasturba Road, Sampangi Rama Nagar, Bengaluru, KA 560001',
            'latitude': 12.9738,
            'longitude': 77.5906,
            'phone': '+91 80 2286 4123',
            'website': 'https://horticulture.karnataka.gov.in',
            'price_level': '₹',
            'hours': {'all_days': '06:00 - 19:00'},
            'desc': '300-acre lush botanical paradise in the city heart. Home to colonial buildings, quiet jogging trails, dog parks, and reading corners.',
            'image_url': 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Pet Friendly', 'Jogging Track', 'Family Friendly', 'Parking', 'Scenic Views'],
            'is_verified': True
        },
        {
            'city': 'Bengaluru',
            'category': 'shopping',
            'subcategory': 'Book Stores',
            'name': 'Blossom Book House Church Street',
            'address': 'Church Street, Shanthala Nagar, Ashok Nagar, Bengaluru, KA 560001',
            'latitude': 12.9745,
            'longitude': 77.6050,
            'phone': '+91 80 2555 9733',
            'website': 'https://blossombookhouse.com',
            'price_level': '₹',
            'hours': {'all_days': '10:30 - 21:30'},
            'desc': 'Bengaluru’s beloved multi-floor indie bookstore packed ceiling-high with rare second-hand volumes, classics, graphic novels, and poetry.',
            'image_url': 'https://images.unsplash.com/photo-1507842229452-e4210374e2d4?auto=format&fit=crop&w=800&q=80',
            'amenities': ['Book Stores', 'Air Conditioned', 'Rare Editions', 'Card Payments'],
            'is_verified': True
        },
        {
            'city': 'Bengaluru',
            'category': 'essential-services',
            'subcategory': 'Emergency Services',
            'name': 'Narayana Health City Emergency Hub',
            'address': 'Bommasandra Industrial Area, Anekal Taluk, Bengaluru, KA 560099',
            'latitude': 12.8150,
            'longitude': 77.6910,
            'phone': '+91 80 7122 2222',
            'website': 'https://narayanahealth.org',
            'price_level': '₹₹',
            'hours': {'is_24_7': True},
            'desc': 'World-class 24/7 cardiac and trauma emergency response center with top surgical teams and rapid mobile ICU dispatch.',
            'image_url': 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
            'amenities': ['24/7 Availability', 'Emergency status', 'Insurance Support', 'In-house Pharmacy'],
            'is_verified': True
        }
    ]

    created_places = []
    for praw in places_raw:
        city = city_objs.get(praw['city'])
        cat = cat_objs.get(praw['category'])
        sub = subcat_objs.get((praw['category'], praw['subcategory']))

        if not city or not cat:
            continue

        existing_p = Place.query.filter_by(name=praw['name'], city_id=city.id).first()
        if not existing_p:
            p = Place(
                name=praw['name'],
                city_id=city.id,
                category_id=cat.id,
                subcategory_id=sub.id if sub else None,
                address=praw['address'],
                latitude=praw['latitude'],
                longitude=praw['longitude'],
                phone=praw['phone'],
                website=praw['website'],
                price_level=praw['price_level'],
                opening_hours_json=json.dumps(praw['hours']),
                description=praw['desc'],
                image_url=praw['image_url'],
                is_demo=True,
                is_verified=praw.get('is_verified', True),
                views_count=120
            )
            db.session.add(p)
            db.session.flush()

            for a_name in praw['amenities']:
                db.session.add(PlaceAmenity(place_id=p.id, amenity_name=a_name))

            created_places.append(p)
        else:
            created_places.append(existing_p)

    db.session.commit()

    # 5. Reviews
    sample_reviews = [
        ("Aarav Sharma", 5.0, "Hands down the best place in the region! Superb quality, warm hospitality, and pure authentic taste. Highly recommended!"),
        ("Priya Varma", 4.5, "Authentic flavours and spot-on service. The ambiance is relaxed and the staff are helpful. Great value for money."),
        ("Kavya Rao", 4.0, "Very pleasant experience. Clean, well organized, and easy to reach. Will definitely come back with friends."),
        ("Suresh Naidu", 5.0, "A true hidden gem! We stopped by during our road trip and were blown away by how genuine and efficient the service is."),
        ("Ananya Das", 4.5, "Consistent quality every single time. Definitely one of the proudest highlights of our city!")
    ]

    for p in created_places:
        if not p.reviews:
            for idx, (uname, rating, comm) in enumerate(sample_reviews[:3]):
                u = user_objs.get('explorer') if idx == 0 else (user_objs.get('guide') if idx == 1 else user_objs.get('business'))
                r = Review(
                    place_id=p.id,
                    user_id=u.id if u else 1,
                    rating=rating,
                    comment=comm,
                    helpful_count=idx * 3 + 2,
                    is_demo=True
                )
                db.session.add(r)

    # 6. Community Q&A (Questions & Answers)
    sample_questions = [
        {
            'city': 'Tanuku',
            'category': 'food-dining',
            'title': 'Where can I find the most authentic Ghee Karam Dosa in Tanuku for early morning breakfast?',
            'content': 'I am visiting Tanuku for two days with my family. We want pure traditional Andhra tiffin spots that open before 7 AM.',
            'answer': 'Sri Krishna Vilas Pure Veg near Old Bus Stand is unmatched. Their hot ghee podi idli and pesarattu are legendary. Reaches full crowd by 8 AM!'
        },
        {
            'city': 'Rajahmundry',
            'category': 'travel-stay',
            'title': 'What is the best time of day to enjoy the Godavari river boat cruise from Kotilingala Ghat?',
            'content': 'Planning a weekend sunset outing with friends. Do we need prior tickets or are boat rides easily available on spot?',
            'answer': 'Around 4:45 PM to catch the sunset glowing behind the historic arch bridge is magical! Counter tickets are available directly at Kotilingala ghat.'
        },
        {
            'city': 'Vijayawada',
            'category': 'travel-stay',
            'title': 'Is there lift / ropeway access available at Kanaka Durga Temple for senior citizens?',
            'content': 'Visiting with my grandparents who cannot climb steep stairs. What are the best accessibility options?',
            'answer': 'Yes, there is both a Ghat road vehicle facility (temple electric bus) and a passenger lift from the foot of Indrakeeladri hill.'
        },
        {
            'city': 'Hyderabad',
            'category': 'food-dining',
            'title': 'Best quiet outdoor cafe in Banjara Hills for remote working with reliable Wi-Fi?',
            'content': 'Need a green spot with good espresso and laptop-friendly seating for 2-3 hours of work.',
            'answer': 'Roastery Coffee House on Road 14 Banjara Hills has a lush courtyard, solid Wi-Fi, and top-tier cold brews.'
        },
        {
            'city': 'Bengaluru',
            'category': 'shopping',
            'title': 'Can I find vintage English classics and out-of-print books at Blossom Book House?',
            'content': 'Heard this is India’s biggest second-hand bookstore. Any tips on navigating Church Street stores?',
            'answer': 'Absolutely! Ask the staff on the 1st floor for the vintage fiction section. You can find copies from the 1960s at unbelievable bargains.'
        }
    ]

    for qdata in sample_questions:
        city = city_objs.get(qdata['city'])
        cat = cat_objs.get(qdata['category'])
        if not city:
            continue

        existing_q = Question.query.filter_by(title=qdata['title']).first()
        if not existing_q:
            q = Question(
                city_id=city.id,
                category_id=cat.id if cat else None,
                user_id=user_objs['explorer'].id,
                title=qdata['title'],
                content=qdata['content']
            )
            db.session.add(q)
            db.session.flush()

            ans = Answer(
                question_id=q.id,
                user_id=user_objs['guide'].id,
                content=qdata['answer'],
                helpful_count=7
            )
            db.session.add(ans)

    # 7. Curated Guides
    sample_guides = [
        {
            'city': 'Tanuku',
            'title': 'Best Traditional Andhra Food Trail in Tanuku',
            'desc': 'From piping hot ghee pesarattu to spicy West Godavari river delicacies, this trail covers must-visit culinary icons.',
            'cover': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
            'places': ['Sri Krishna Vilas Pure Veg', 'Godavari Ruchulu Family Dining']
        },
        {
            'city': 'Rajahmundry',
            'title': 'Godavari Heritage & Riverfront Escapes',
            'desc': 'Experience peaceful ghats, historic bridges, and riverfront luxury dining along the sacred waters of Rajahmundry.',
            'cover': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
            'places': ['Riverview Grand Hotel & Dining', 'Sri Kanya Comfort Biryani & Tiffins']
        },
        {
            'city': 'Vijayawada',
            'title': 'Krishna River Ghats & Iconic Tiffins Guide',
            'desc': 'Start with holy blessings at Kanaka Durga Temple followed by world-famous white butter idlis at vintage Babai Hotel.',
            'cover': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
            'places': ['Sri Durga Malleswara Swamy Varla Devasthanam', 'Babai Hotel Vintage Tiffins', 'PVP Square Mall & Multiplex']
        },
        {
            'city': 'Hyderabad',
            'title': 'Royal Nizam Heritage & Artisan Coffee Trail',
            'desc': 'A contrast of medieval Golconda Fort grandeur and tranquil lush green artisan cafes in Banjara Hills.',
            'cover': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
            'places': ['Golconda Fort & Sound-Light Show', 'Roastery Coffee House', 'Jewel of Nizam – The Minar']
        },
        {
            'city': 'Bengaluru',
            'title': 'Garden City Cafe Culture & Classic Bookstores',
            'desc': 'Spend a serene morning at Cubbon Park, hunt second-hand books on Church Street, and unwind with specialty brews.',
            'cover': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
            'places': ['Cubbon Park & Bamboo Groves', 'Blossom Book House Church Street', 'Third Wave Coffee Indiranagar']
        }
    ]

    for gdata in sample_guides:
        city = city_objs.get(gdata['city'])
        if not city:
            continue

        existing_g = Guide.query.filter_by(title=gdata['title']).first()
        if not existing_g:
            g = Guide(
                city_id=city.id,
                user_id=user_objs['guide'].id,
                title=gdata['title'],
                description=gdata['desc'],
                cover_image=gdata['cover'],
                likes_count=18
            )
            db.session.add(g)
            db.session.flush()

            for idx, pname in enumerate(gdata['places'], 1):
                p_match = Place.query.filter_by(name=pname).first()
                if p_match:
                    gp = GuidePlace(
                        guide_id=g.id,
                        place_id=p_match.id,
                        order_index=idx,
                        note="Essential local highlight on this itinerary"
                    )
                    db.session.add(gp)

    # 8. Link Business Owner to a place
    rjy_hotel = Place.query.filter_by(name='Riverview Grand Hotel & Dining').first()
    if rjy_hotel and user_objs.get('business'):
        existing_bp = BusinessProfile.query.filter_by(place_id=rjy_hotel.id).first()
        if not existing_bp:
            bp = BusinessProfile(
                user_id=user_objs['business'].id,
                place_id=rjy_hotel.id,
                is_verified=True,
                views_count=184
            )
            db.session.add(bp)

    db.session.commit()
    print("Database seeding completed successfully!")

if __name__ == '__main__':
    from backend.app import app
    with app.app_context():
        seed_database()

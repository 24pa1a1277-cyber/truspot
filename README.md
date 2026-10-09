# TRUSPOT – LOCAL DISCOVERY PLATFORM
> **"Real People, Real Places."**

TruSpot is a modern, production-style multi-city local discovery platform helping users find trustworthy places, local recommendations, community reviews, local Q&A, and curated guides across:
- **Tanuku, Andhra Pradesh**
- **Rajahmundry, Andhra Pradesh**
- **Vijayawada, Andhra Pradesh**
- **Hyderabad, Telangana**
- **Bengaluru, Karnataka**
- **All Cities** (aggregated discovery)

---

## 🚀 Key Features

1. **Multi-City Switching & Interactive OpenStreetMap**:
   - Dynamic map markers via **Leaflet.js** and OpenStreetMap tiles.
   - Zero Google Maps API keys required; seamless offline fallback.
2. **Search Engine & Natural Language Querying**:
   - Parses natural-language phrases like:
     - *"best vegetarian restaurants in Tanuku"*
     - *"cheap hotels under ₹1000"*
     - *"4 star hospitals in Hyderabad"*
     - *"cafes in Bengaluru"*
3. **Dynamic Category & Hierarchical Filters**:
   - 7 Core Categories:
     - *Food & Dining* (Cuisine, Pure Veg, Dine-in, Takeaway, Family Friendly, Outdoor Seating, Parking)
     - *Travel & Stay* (Price per night, Wi-Fi, Pool, Pet-Friendly, Breakfast)
     - *Healthcare* (24/7 Service, Emergency, In-house Pharmacy, Insurance)
     - *Shopping* (Local Handlooms, Malls, Parking, Delivery)
     - *Education* (Schools, Colleges, Hostels, Transport)
     - *Essential Services* (Police, Fire, 24/7 Helplines, Public Assistance)
     - *Transport & Automotive* (EV Fast Charging, Petrol, Multi-brand Service)
4. **Transparent "Demo Data" Labeling**:
   - Mock entries and reviews are clearly marked with a `Demo Data` badge to preserve transparency.
5. **Community Review Engine & Live Average Ratings**:
   - Real-time rating recalculation, 5-star breakdown bars, helpful vote counters, and owner replies.
   - Logged-in users can write, edit, and delete their own reviews.
6. **"Ask Locals" Community Q&A**:
   - Dedicated local question feed, city/category filtering, answers with helpful votes.
7. **Curated Local Guides & Contributor Badges**:
   - City trails with ordered places and curator notes.
   - Contributor profiles with earned badges (*Local Curator*, *Top Reviewer*, *Community Guru*, *Verified Local Guide*).
8. **Essential Services High-Priority Portal**:
   - Direct emergency hotline links (Police `100`, Fire `101`, Ambulance `108`), 24/7 toggles, fast directions.
9. **Business Owner Portal**:
   - Claim listings, update information, track page views, and submit official replies to reviews.
10. **Authentication & Quick One-Click Demo Logins**:
    - Fast testing with zero typing:
      - **Demo Explorer**: `explorer@demo.truspot.local` (Password: `demo123`)
      - **Demo Contributor**: `guide@demo.truspot.local` (Password: `demo123`)
      - **Demo Business Owner**: `business@demo.truspot.local` (Password: `demo123`)

---

## 🛠️ Technology Stack

- **Backend**: Python 3, Flask 3.1.3, Flask-SQLAlchemy 3.1.1, Werkzeug 3.1.9, Flask-CORS 6.0.5
- **Database**: SQLite (`database/truspot.db`) auto-seeded on first run
- **Frontend**: Semantic HTML5, Vanilla CSS3 (modern startup design system), Vanilla JavaScript (Modular ES6)
- **Maps**: Leaflet.js (OpenStreetMap)

---

## 💻 Running the Application Locally

1. Install requirements (if not already installed):
   ```bash
   pip install -r requirements.txt
   ```

2. Start the Flask application:
   ```bash
   python backend/app.py
   ```

3. Open your browser and navigate to:
   ```
   http://127.0.0.1:8000
   ```

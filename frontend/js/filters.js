// ==========================================================================
// TRUSPOT - ADVANCED DYNAMIC FILTERS MODULE
// ==========================================================================

const Filters = {
  state: {
    city: 'All Cities',
    category: 'all',
    subcategory: 'all',
    price_level: 'all',
    min_rating: null,
    open_now: false,
    verified: false,
    demo: false,
    amenities: new Set(),
    sort_by: 'relevance'
  },

  categoryConfig: {
    'food-dining': {
      label: 'Food & Dining',
      amenities: ['Vegetarian', 'Vegan', 'Delivery', 'Takeaway', 'Dine-in', 'Family Friendly', 'Outdoor Seating', 'Parking', 'Air Conditioned']
    },
    'travel-stay': {
      label: 'Travel & Stay',
      amenities: ['Wi-Fi', 'Parking', 'Free Breakfast', 'Swimming Pool', 'Pet Friendly', '24/7 Front Desk', 'Scenic Views']
    },
    'healthcare': {
      label: 'Healthcare',
      amenities: ['24/7 Service', 'Emergency Availability', 'In-house Pharmacy', 'Insurance Support', 'Appointment Booking', 'Ambulance Service']
    },
    'shopping': {
      label: 'Shopping',
      amenities: ['Parking', 'Home Delivery', 'Air Conditioned', 'Card Payments', 'Gift Packing', 'Local Handlooms']
    },
    'education': {
      label: 'Education',
      amenities: ['Hostel Facility', 'Transport', 'Library', 'Air Conditioned', 'Lab Facilities']
    },
    'essential-services': {
      label: 'Essential Services',
      amenities: ['24/7 Availability', 'Emergency status', 'Public Assistance', 'ATM Facility']
    },
    'transport-automotive': {
      label: 'Transport & Automotive',
      amenities: ['EV Support', '24/7 Service', 'Fast Charging', 'Car Service', 'Genuine Parts', 'Waiting Lounge']
    }
  },

  init() {
    this.setupEventListeners();
  },

  setupEventListeners() {
    // City filter dropdown inside sidebar
    document.getElementById('filter-city')?.addEventListener('change', (e) => {
      this.state.city = e.target.value;
      // Sync with global header city
      const headerCity = document.getElementById('global-city-select');
      if (headerCity) headerCity.value = e.target.value;
      this.onFilterChange();
    });

    // Category filter dropdown inside sidebar
    document.getElementById('filter-category')?.addEventListener('change', (e) => {
      this.state.category = e.target.value;
      this.updateSubcategoriesDropdown(e.target.value);
      this.renderDynamicAmenities(e.target.value);
      this.state.amenities.clear();
      this.onFilterChange();
    });

    // Subcategory filter dropdown
    document.getElementById('filter-subcategory')?.addEventListener('change', (e) => {
      this.state.subcategory = e.target.value;
      this.onFilterChange();
    });

    // Price range buttons
    document.querySelectorAll('.price-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.price_level = btn.getAttribute('data-price');
        this.onFilterChange();
      });
    });

    // Rating radio pills
    document.querySelectorAll('.rating-filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const ratingVal = pill.getAttribute('data-rating');
        if (pill.classList.contains('active')) {
          pill.classList.remove('active');
          this.state.min_rating = null;
        } else {
          document.querySelectorAll('.rating-filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.state.min_rating = ratingVal ? parseFloat(ratingVal) : null;
        }
        this.onFilterChange();
      });
    });

    // Open Now Switch
    document.getElementById('filter-open-now')?.addEventListener('change', (e) => {
      this.state.open_now = e.target.checked;
      this.onFilterChange();
    });

    // Verified Switch
    document.getElementById('filter-verified')?.addEventListener('change', (e) => {
      this.state.verified = e.target.checked;
      this.onFilterChange();
    });

    // Demo Switch
    document.getElementById('filter-demo')?.addEventListener('change', (e) => {
      this.state.demo = e.target.checked;
      this.onFilterChange();
    });

    // Sort By Dropdown
    document.getElementById('filter-sort-by')?.addEventListener('change', (e) => {
      this.state.sort_by = e.target.value;
      this.onFilterChange();
    });

    // Reset Filters button
    document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
      this.resetFilters();
    });
  },

  updateSubcategoriesDropdown(categorySlug) {
    const subSelect = document.getElementById('filter-subcategory');
    if (!subSelect) return;

    if (!categorySlug || categorySlug === 'all') {
      subSelect.innerHTML = '<option value="all">All Subcategories</option>';
      subSelect.disabled = true;
      return;
    }

    subSelect.disabled = false;
    const cat = window.App?.categories?.find(c => c.slug === categorySlug);
    let html = '<option value="all">All Subcategories</option>';
    if (cat && cat.subcategories) {
      cat.subcategories.forEach(sub => {
        html += `<option value="${sub.slug}">${sub.name}</option>`;
      });
    }
    subSelect.innerHTML = html;
    this.state.subcategory = 'all';
  },

  renderDynamicAmenities(categorySlug) {
    const container = document.getElementById('dynamic-amenities-container');
    const wrap = document.getElementById('dynamic-amenities-group');
    if (!container || !wrap) return;

    if (!categorySlug || categorySlug === 'all' || !this.categoryConfig[categorySlug]) {
      wrap.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    wrap.style.display = 'block';
    const config = this.categoryConfig[categorySlug];
    const labelElem = document.getElementById('dynamic-amenities-label');
    if (labelElem) labelElem.textContent = `${config.label} Specific Filters`;

    container.innerHTML = config.amenities.map(amenity => `
      <button type="button" class="amenity-filter-chip ${this.state.amenities.has(amenity) ? 'active' : ''}" data-amenity="${amenity}">
        ${amenity}
      </button>
    `).join('');

    container.querySelectorAll('.amenity-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const amenityName = chip.getAttribute('data-amenity');
        if (this.state.amenities.has(amenityName)) {
          this.state.amenities.delete(amenityName);
          chip.classList.remove('active');
        } else {
          this.state.amenities.add(amenityName);
          chip.classList.add('active');
        }
        this.onFilterChange();
      });
    });
  },

  resetFilters() {
    this.state = {
      city: document.getElementById('global-city-select')?.value || 'All Cities',
      category: 'all',
      subcategory: 'all',
      price_level: 'all',
      min_rating: null,
      open_now: false,
      verified: false,
      demo: false,
      amenities: new Set(),
      sort_by: 'relevance'
    };

    const filterCity = document.getElementById('filter-city');
    if (filterCity) filterCity.value = this.state.city;

    const filterCat = document.getElementById('filter-category');
    if (filterCat) filterCat.value = 'all';

    this.updateSubcategoriesDropdown('all');
    this.renderDynamicAmenities('all');

    document.querySelectorAll('.price-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-price') === 'all');
    });

    document.querySelectorAll('.rating-filter-pill').forEach(p => p.classList.remove('active'));

    const openNow = document.getElementById('filter-open-now');
    if (openNow) openNow.checked = false;

    const verified = document.getElementById('filter-verified');
    if (verified) verified.checked = false;

    const demo = document.getElementById('filter-demo');
    if (demo) demo.checked = false;

    const sortBy = document.getElementById('filter-sort-by');
    if (sortBy) sortBy.value = 'relevance';

    this.onFilterChange();
    window.showToast('All filters have been reset.', 'info');
  },

  setCity(cityName) {
    this.state.city = cityName;
    const filterCity = document.getElementById('filter-city');
    if (filterCity) filterCity.value = cityName;
    const globalCity = document.getElementById('global-city-select');
    if (globalCity) globalCity.value = cityName;
    this.onFilterChange();
  },

  setCategory(categorySlug) {
    this.state.category = categorySlug;
    const filterCat = document.getElementById('filter-category');
    if (filterCat) filterCat.value = categorySlug;
    this.updateSubcategoriesDropdown(categorySlug);
    this.renderDynamicAmenities(categorySlug);
    this.onFilterChange();
  },

  setSubcategory(subcatSlug) {
    this.state.subcategory = subcatSlug;
    const subSelect = document.getElementById('filter-subcategory');
    if (subSelect) subSelect.value = subcatSlug;
    this.onFilterChange();
  },

  buildQueryParams() {
    const params = new URLSearchParams();

    if (this.state.city && this.state.city !== 'All Cities') {
      params.append('city', this.state.city);
    }
    if (this.state.category && this.state.category !== 'all') {
      params.append('category', this.state.category);
    }
    if (this.state.subcategory && this.state.subcategory !== 'all') {
      params.append('subcategory', this.state.subcategory);
    }
    if (this.state.price_level && this.state.price_level !== 'all') {
      params.append('price_level', this.state.price_level);
    }
    if (this.state.min_rating !== null) {
      params.append('min_rating', this.state.min_rating);
    }
    if (this.state.open_now) {
      params.append('open_now', 'true');
    }
    if (this.state.verified) {
      params.append('verified', 'true');
    }
    if (this.state.demo) {
      params.append('demo', 'true');
    }
    if (this.state.amenities.size > 0) {
      params.append('amenities', Array.from(this.state.amenities).join(','));
    }
    if (this.state.sort_by) {
      params.append('sort_by', this.state.sort_by);
    }

    return params;
  },

  onFilterChange() {
    if (window.App) {
      window.App.loadPlaces();
    }
  }
};

window.Filters = Filters;

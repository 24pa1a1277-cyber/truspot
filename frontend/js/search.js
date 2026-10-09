// ==========================================================================
// TRUSPOT - SEARCH & NATURAL LANGUAGE ENGINE CLIENT MODULE
// ==========================================================================

const SearchEngine = {
  currentQuery: '',

  init() {
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Hero Search Form
    const heroForm = document.getElementById('hero-search-form');
    if (heroForm) {
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('hero-search-input');
        const citySelect = document.getElementById('hero-city-select');
        const query = input?.value.trim() || '';
        const city = citySelect?.value || 'All Cities';

        if (city && city !== 'All Cities') {
          window.Filters.setCity(city);
        }
        this.executeSearch(query);
      });
    }

    // Top Navigation Search
    const navInput = document.getElementById('nav-search-input');
    if (navInput) {
      navInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.executeSearch(navInput.value.trim());
        }
      });
    }

    // Suggestion Chips Click
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const queryText = chip.getAttribute('data-query') || chip.textContent.trim();
        const heroInput = document.getElementById('hero-search-input');
        if (heroInput) heroInput.value = queryText;
        this.executeSearch(queryText);
      });
    });
  },

  executeSearch(queryString) {
    this.currentQuery = queryString;

    // Sync input fields
    const navInput = document.getElementById('nav-search-input');
    const heroInput = document.getElementById('hero-search-input');
    if (navInput) navInput.value = queryString;
    if (heroInput) heroInput.value = queryString;

    // Switch to explore page
    window.Router.navigate('explore');

    // Reload places
    window.App.loadPlaces(queryString);
  },

  renderParsedQueryBadge(parsed) {
    const badgeContainer = document.getElementById('parsed-query-bar');
    if (!badgeContainer) return;

    if (!parsed || (!parsed.city && !parsed.category_slug && !parsed.min_rating && !parsed.price_level && !parsed.open_now && !parsed.amenity_keywords?.length)) {
      badgeContainer.style.display = 'none';
      badgeContainer.innerHTML = '';
      return;
    }

    let pills = [];
    if (parsed.city) pills.push(`📍 City: <strong>${parsed.city}</strong>`);
    if (parsed.category_slug) pills.push(`🏷️ Category: <strong>${parsed.category_slug}</strong>`);
    if (parsed.min_rating) pills.push(`⭐ Min Rating: <strong>${parsed.min_rating}+</strong>`);
    if (parsed.price_level) pills.push(`💰 Price: <strong>${parsed.price_level}</strong>`);
    if (parsed.open_now) pills.push(`🕒 <strong>Open Now</strong>`);
    if (parsed.amenity_keywords?.length) pills.push(`✨ Highlights: <strong>${parsed.amenity_keywords.join(', ')}</strong>`);

    badgeContainer.style.display = 'flex';
    badgeContainer.innerHTML = `
      <div style="background: var(--primary-light); border: 1px solid var(--primary); color: var(--primary-hover); padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.88rem; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; width: 100%;">
        <span style="font-weight: 700;">Smart Search Detected:</span>
        ${pills.map(p => `<span class="badge" style="background: white; border: 1px solid var(--primary); color: var(--primary-hover);">${p}</span>`).join(' ')}
        <button class="btn btn-sm btn-outline" style="margin-left: auto; padding: 2px 8px; font-size: 0.78rem;" onclick="SearchEngine.clearSearch()">
          Clear Search
        </button>
      </div>
    `;
  },

  clearSearch() {
    this.currentQuery = '';
    const navInput = document.getElementById('nav-search-input');
    const heroInput = document.getElementById('hero-search-input');
    if (navInput) navInput.value = '';
    if (heroInput) heroInput.value = '';
    this.renderParsedQueryBadge(null);
    window.App.loadPlaces('');
  }
};

window.SearchEngine = SearchEngine;

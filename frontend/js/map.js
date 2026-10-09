// ==========================================================================
// TRUSPOT - LEAFLET MAP MODULE (OpenStreetMap, Zero API Key Requirement)
// ==========================================================================

const TruMap = {
  mapInstance: null,
  markersLayer: null,
  cityCoordinates: {
    'Tanuku': [16.7570, 81.6790],
    'Rajahmundry': [16.9891, 81.7840],
    'Vijayawada': [16.5062, 80.6480],
    'Hyderabad': [17.3850, 78.4867],
    'Bengaluru': [12.9716, 77.5946],
    'All Cities': [16.5062, 80.6480]
  },

  init(containerId = 'leaflet-map') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }

    try {
      // Default center: Andhra / South India
      this.mapInstance = L.map(containerId, {
        center: [16.7570, 81.6790],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // OpenStreetMap Tiles (free, open, no Google API key needed)
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      });

      tileLayer.on('tileerror', function() {
        console.warn('Map tile failed to load. Graceful fallback active.');
      });

      tileLayer.addTo(this.mapInstance);

      this.markersLayer = L.layerGroup().addTo(this.mapInstance);

      // Invalidate size when resized or tab shown
      setTimeout(() => {
        this.mapInstance?.invalidateSize();
      }, 250);

    } catch (err) {
      console.warn('Leaflet map initialization error (graceful fallback):', err);
      container.innerHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; background: #F1F5F9; color: #64748B; padding: 20px; text-align: center;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 8px;"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>
          <div style="font-weight: 700; color: #1E293B; margin-bottom: 4px;">Map Explorer Mode</div>
          <p style="font-size: 0.85rem; max-width: 280px;">Map markers will populate automatically once places are selected.</p>
        </div>
      `;
    }
  },

  setCityCenter(cityName) {
    if (!this.mapInstance) return;
    const coords = this.cityCoordinates[cityName] || this.cityCoordinates['All Cities'];
    const zoom = cityName === 'All Cities' ? 7 : 13;
    this.mapInstance.setView(coords, zoom, { animate: true });
  },

  updateMarkers(places = []) {
    if (!this.mapInstance || !this.markersLayer) return;

    this.markersLayer.clearLayers();

    if (!places.length) return;

    const bounds = [];

    places.forEach(place => {
      if (!place.latitude || !place.longitude) return;

      const latLng = [place.latitude, place.longitude];
      bounds.push(latLng);

      // Custom HTML Pin Marker
      const customPinIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: #0D9488;
            color: white;
            border-radius: 50% 50% 50% 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(-45deg);
            box-shadow: 0 4px 10px rgba(13, 148, 136, 0.4);
            border: 2px solid white;
          ">
            <span style="transform: rotate(45deg); font-weight: 800; font-size: 11px;">★</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -28]
      });

      const marker = L.marker(latLng, { icon: customPinIcon });

      const popupCoverUrl = window.App?.resolveSpotCoverImage ? window.App.resolveSpotCoverImage(place) : (place.image_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80');
      const sectorKey = place.category_slug || place.category_name || '';
      const subcatKey = place.subcategory_slug || place.subcategory_name || '';

      const popupHtml = `
        <div class="map-popup-card">
          <img 
            src="${popupCoverUrl}" 
            alt="${place.name}" 
            class="map-popup-thumb" 
            onerror="if(window.App && window.App.handleCardImageError){ window.App.handleCardImageError(this, '${sectorKey}', '${subcatKey}'); } else { this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'; }"
          >
          <div class="map-popup-info">
            <div class="map-popup-title">${place.name}</div>
            <div class="map-popup-sub">
              <span>★ ${place.average_rating}</span> • <span>${place.category_name}</span> • <span>${place.city_name}</span>
            </div>
            <div style="font-size: 0.78rem; color: #64748B; margin-bottom: 6px;">${place.address}</div>
            <button class="map-popup-btn" onclick="window.App.openPlaceDetails(${place.id})">
              View Place Details
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      this.markersLayer.addLayer(marker);
    });

    // Auto-fit bounds if multiple places
    if (bounds.length > 1) {
      try {
        this.mapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      } catch (e) {}
    } else if (bounds.length === 1) {
      this.mapInstance.setView(bounds[0], 14);
    }
  }
};

window.TruMap = TruMap;

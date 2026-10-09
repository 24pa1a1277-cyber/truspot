// ==========================================================================
// TRUSPOT - AUTHENTICATION & USER SESSIONS MODULE
// ==========================================================================

const Auth = {
  currentUser: null,
  savedIds: {
    place: new Set(),
    guide: new Set(),
    question: new Set()
  },

  async init() {
    this.setupEventListeners();
    await this.checkAuthStatus();
    if (this.currentUser) {
      await this.loadSavedItems();
    }
  },

  async checkAuthStatus() {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      this.currentUser = data.user || null;
      this.renderUserHeader();
    } catch (err) {
      console.warn('Could not verify auth session:', err);
      this.currentUser = null;
      this.renderUserHeader();
    }
  },

  async loadSavedItems() {
    if (!this.currentUser) return;
    try {
      const res = await fetch('/api/auth/saved');
      if (res.ok) {
        const data = await res.json();
        this.savedIds.place = new Set(data.saved_ids.place || []);
        this.savedIds.guide = new Set(data.saved_ids.guide || []);
        this.savedIds.question = new Set(data.saved_ids.question || []);
        this.updateSavedBadge();
      }
    } catch (err) {
      console.warn('Error fetching saved items:', err);
    }
  },

  updateSavedBadge() {
    const badge = document.getElementById('saved-count-badge');
    if (badge) {
      const total = this.savedIds.place.size + this.savedIds.guide.size + this.savedIds.question.size;
      badge.textContent = total;
      badge.style.display = total > 0 ? 'inline-block' : 'none';
    }
  },

  isSaved(type, id) {
    return this.savedIds[type]?.has(Number(id)) || false;
  },

  async toggleSave(type, id) {
    if (!this.currentUser) {
      this.openAuthModal('login');
      window.showToast('Please log in to save items to your collection.', 'info');
      return false;
    }

    try {
      const res = await fetch('/api/auth/saved/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_type: type, item_id: Number(id) })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.saved) {
          this.savedIds[type].add(Number(id));
          window.showToast(data.message, 'success');
        } else {
          this.savedIds[type].delete(Number(id));
          window.showToast(data.message, 'info');
        }
        this.updateSavedBadge();
        // Update bookmark buttons currently on the screen
        document.querySelectorAll(`[data-save-type="${type}"][data-save-id="${id}"]`).forEach(btn => {
          btn.classList.toggle('saved', data.saved);
        });
        return data.saved;
      } else {
        window.showToast(data.error || 'Failed to update saved item', 'error');
      }
    } catch (err) {
      window.showToast('Network error while saving item', 'error');
    }
    return false;
  },

  async login(email, password, remember = true, targetRoute = null) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember })
      });
      const data = await res.json();
      if (res.ok) {
        this.currentUser = data.user;
        this.renderUserHeader();
        await this.loadSavedItems();
        this.closeAuthModal();
        window.showToast(`Welcome back, ${data.user.name}!`, 'success');
        
        // Designated dashboard routing
        if (targetRoute) {
          window.Router?.navigate(targetRoute);
        } else {
          const role = String(data.user.role || '').toLowerCase();
          if (role === 'business' || role === 'business_owner') {
            window.Router?.navigate('business');
          } else if (role === 'guide') {
            window.Router?.navigate('contributor-portal');
          } else {
            window.Router?.navigate('explore');
          }
        }
        return true;
      } else {
        window.showToast(data.error || 'Login failed', 'error');
        return false;
      }
    } catch (err) {
      window.showToast('Network error during login', 'error');
      return false;
    }
  },

  async businessLogin(email, password, remember = true) {
    try {
      const res = await fetch('/api/auth/business/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember })
      });
      const data = await res.json();
      if (res.ok) {
        const userRole = String(data.user.role || '').toLowerCase();
        if (userRole !== 'business' && userRole !== 'business_owner') {
          window.showToast('Access denied: Account does not have verified business owner privileges.', 'error');
          return false;
        }

        this.currentUser = data.user;
        this.renderUserHeader();
        await this.loadSavedItems();
        this.closeAuthModal();
        window.showToast(`Verified Merchant session established. Welcome back, ${data.user.name}!`, 'success');
        window.Router?.navigate('business');
        return true;
      } else {
        window.showToast(data.error || 'Merchant sign-in failed. Please verify credentials.', 'error');
        return false;
      }
    } catch (err) {
      window.showToast('Network error during merchant login', 'error');
      return false;
    }
  },

  async register(formData) {
    try {
      // Ensure public registration role is restricted to explorer or guide
      if (formData.role !== 'guide') {
        formData.role = 'explorer';
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        this.currentUser = data.user;
        this.renderUserHeader();
        await this.loadSavedItems();
        this.closeAuthModal();
        window.showToast(`Account created! Welcome to TruSpot, ${data.user.name}.`, 'success');
        
        // Designated dashboard route
        if (data.user.role === 'guide') {
          window.Router?.navigate('contributor-portal');
        } else {
          window.Router?.navigate('explore');
        }
        return true;
      } else {
        window.showToast(data.error || 'Registration failed', 'error');
        return false;
      }
    } catch (err) {
      window.showToast('Network error during registration', 'error');
      return false;
    }
  },

  async logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      this.currentUser = null;
      this.savedIds = { place: new Set(), guide: new Set(), question: new Set() };
      this.renderUserHeader();
      this.updateSavedBadge();
      window.showToast('You have been logged out.', 'info');
      window.Router?.navigate('home');
    } catch (err) {
      window.showToast('Error logging out', 'error');
    }
  },

  fillDemoCredentials(role) {
    const credentials = {
      explorer: { email: 'explorer@demo.truspot.local', pass: 'demo123' },
      guide: { email: 'guide@demo.truspot.local', pass: 'demo123' },
      business: { email: 'business@demo.truspot.local', pass: 'demo123' }
    };

    const cred = credentials[role];
    if (cred) {
      if (role === 'business') {
        const emailInput = document.getElementById('merchant-login-email');
        const passInput = document.getElementById('merchant-login-password');
        if (emailInput) emailInput.value = cred.email;
        if (passInput) passInput.value = cred.pass;
      } else {
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');
        if (emailInput) emailInput.value = cred.email;
        if (passInput) passInput.value = cred.pass;
        this.switchAuthTab('login');
      }
    }
  },

  renderUserHeader() {
    const authBtnContainer = document.getElementById('auth-nav-container');
    if (!authBtnContainer) return;

    if (this.currentUser) {
      const role = String(this.currentUser.role || '').toLowerCase();
      let roleLabel = 'Local Explorer';
      let roleBadgeStyle = 'background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE;';
      let portalButtonHtml = '';

      if (role === 'guide') {
        roleLabel = 'Local Contributor';
        roleBadgeStyle = 'background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A;';
        portalButtonHtml = `
          <button class="btn btn-sm btn-outline" style="width: 100%; justify-content: flex-start; margin-bottom: 4px; font-weight: 600;" onclick="window.Router.navigate('contributor-portal'); Auth.toggleUserDropdown(false);">
            ⭐ Contributor Portal
          </button>
        `;
      } else if (role === 'business' || role === 'business_owner') {
        roleLabel = 'Verified Business Owner';
        roleBadgeStyle = 'background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0;';
        portalButtonHtml = `
          <button class="btn btn-sm btn-outline" style="width: 100%; justify-content: flex-start; margin-bottom: 4px; font-weight: 600;" onclick="window.Router.navigate('business'); Auth.toggleUserDropdown(false);">
            🏢 Business Portal
          </button>
        `;
      } else {
        roleLabel = 'Local Explorer';
        portalButtonHtml = `
          <button class="btn btn-sm btn-outline" style="width: 100%; justify-content: flex-start; margin-bottom: 4px; font-weight: 600;" onclick="window.Router.navigate('explore'); Auth.toggleUserDropdown(false);">
            🧭 Explore Places
          </button>
        `;
      }

      authBtnContainer.innerHTML = `
        <div class="user-menu-box" style="position: relative;">
          <button class="user-menu-btn" id="user-dropdown-btn">
            <img src="${this.currentUser.avatar}" alt="${this.currentUser.name}" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=User&background=0D9488&color=fff'">
            <span class="user-name">${this.currentUser.name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div id="user-dropdown-menu" style="display: none; position: absolute; right: 0; top: 110%; width: 230px; background: white; border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); z-index: 100; padding: 8px;">
            <div style="padding: 8px 12px; border-bottom: 1px solid var(--border); margin-bottom: 6px;">
              <div style="font-weight: 700; font-size: 0.9rem;">${this.currentUser.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${this.currentUser.email}</div>
              <span class="badge" style="margin-top: 5px; font-size: 0.75rem; padding: 2px 8px; border-radius: 9999px; font-weight: 600; display: inline-block; ${roleBadgeStyle}">
                ${roleLabel}
              </span>
            </div>
            ${portalButtonHtml}
            <button class="btn btn-sm btn-outline" style="width: 100%; justify-content: flex-start; margin-bottom: 4px;" onclick="window.Router.navigate('saved'); Auth.toggleUserDropdown(false);">
              🔖 Saved Collection
            </button>
            <button class="btn btn-sm btn-outline" style="width: 100%; justify-content: flex-start; margin-bottom: 4px;" onclick="Auth.showProfileModal(); Auth.toggleUserDropdown(false);">
              👤 My Profile
            </button>
            <button class="btn btn-sm btn-danger" style="width: 100%; justify-content: flex-start;" onclick="Auth.logout(); Auth.toggleUserDropdown(false);">
              🚪 Log Out
            </button>
          </div>
        </div>
      `;

      document.getElementById('user-dropdown-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleUserDropdown();
      });
      document.addEventListener('click', () => this.toggleUserDropdown(false));
    } else {
      authBtnContainer.innerHTML = `
        <button class="btn btn-primary btn-sm" id="open-login-btn" onclick="Auth.openAuthModal('login')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          Sign In
        </button>
      `;
    }
  },

  toggleUserDropdown(forceState) {
    const menu = document.getElementById('user-dropdown-menu');
    if (menu) {
      if (typeof forceState === 'boolean') {
        menu.style.display = forceState ? 'block' : 'none';
      } else {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      }
    }
  },

  openAuthModal(initialTab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.add('open');
    this.switchAuthTab(initialTab);
  },

  closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('open');
  },

  switchAuthTab(tab) {
    const loginTabBtn = document.getElementById('auth-tab-login');
    const signupTabBtn = document.getElementById('auth-tab-signup');
    const loginForm = document.getElementById('login-form-wrap');
    const signupForm = document.getElementById('signup-form-wrap');

    if (tab === 'login') {
      loginTabBtn?.classList.add('active');
      signupTabBtn?.classList.remove('active');
      if (loginForm) loginForm.style.display = 'block';
      if (signupForm) signupForm.style.display = 'none';
    } else {
      signupTabBtn?.classList.add('active');
      loginTabBtn?.classList.remove('active');
      if (signupForm) signupForm.style.display = 'block';
      if (loginForm) loginForm.style.display = 'none';
    }
  },

  showProfileModal() {
    if (!this.currentUser) return;
    const modal = document.getElementById('profile-modal');
    const body = document.getElementById('profile-modal-body');
    if (!modal || !body) return;

    const role = String(this.currentUser.role || '').toLowerCase();
    let roleFormatted = 'Local Explorer';
    let roleBadgeColor = 'background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE;';
    if (role === 'guide') {
      roleFormatted = 'Local Contributor';
      roleBadgeColor = 'background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A;';
    } else if (role === 'business' || role === 'business_owner') {
      roleFormatted = 'Verified Business Owner';
      roleBadgeColor = 'background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0;';
    }

    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="${this.currentUser.avatar}" alt="${this.currentUser.name}" style="width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 12px; object-fit: cover; border: 3px solid var(--primary-light);">
        <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--text-main);">${this.currentUser.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">${this.currentUser.email} • ${this.currentUser.city}</p>
        <div style="margin-top: 8px;">
          <span class="badge" style="font-size: 0.85rem; padding: 4px 12px; font-weight: 700; border-radius: 9999px; ${roleBadgeColor}">Role: ${roleFormatted}</span>
          ${this.currentUser.business_name ? `<span class="badge badge-verified" style="margin-left: 6px;">${this.currentUser.business_name}</span>` : ''}
        </div>
      </div>
      <div style="background: var(--bg-subtle); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
        <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 6px;">Bio / About:</h4>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.6;">${this.currentUser.bio || 'Active local member contributing reviews and tips on TruSpot.'}</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center;">
        <div style="background: white; border: 1px solid var(--border); padding: 12px; border-radius: var(--radius-md);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">${this.currentUser.stats?.reviews_count || 0}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Reviews Written</div>
        </div>
        <div style="background: white; border: 1px solid var(--border); padding: 12px; border-radius: var(--radius-md);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--secondary);">${this.currentUser.stats?.guides_count || 0}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Curated Guides</div>
        </div>
        <div style="background: white; border: 1px solid var(--border); padding: 12px; border-radius: var(--radius-md);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-amber);">${this.currentUser.stats?.answers_count || 0}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Questions Answered</div>
        </div>
      </div>
    `;
    modal.classList.add('open');
  },

  setupEventListeners() {
    // Auth Modal Tabs
    document.getElementById('auth-tab-login')?.addEventListener('click', () => this.switchAuthTab('login'));
    document.getElementById('auth-tab-signup')?.addEventListener('click', () => this.switchAuthTab('signup'));

    // Modal Close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = btn.getAttribute('data-close-modal');
        document.getElementById(modalId)?.classList.remove('open');
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    });

    // Login Form Submit (Standard Portal)
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const remember = document.getElementById('login-remember')?.checked ?? true;
      await this.login(email, password, remember);
    });

    // Dedicated Merchant Login Form
    document.getElementById('merchant-login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('merchant-login-email').value.trim();
      const password = document.getElementById('merchant-login-password').value;
      const remember = document.getElementById('merchant-login-remember')?.checked ?? true;
      await this.businessLogin(email, password, remember);
    });

    // Password strength meter
    const passwordInput = document.getElementById('signup-password');
    const strengthBar = document.getElementById('password-strength-fill');
    if (passwordInput && strengthBar) {
      passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        let score = 0;
        if (val.length >= 6) score += 33;
        if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score += 34;
        if (/[^A-Za-z0-9]/.test(val) && val.length >= 8) score += 33;

        strengthBar.style.width = `${score}%`;
        if (score <= 33) strengthBar.style.backgroundColor = '#EF4444';
        else if (score <= 67) strengthBar.style.backgroundColor = '#F59E0B';
        else strengthBar.style.backgroundColor = '#10B981';
      });
    }

    // Signup Form Submit (Restricted to Explorer or Contributor)
    document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const city = document.getElementById('signup-city').value;
      const role = document.querySelector('input[name="signup-role"]:checked')?.value || 'explorer';

      await this.register({ name, email, password, city, role: role === 'guide' ? 'guide' : 'explorer' });
    });
  }
};

window.Auth = Auth;

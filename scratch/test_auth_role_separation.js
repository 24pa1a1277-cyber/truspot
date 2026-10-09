// scratch/test_auth_role_separation.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlContent = fs.readFileSync(path.join(rootDir, 'frontend', 'index.html'), 'utf8');
const jsAuthContent = fs.readFileSync(path.join(rootDir, 'frontend', 'js', 'auth.js'), 'utf8');
const jsAppContent = fs.readFileSync(path.join(rootDir, 'frontend', 'js', 'app.js'), 'utf8');
const pyAuthContent = fs.readFileSync(path.join(rootDir, 'backend', 'routes', 'auth_routes.py'), 'utf8');
const pyBusContent = fs.readFileSync(path.join(rootDir, 'backend', 'routes', 'business_routes.py'), 'utf8');

let pass = 0;
let fail = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    pass++;
  } else {
    console.error(`[FAIL] ${message}`);
    fail++;
  }
}

console.log('================================================================');
console.log('TEST SUITE: FULL-STACK AUTH & DEDICATED MERCHANT ARCHITECTURE');
console.log('================================================================\n');

// 1. PUBLIC DEMO LOGIN CARD (ONLY 2 OPTIONS: EXPLORER & CONTRIBUTOR)
console.log('--- 1. Public Demo Role Selector ---');
assert(
  htmlContent.includes('explorer@demo.truspot.local') &&
  htmlContent.includes('guide@demo.truspot.local'),
  'Public demo selector includes Local Explorer and Local Contributor'
);

// Check that demo-chips-grid does NOT contain business@demo.truspot.local
const demoChipsBlock = htmlContent.substring(
  htmlContent.indexOf('demo-chips-grid'),
  htmlContent.indexOf('auth-tabs')
);
assert(
  !demoChipsBlock.includes('business@demo.truspot.local'),
  'Public demo selector card has NO Business Owner button or email pill'
);
assert(
  !demoChipsBlock.includes('🏢 Business Owner'),
  'Business Owner completely removed from public demo selection card'
);

// Check signup form has no business owner radio
const signupBlock = htmlContent.substring(
  htmlContent.indexOf('id="signup-form"'),
  htmlContent.indexOf('<!-- ========================================================================\n       VIEW:')
);
assert(
  !signupBlock.includes('value="business"'),
  'Public registration form has NO Business Owner radio option'
);

// 2. DESIGNATED DASHBOARD ROUTING
console.log('\n--- 2. Designated Dashboard Routing ---');
assert(
  jsAuthContent.includes("target: 'explore'") && jsAuthContent.includes("target: 'contributor-portal'"),
  'Quick demo login targets /explore for Explorer and /contributor-portal for Contributor'
);
assert(
  jsAuthContent.includes("window.Router?.navigate('contributor-portal')"),
  'Contributor authentication routes to /contributor-portal'
);
assert(
  jsAuthContent.includes("window.Router?.navigate('explore')"),
  'Explorer authentication routes to /explore'
);

// 3. DEDICATED BUSINESS OWNER LOGIN & MERCHANTS ENTRY POINT
console.log('\n--- 3. Dedicated Merchant Hub & Discreet Link ---');
assert(
  htmlContent.includes('Are you a verified merchant?') &&
  htmlContent.includes('Sign in to Business Hub') &&
  htmlContent.includes('/business/login'),
  'Discreet footer link "Are you a verified merchant? Sign in to Business Hub" (/business/login) exists'
);

assert(
  htmlContent.includes('id="view-business-login"') &&
  htmlContent.includes('TruSpot Business Hub'),
  'Dedicated view-business-login exists with merchant branding'
);

assert(
  pyAuthContent.includes("@auth_bp.route('/business/login', methods=['POST'])"),
  'Backend auth blueprint provides dedicated /business/login endpoint'
);

assert(
  pyAuthContent.includes("if user_role not in ['business', 'business_owner']:") &&
  pyAuthContent.includes("User does not hold verified Business Owner privileges"),
  'Backend /business/login strictly validates Business Owner privileges'
);

// 4. ROUTE GUARDS & ACCESS RESTRICTIONS
console.log('\n--- 4. Protected Route Guards & Redirects ---');
assert(
  jsAppContent.includes('checkRouteAccess') &&
  jsAppContent.includes("Access restricted to verified business owners"),
  'Router implements checkRouteAccess with unauthorized notification'
);

assert(
  jsAppContent.includes("this.activeView = 'explore'") || jsAppContent.includes("navigate('explore')"),
  'Non-business owners navigating to business routes are immediately redirected to /explore'
);

assert(
  pyBusContent.includes('require_business_owner') &&
  pyBusContent.includes("Access restricted to verified business owners"),
  'Backend business routes protected by require_business_owner decorator'
);

// 5. USER PROFILE DROPDOWN ROLE ISOLATION
console.log('\n--- 5. User Profile Dropdown Display ---');
assert(
  jsAuthContent.includes("roleLabel = 'Local Explorer'") &&
  jsAuthContent.includes("roleLabel = 'Local Contributor'") &&
  jsAuthContent.includes("roleLabel = 'Verified Business Owner'"),
  'User profile dropdown dynamically displays appropriate role labels'
);

assert(
  htmlContent.includes('id="view-contributor-portal"') &&
  jsAppContent.includes('loadContributorPortal'),
  'Dedicated Local Contributor Portal view and workspace handler implemented'
);

console.log('\n================================================================');
console.log(`TOTAL TESTS: ${pass + fail} | PASSED: ${pass} | FAILED: ${fail}`);
console.log('================================================================');

if (fail > 0) {
  process.exit(1);
}

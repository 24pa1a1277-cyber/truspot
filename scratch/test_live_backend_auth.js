// scratch/test_live_backend_auth.js
const http = require('http');

function post(path, body, cookie = null) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    };
    if (cookie) headers['Cookie'] = cookie;

    const req = http.request({
      hostname: '127.0.0.1',
      port: 8000,
      path,
      method: 'POST',
      headers
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(raw); } catch (e) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: json,
          raw
        });
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(path, cookie = null) {
  return new Promise((resolve, reject) => {
    const headers = {};
    if (cookie) headers['Cookie'] = cookie;

    const req = http.request({
      hostname: '127.0.0.1',
      port: 8000,
      path,
      method: 'GET',
      headers
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(raw); } catch (e) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: json,
          raw
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('--- TESTING LIVE BACKEND AUTH & GUARDS (http://127.0.0.1:8000) ---');

  // Test 1: Explorer standard login
  const expRes = await post('/api/auth/login', { email: 'explorer@demo.truspot.local', password: 'demo123' });
  console.log('1. Explorer login:', expRes.statusCode === 200 && expRes.data.user.role === 'explorer' ? 'PASS' : 'FAIL');
  const expCookie = expRes.headers['set-cookie'] ? expRes.headers['set-cookie'][0] : null;

  // Test 2: Guide standard login
  const guideRes = await post('/api/auth/login', { email: 'guide@demo.truspot.local', password: 'demo123' });
  console.log('2. Guide login:', guideRes.statusCode === 200 && guideRes.data.user.role === 'guide' ? 'PASS' : 'FAIL');

  // Test 3: Dedicated Merchant login with merchant credentials
  const bizRes = await post('/api/auth/business/login', { email: 'business@demo.truspot.local', password: 'demo123' });
  console.log('3. Merchant login (/api/auth/business/login):', bizRes.statusCode === 200 && bizRes.data.user.role === 'business' ? 'PASS' : 'FAIL');
  const bizCookie = bizRes.headers['set-cookie'] ? bizRes.headers['set-cookie'][0] : null;

  // Test 4: Dedicated Merchant login with explorer credentials (MUST BE DENIED 403)
  const deniedBizRes = await post('/api/auth/business/login', { email: 'explorer@demo.truspot.local', password: 'demo123' });
  console.log('4. Explorer denied at /business/login:', deniedBizRes.statusCode === 403 ? 'PASS (403 Forbidden)' : `FAIL (${deniedBizRes.statusCode})`);

  // Test 5: /api/business/dashboard unauthenticated (MUST BE 401)
  const noAuthDash = await get('/api/business/dashboard');
  console.log('5. Unauthenticated /api/business/dashboard:', noAuthDash.statusCode === 401 ? 'PASS (401)' : `FAIL (${noAuthDash.statusCode})`);

  // Test 6: /api/business/dashboard with Explorer session (MUST BE DENIED 403)
  const expDash = await get('/api/business/dashboard', expCookie);
  console.log('6. Explorer denied /api/business/dashboard:', expDash.statusCode === 403 ? 'PASS (403 Forbidden)' : `FAIL (${expDash.statusCode})`);

  // Test 7: /api/business/dashboard with Merchant session (MUST BE 200)
  const bizDash = await get('/api/business/dashboard', bizCookie);
  console.log('7. Merchant allowed /api/business/dashboard:', bizDash.statusCode === 200 ? 'PASS (200 OK)' : `FAIL (${bizDash.statusCode})`);

  // Test 8: /api/business/analytics with Merchant session (MUST BE 200)
  const bizAnalytics = await get('/api/business/analytics', bizCookie);
  console.log('8. Merchant allowed /api/business/analytics:', bizAnalytics.statusCode === 200 ? 'PASS (200 OK)' : `FAIL (${bizAnalytics.statusCode})`);
}

run().catch(console.error);

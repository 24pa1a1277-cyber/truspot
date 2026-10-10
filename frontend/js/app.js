const API_BASE = 'https://truspot-backend.onrender.com';
// ==========================================================================
// DYNAMIC SECTOR & SUBCATEGORY COVER IMAGE ASSET MAPPING (ALL 7 SECTORS)
// High-resolution curated visual covers matching exact sector and subcategory
// ==========================================================================
const SECTOR_COVER_IMAGES = {
  // 1. FOOD & DINING
  'food-dining': {
    default: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
    restaurants: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
    cafes: 'https://images.unsplash.com/photo-1506372023823-741c83b836fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNhZmV8ZW58MHx8MHx8fDA%3D',
    vegetarian: 'https://media.istockphoto.com/id/1203754557/photo/south-indian-thali.webp?a=1&b=1&s=612x612&w=0&k=20&c=0jZlmArutQcteSFYF4Ee4jacdepVgWe5ntRLrJh9OJk=',
    'traditional-thali': 'https://media.istockphoto.com/id/1203754557/photo/south-indian-thali.webp?a=1&b=1&s=612x612&w=0&k=20&c=0jZlmArutQcteSFYF4Ee4jacdepVgWe5ntRLrJh9OJk=',
    bakeries: 'https://plus.unsplash.com/premium_photo-1715968916859-f46905010567?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    'fast-food': 'https://plus.unsplash.com/premium_photo-1695758787833-ec3e6817046f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'street-food': 'https://media.istockphoto.com/id/1248675157/photo/chaat.webp?a=1&b=1&s=612x612&w=0&k=20&c=zHmNbJfE4j_1K8e103edsNpQ8-X-7ei3XkG-dA4_K7M=',
    vegan: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWR8ZW58MHx8MHx8fDA%3D',
    desserts: 'https://images.unsplash.com/photo-1654874119729-5665c3b281da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    'ice-cream': 'https://images.unsplash.com/photo-1597249536924-b226b1a1259d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww',
    'family-dining': 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
    'fine-dining': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'food-delivery': 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
    // Comprehensive Aliases & Subcategory Variants matching exact specifications
    restaurant: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
    'general-multicuisine-dining': 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
    'multicuisine-dining': 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
    multicuisine: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
    cafe: 'https://images.unsplash.com/photo-1506372023823-741c83b836fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNhZmV8ZW58MHx8MHx8fDA%3D',
    'coffee-artisan-brews': 'https://images.unsplash.com/photo-1506372023823-741c83b836fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNhZmV8ZW58MHx8MHx8fDA%3D',
    coffee: 'https://images.unsplash.com/photo-1506372023823-741c83b836fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNhZmV8ZW58MHx8MHx8fDA%3D',
    thali: 'https://media.istockphoto.com/id/1203754557/photo/south-indian-thali.webp?a=1&b=1&s=612x612&w=0&k=20&c=0jZlmArutQcteSFYF4Ee4jacdepVgWe5ntRLrJh9OJk=',
    'vegetarian-traditional-thali': 'https://media.istockphoto.com/id/1203754557/photo/south-indian-thali.webp?a=1&b=1&s=612x612&w=0&k=20&c=0jZlmArutQcteSFYF4Ee4jacdepVgWe5ntRLrJh9OJk=',
    'traditional-thali-vegetarian': 'https://media.istockphoto.com/id/1203754557/photo/south-indian-thali.webp?a=1&b=1&s=612x612&w=0&k=20&c=0jZlmArutQcteSFYF4Ee4jacdepVgWe5ntRLrJh9OJk=',
    'south-indian-meals': 'https://media.istockphoto.com/id/1203754557/photo/south-indian-thali.webp?a=1&b=1&s=612x612&w=0&k=20&c=0jZlmArutQcteSFYF4Ee4jacdepVgWe5ntRLrJh9OJk=',
    'south-indian-thali': 'https://media.istockphoto.com/id/1203754557/photo/south-indian-thali.webp?a=1&b=1&s=612x612&w=0&k=20&c=0jZlmArutQcteSFYF4Ee4jacdepVgWe5ntRLrJh9OJk=',
    bakery: 'https://plus.unsplash.com/premium_photo-1715968916859-f46905010567?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    'artisan-breads-pastries': 'https://plus.unsplash.com/premium_photo-1715968916859-f46905010567?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    fastfood: 'https://plus.unsplash.com/premium_photo-1695758787833-ec3e6817046f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'burgers-quick-bites': 'https://plus.unsplash.com/premium_photo-1695758787833-ec3e6817046f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    burgers: 'https://plus.unsplash.com/premium_photo-1695758787833-ec3e6817046f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    chaat: 'https://media.istockphoto.com/id/1248675157/photo/chaat.webp?a=1&b=1&s=612x612&w=0&k=20&c=zHmNbJfE4j_1K8e103edsNpQ8-X-7ei3XkG-dA4_K7M=',
    'chaat-evening-tiffins': 'https://media.istockphoto.com/id/1248675157/photo/chaat.webp?a=1&b=1&s=612x612&w=0&k=20&c=zHmNbJfE4j_1K8e103edsNpQ8-X-7ei3XkG-dA4_K7M=',
    'evening-tiffins': 'https://media.istockphoto.com/id/1248675157/photo/chaat.webp?a=1&b=1&s=612x612&w=0&k=20&c=zHmNbJfE4j_1K8e103edsNpQ8-X-7ei3XkG-dA4_K7M=',
    'plant-based': 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWR8ZW58MHx8MHx8fDA%3D',
    'plant-based-dining': 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWR8ZW58MHx8MHx8fDA%3D',
    dessert: 'https://images.unsplash.com/photo-1654874119729-5665c3b281da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    'patisserie-sweets': 'https://images.unsplash.com/photo-1654874119729-5665c3b281da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    patisserie: 'https://images.unsplash.com/photo-1654874119729-5665c3b281da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    sweets: 'https://images.unsplash.com/photo-1654874119729-5665c3b281da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    icecream: 'https://images.unsplash.com/photo-1597249536924-b226b1a1259d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww',
    'gelato-sundaes': 'https://images.unsplash.com/photo-1597249536924-b226b1a1259d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww',
    gelato: 'https://images.unsplash.com/photo-1597249536924-b226b1a1259d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww',
    sundaes: 'https://images.unsplash.com/photo-1597249536924-b226b1a1259d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww',
    'casual-group-seating': 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
    'luxury-ambiance': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'cloud-kitchen': 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
    'cloud-kitchen-takeout': 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
    takeout: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80'
  },

  // 2. TRAVEL & STAY
  'travel-stay': {
    default: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    hotels: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    resorts: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    lodges: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    homestays: 'https://plus.unsplash.com/premium_photo-1683649964203-baf13fa852e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWVzdGF5fGVufDB8fDB8fHww',
    'tourist-places': 'https://plus.unsplash.com/premium_photo-1664472706956-42f42184f7a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHRvdXJpc3QlMjBwbGFjZXxlbnwwfHwwfHx8MA%3D%3D',
    attractions: 'https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXR0cmFjdGlvbnMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D',
    parks: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    temples: 'https://media.istockphoto.com/id/516984446/photo/varanasi-burning-grounds-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=j4qpc4gkij7zVVuniYZiUu08pmCL3kfyWVtpHElNnqg=',
    museums: 'https://images.unsplash.com/photo-1534445291134-f70b7a81f691?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2V1bXN8ZW58MHx8MHx8fDA%3D',
    'weekend-getaways': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    'travel-agencies': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    // Aliases
    hotel: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    resort: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    lodge: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    homestay: 'https://plus.unsplash.com/premium_photo-1683649964203-baf13fa852e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWVzdGF5fGVufDB8fDB8fHww',
    attraction: 'https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXR0cmFjdGlvbnMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D',
    park: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    temple: 'https://media.istockphoto.com/id/516984446/photo/varanasi-burning-grounds-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=j4qpc4gkij7zVVuniYZiUu08pmCL3kfyWVtpHElNnqg=',
    museum: 'https://images.unsplash.com/photo-1534445291134-f70b7a81f691?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2V1bXN8ZW58MHx8MHx8fDA%3D'
  },

  // 3. HEALTHCARE
  'healthcare': {
    default: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    hospitals: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    clinics: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    dentists: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    pharmacies: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80',
    'diagnostic-centers': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    'eye-care': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    physiotherapy: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    'medical-specialists': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    // Aliases
    hospital: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    clinic: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    dentist: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    pharmacy: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80',
    'diagnostic-center': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    'specialists': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
  },

  // 4. SHOPPING
  'shopping': {
    default: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
    'shopping-malls': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    clothing: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    electronics: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    supermarkets: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    grocery: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    jewellery: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'local-markets': 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80',
    'book-stores': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    'gift-shops': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    // Aliases
    malls: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    supermarket: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    jewelry: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    'book-store': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    'gift-shop': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
  },

  // 5. EDUCATION
  'education': {
    default: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    schools: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    colleges: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    universities: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    'coaching-centers': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    'training-institutes': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    libraries: 'https://images.unsplash.com/photo-1507842229458-577630616806?auto=format&fit=crop&w=800&q=80',
    'skill-centers': 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80'
  },

  // 6. ESSENTIAL SERVICES
  'essential-services': {
    default: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    'police-stations': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    'fire-stations': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    'emergency-services': 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
    'government-offices': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    banks: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800&q=80',
    atms: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    'post-offices': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    'electricity-services': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    'water-services': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    'gas-services': 'https://images.unsplash.com/photo-1527018607147-3801267b25ea?auto=format&fit=crop&w=800&q=80',
    'repair-services': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  },

  // 7. TRANSPORT & AUTOMOTIVE
  'transport-automotive': {
    default: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    'petrol-pumps': 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80',
    'ev-charging': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    'car-service': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    'bike-service': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    'car-wash': 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
    'tyre-shops': 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
    'car-dealers': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    'bike-dealers': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    'driving-schools': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    'rental-services': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    parking: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80'
  }
};

const App = {
  cities: [],
  categories: [],
  currentPlaces: [],
  currentViewMode: 'split', // 'split', 'grid', 'map'
  currentActivePlace: null,

  // --------------------------------------------------------------------------
  // DYNAMIC IMAGE RESOLUTION SYSTEM (3-TIER HIERARCHY)
  // --------------------------------------------------------------------------
  normalizeSectorSlug(val) {
    if (!val) return 'food-dining';
    const s = String(val).toLowerCase();
    if (s.includes('food') || s.includes('dining') || s.includes('restaurant') || s.includes('cafe')) return 'food-dining';
    if (s.includes('travel') || s.includes('stay') || s.includes('hotel') || s.includes('resort') || s.includes('tourism')) return 'travel-stay';
    if (s.includes('health') || s.includes('hospital') || s.includes('clinic') || s.includes('medical') || s.includes('pharmacy')) return 'healthcare';
    if (s.includes('shop') || s.includes('mall') || s.includes('retail') || s.includes('market')) return 'shopping';
    if (s.includes('educat') || s.includes('school') || s.includes('college') || s.includes('univers') || s.includes('learn')) return 'education';
    if (s.includes('essential') || s.includes('civic') || s.includes('police') || s.includes('emergency') || s.includes('govt')) return 'essential-services';
    if (s.includes('transport') || s.includes('auto') || s.includes('car') || s.includes('vehicle') || s.includes('petrol') || s.includes('ev')) return 'transport-automotive';
    return s.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  },

  getSectorFallbackImage(spot) {
    const sectorSlug = this.normalizeSectorSlug(spot?.sector || spot?.category_slug || spot?.category_name || spot?.category);
    const subcatRaw = String(spot?.subcategory_slug || spot?.subcategory_name || spot?.subcategory || '').toLowerCase();
    const subcatSlug = subcatRaw.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const sectorTable = SECTOR_COVER_IMAGES[sectorSlug] || SECTOR_COVER_IMAGES['food-dining'];
    
    // Priority 2a: Direct subcategory slug match
    if (subcatSlug && sectorTable[subcatSlug]) {
      return sectorTable[subcatSlug];
    }

    // Priority 2b: Match subcategory keyword using the mapped dictionary
    const combinedSearchText = `${subcatRaw} ${String(spot?.name || '').toLowerCase()} ${String(spot?.description || '').toLowerCase()}`;
    
    // Check specific sector keyword patterns
    if (sectorSlug === 'food-dining') {
      if (combinedSearchText.includes('thali') || (combinedSearchText.includes('veg') && !combinedSearchText.includes('non-veg'))) return sectorTable['vegetarian'];
      if (combinedSearchText.includes('vegan')) return sectorTable['vegan'];
      if (combinedSearchText.includes('dessert') || combinedSearchText.includes('pastry') || combinedSearchText.includes('cake')) return sectorTable['desserts'];
      if (combinedSearchText.includes('ice cream') || combinedSearchText.includes('gelato')) return sectorTable['ice-cream'];
      if (combinedSearchText.includes('street') || combinedSearchText.includes('chaat') || combinedSearchText.includes('tiffin')) return sectorTable['street-food'];
      if (combinedSearchText.includes('fast food') || combinedSearchText.includes('burger') || combinedSearchText.includes('pizza')) return sectorTable['fast-food'];
      if (combinedSearchText.includes('bakery') || combinedSearchText.includes('croissant') || combinedSearchText.includes('bread')) return sectorTable['bakeries'];
      if (combinedSearchText.includes('cafe') || combinedSearchText.includes('coffee')) return sectorTable['cafes'];
      if (combinedSearchText.includes('fine dining') || combinedSearchText.includes('gourmet')) return sectorTable['fine-dining'];
      if (combinedSearchText.includes('family')) return sectorTable['family-dining'];
      if (combinedSearchText.includes('delivery') || combinedSearchText.includes('cloud kitchen')) return sectorTable['food-delivery'];
      if (combinedSearchText.includes('restaurant') || combinedSearchText.includes('diner')) return sectorTable['restaurants'];
    } else if (sectorSlug === 'travel-stay') {
      if (combinedSearchText.includes('resort') || combinedSearchText.includes('spa')) return sectorTable['resorts'];
      if (combinedSearchText.includes('lodge') || combinedSearchText.includes('guest house')) return sectorTable['lodges'];
      if (combinedSearchText.includes('homestay') || combinedSearchText.includes('villa')) return sectorTable['homestays'];
      if (combinedSearchText.includes('temple') || combinedSearchText.includes('shrine') || combinedSearchText.includes('gopuram')) return sectorTable['temples'];
      if (combinedSearchText.includes('museum') || combinedSearchText.includes('gallery') || combinedSearchText.includes('heritage')) return sectorTable['museums'];
      if (combinedSearchText.includes('park') || combinedSearchText.includes('garden')) return sectorTable['parks'];
      if (combinedSearchText.includes('tourist') || combinedSearchText.includes('fort') || combinedSearchText.includes('palace')) return sectorTable['tourist-places'];
      if (combinedSearchText.includes('attraction') || combinedSearchText.includes('riverfront') || combinedSearchText.includes('bridge')) return sectorTable['attractions'];
      if (combinedSearchText.includes('getaway') || combinedSearchText.includes('hill') || combinedSearchText.includes('nature')) return sectorTable['weekend-getaways'];
      if (combinedSearchText.includes('agency') || combinedSearchText.includes('tour') || combinedSearchText.includes('travels')) return sectorTable['travel-agencies'];
      if (combinedSearchText.includes('hotel') || combinedSearchText.includes('inn') || combinedSearchText.includes('stay')) return sectorTable['hotels'];
    } else if (sectorSlug === 'healthcare') {
      if (combinedSearchText.includes('dent') || combinedSearchText.includes('tooth')) return sectorTable['dentists'];
      if (combinedSearchText.includes('pharmacy') || combinedSearchText.includes('drug') || combinedSearchText.includes('chemist') || combinedSearchText.includes('meds')) return sectorTable['pharmacies'];
      if (combinedSearchText.includes('diagnostic') || combinedSearchText.includes('lab') || combinedSearchText.includes('pathology') || combinedSearchText.includes('mri')) return sectorTable['diagnostic-centers'];
      if (combinedSearchText.includes('eye') || combinedSearchText.includes('optom') || combinedSearchText.includes('vision') || combinedSearchText.includes('lens')) return sectorTable['eye-care'];
      if (combinedSearchText.includes('physio') || combinedSearchText.includes('rehab')) return sectorTable['physiotherapy'];
      if (combinedSearchText.includes('clinic') || combinedSearchText.includes('consult')) return sectorTable['clinics'];
      if (combinedSearchText.includes('specialist') || combinedSearchText.includes('cardio') || combinedSearchText.includes('neuro') || combinedSearchText.includes('onco')) return sectorTable['medical-specialists'];
      if (combinedSearchText.includes('hospital')) return sectorTable['hospitals'];
    } else if (sectorSlug === 'shopping') {
      if (combinedSearchText.includes('mall') || combinedSearchText.includes('forum') || combinedSearchText.includes('phoenix') || combinedSearchText.includes('nexus')) return sectorTable['shopping-malls'];
      if (combinedSearchText.includes('cloth') || combinedSearchText.includes('apparel') || combinedSearchText.includes('fashion') || combinedSearchText.includes('saree') || combinedSearchText.includes('silk')) return sectorTable['clothing'];
      if (combinedSearchText.includes('electronic') || combinedSearchText.includes('gadget') || combinedSearchText.includes('mobile') || combinedSearchText.includes('croma')) return sectorTable['electronics'];
      if (combinedSearchText.includes('supermarket') || combinedSearchText.includes('hypermarket') || combinedSearchText.includes('dmart') || combinedSearchText.includes('more')) return sectorTable['supermarkets'];
      if (combinedSearchText.includes('grocery') || combinedSearchText.includes('provision') || combinedSearchText.includes('vegetable')) return sectorTable['grocery'];
      if (combinedSearchText.includes('jewel') || combinedSearchText.includes('gold') || combinedSearchText.includes('diamond')) return sectorTable['jewellery'];
      if (combinedSearchText.includes('furniture') || combinedSearchText.includes('sofa') || combinedSearchText.includes('decor')) return sectorTable['furniture'];
      if (combinedSearchText.includes('book') || combinedSearchText.includes('stationery')) return sectorTable['book-stores'];
      if (combinedSearchText.includes('gift') || combinedSearchText.includes('souvenir') || combinedSearchText.includes('novelty')) return sectorTable['gift-shops'];
      if (combinedSearchText.includes('market') || combinedSearchText.includes('bazaar') || combinedSearchText.includes('mandi')) return sectorTable['local-markets'];
    } else if (sectorSlug === 'education') {
      if (combinedSearchText.includes('school') || combinedSearchText.includes('vidyalaya') || combinedSearchText.includes('public school')) return sectorTable['schools'];
      if (combinedSearchText.includes('university') || combinedSearchText.includes('deemed') || combinedSearchText.includes('campus')) return sectorTable['universities'];
      if (combinedSearchText.includes('college') || combinedSearchText.includes('degree') || combinedSearchText.includes('engineering')) return sectorTable['colleges'];
      if (combinedSearchText.includes('coaching') || combinedSearchText.includes('academy') || combinedSearchText.includes('tuition') || combinedSearchText.includes('allen') || combinedSearchText.includes('aakash')) return sectorTable['coaching-centers'];
      if (combinedSearchText.includes('training') || combinedSearchText.includes('tech') || combinedSearchText.includes('computer') || combinedSearchText.includes('software')) return sectorTable['training-institutes'];
      if (combinedSearchText.includes('library') || combinedSearchText.includes('reading room') || combinedSearchText.includes('archive')) return sectorTable['libraries'];
      if (combinedSearchText.includes('skill') || combinedSearchText.includes('vocational') || combinedSearchText.includes('workshop')) return sectorTable['skill-centers'];
    } else if (sectorSlug === 'essential-services') {
      if (combinedSearchText.includes('police') || combinedSearchText.includes('thana') || combinedSearchText.includes('chowki')) return sectorTable['police-stations'];
      if (combinedSearchText.includes('fire') || combinedSearchText.includes('rescue')) return sectorTable['fire-stations'];
      if (combinedSearchText.includes('emergency') || combinedSearchText.includes('ambulance') || combinedSearchText.includes('disaster')) return sectorTable['emergency-services'];
      if (combinedSearchText.includes('bank') || combinedSearchText.includes('sbi') || combinedSearchText.includes('hdfc') || combinedSearchText.includes('icici')) return sectorTable['banks'];
      if (combinedSearchText.includes('atm')) return sectorTable['atms'];
      if (combinedSearchText.includes('post') || combinedSearchText.includes('dak')) return sectorTable['post-offices'];
      if (combinedSearchText.includes('electric') || combinedSearchText.includes('power') || combinedSearchText.includes('bescom')) return sectorTable['electricity-services'];
      if (combinedSearchText.includes('water') || combinedSearchText.includes('bwssb') || combinedSearchText.includes('jal')) return sectorTable['water-services'];
      if (combinedSearchText.includes('gas') || combinedSearchText.includes('indane') || combinedSearchText.includes('hp gas') || combinedSearchText.includes('bharat gas')) return sectorTable['gas-services'];
      if (combinedSearchText.includes('repair') || combinedSearchText.includes('appliance')) return sectorTable['repair-services'];
      if (combinedSearchText.includes('govt') || combinedSearchText.includes('government') || combinedSearchText.includes('secretariat') || combinedSearchText.includes('municipal') || combinedSearchText.includes('bbmp')) return sectorTable['government-offices'];
    } else if (sectorSlug === 'transport-automotive') {
      if (combinedSearchText.includes('petrol') || combinedSearchText.includes('fuel') || combinedSearchText.includes('diesel') || combinedSearchText.includes('iocl') || combinedSearchText.includes('bpcl') || combinedSearchText.includes('hpcl') || combinedSearchText.includes('shell')) return sectorTable['petrol-pumps'];
      if (combinedSearchText.includes('ev') || combinedSearchText.includes('charge') || combinedSearchText.includes('charging') || combinedSearchText.includes('ather') || combinedSearchText.includes('tata power')) return sectorTable['ev-charging'];
      if (combinedSearchText.includes('car wash') || combinedSearchText.includes('detailing') || combinedSearchText.includes('wash')) return sectorTable['car-wash'];
      if (combinedSearchText.includes('tyre') || combinedSearchText.includes('tire') || combinedSearchText.includes('mrf') || combinedSearchText.includes('ceat')) return sectorTable['tyre-shops'];
      if (combinedSearchText.includes('bike service') || combinedSearchText.includes('two wheeler service')) return sectorTable['bike-service'];
      if (combinedSearchText.includes('car service') || combinedSearchText.includes('garage') || combinedSearchText.includes('auto repair') || combinedSearchText.includes('service centre')) return sectorTable['car-service'];
      if (combinedSearchText.includes('car dealer') || combinedSearchText.includes('showroom') || combinedSearchText.includes('motors') || combinedSearchText.includes('dealership')) return sectorTable['car-dealers'];
      if (combinedSearchText.includes('bike dealer') || combinedSearchText.includes('honda') || combinedSearchText.includes('yamaha') || combinedSearchText.includes('royal enfield')) return sectorTable['bike-dealers'];
      if (combinedSearchText.includes('driving') || combinedSearchText.includes('motor training')) return sectorTable['driving-schools'];
      if (combinedSearchText.includes('rental') || combinedSearchText.includes('self drive') || combinedSearchText.includes('zoomcar')) return sectorTable['rental-services'];
      if (combinedSearchText.includes('parking')) return sectorTable['parking'];
    }

    // Priority 3: Fall back to sector default high-res Unsplash CDN image
    return sectorTable.default || 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D';
  },

  resolveSpotCoverImage(spot) {
    if (!spot) {
      return SECTOR_COVER_IMAGES['food-dining'].default;
    }

    // Priority 1: Venue-specific spot.imageUrl / spot.cover_image if defined
    const venueSpecific = spot?.imageUrl || spot?.cover_image;
    if (venueSpecific && typeof venueSpecific === 'string' && venueSpecific.trim() !== '') {
      return venueSpecific.trim();
    }

    const sectorSlug = this.normalizeSectorSlug(spot?.sector || spot?.category_slug || spot?.category_name || spot?.category);
    const isFoodDining = sectorSlug === 'food-dining';
    const sectorTable = SECTOR_COVER_IMAGES[sectorSlug] || SECTOR_COVER_IMAGES['food-dining'];

    // Priority 2: Subcategory mapping from the directory
    const subcatRaw = String(spot?.subcategory_slug || spot?.subcategory_name || spot?.subcategory || '').toLowerCase().trim();
    const subcatSlug = subcatRaw.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // 2a. Direct subcategory slug / raw key match
    if (subcatSlug && sectorTable[subcatSlug]) {
      return sectorTable[subcatSlug];
    }
    if (subcatRaw && sectorTable[subcatRaw]) {
      return sectorTable[subcatRaw];
    }

    // 2b. Match subcategory keyword using mapped dictionary
    const keywordMatch = this.getSectorFallbackImage(spot);
    if (keywordMatch && keywordMatch !== sectorTable.default) {
      return keywordMatch;
    }

    // For non-food sectors, if spot has a custom image_url that is not a bulk default seed, preserve it
    if (!isFoodDining && spot?.image_url && typeof spot.image_url === 'string' && spot.image_url.trim() !== '') {
      const isBulkDefault = spot.image_url.includes('517248135467') || 
                            spot.image_url.includes('566073771259') || 
                            spot.image_url.includes('586773860418') || 
                            spot.image_url.includes('567449303078') ||
                            spot.image_url.includes('567449303071') ||
                            spot.image_url.includes('519567241046');
      if (!isBulkDefault) {
        return spot.image_url.trim();
      }
    }

    // Priority 3: Default Restaurant Cover if unmapped (for food-dining) or sector default
    if (isFoodDining) {
      return SECTOR_COVER_IMAGES['food-dining'].default;
    }
    return sectorTable.default || SECTOR_COVER_IMAGES['food-dining'].default;
  },

  handleCardImageError(imgEl, sectorHint, subcatHint) {
    if (!imgEl) return;
    imgEl.onerror = null; // Prevent infinite error recursion
    // Fall back to subcategory cover image or default restaurant cover
    const fallback = App.getSectorFallbackImage({ sector: sectorHint, subcategory: subcatHint });
    imgEl.src = fallback || SECTOR_COVER_IMAGES['food-dining'].default;
  },

  async init() {
    this.setupToastSystem();
    await this.loadInitialMetadata();
    this.setupGlobalCitySelector();
    this.setupViewModeToggles();

    // Initialize submodules
    if (window.Auth) await window.Auth.init();
    if (window.Filters) window.Filters.init();
    if (window.SearchEngine) window.SearchEngine.init();
    if (window.TruMap) window.TruMap.init('leaflet-map');

    // Route setup
    window.Router.init();

    // Load initial data
    this.loadHomeShowcases();
    this.setupSectorCardCoverPreview();
  },

  setupSectorCardCoverPreview() {
    const sectorCards = document.querySelectorAll('.sector-cover-card');
    sectorCards.forEach(card => {
      const sectorSlug = card.getAttribute('data-sector');
      const img = card.querySelector('.sector-cover-media img');
      if (!img || !sectorSlug) return;

      const defaultCover = SECTOR_COVER_IMAGES[sectorSlug]?.default || img.src;

      const chips = card.querySelectorAll('.subcat-pill-chip');
      chips.forEach(chip => {
        const subSlug = chip.getAttribute('data-sub');
        chip.addEventListener('mouseenter', () => {
          const mappedImg = SECTOR_COVER_IMAGES[sectorSlug]?.[subSlug];
          if (mappedImg && img.src !== mappedImg) {
            img.style.transition = 'opacity 0.2s ease, transform 0.3s ease';
            img.style.opacity = '0.8';
            setTimeout(() => {
              img.src = mappedImg;
              img.style.opacity = '1';
            }, 60);
          }
        });
      });

      card.addEventListener('mouseleave', () => {
        if (img.src !== defaultCover) {
          img.src = defaultCover;
        }
      });
    });
  },

  setupToastSystem() {
    window.showToast = (message, type = 'info') => {
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      
      const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
      };

      toast.innerHTML = `
        <span style="font-weight: 800; font-size: 1.1rem;">${icons[type] || '•'}</span>
        <div style="flex: 1;">${message}</div>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    };
  },

  async loadInitialMetadata() {
    try {
      const [citiesRes, catsRes] = await Promise.all([
        fetch('/api/cities'),
        fetch('/api/categories')
      ]);

      if (citiesRes.ok) this.cities = await citiesRes.json();
      if (catsRes.ok) this.categories = await catsRes.json();

      this.populateCitySelects();
      this.populateCategorySelects();
      this.renderCategoryShortcutsBar();
    } catch (err) {
      console.warn('Metadata loading failed:', err);
    }
  },

  populateCitySelects() {
    const selects = [
      document.getElementById('global-city-select'),
      document.getElementById('hero-city-select'),
      document.getElementById('drawer-city-select'),
      document.getElementById('filter-city'),
      document.getElementById('signup-city'),
      document.getElementById('ask-city-select'),
      document.getElementById('education-city-select'),
      document.getElementById('essential-city-select'),
      document.getElementById('biz-place-city')
    ];

    const standardOptionsHtml = `
      <option value="All Cities">All Cities</option>
      ${this.cities.map(c => `<option value="${c.name}">${c.name}, ${c.state}</option>`).join('')}
    `;

    const compactOptionsHtml = `
      <option value="All Cities">All Cities</option>
      ${this.cities.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
    `;

    selects.forEach(sel => {
      if (sel) {
        sel.innerHTML = (sel.id === 'global-city-select') ? compactOptionsHtml : standardOptionsHtml;
        sel.value = 'All Cities';
      }
    });
  },

  populateCategorySelects() {
    const selects = [
      document.getElementById('filter-category'),
      document.getElementById('ask-category-select'),
      document.getElementById('biz-place-category')
    ];

    const optionsHtml = `
      <option value="all">All Categories</option>
      ${this.categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join('')}
    `;

    selects.forEach(sel => {
      if (sel) {
        sel.innerHTML = optionsHtml;
      }
    });
  },

  renderCategoryShortcutsBar() {
    const container = document.getElementById('categories-bar-list');
    if (!container) return;

    container.innerHTML = `
      <button class="cat-pill active" data-cat="all" onclick="App.selectCategoryShortcut('all')">
        <span class="cat-icon-circle">✨</span> All Discoveries
      </button>
      ${this.categories.map(c => `
        <button class="cat-pill" data-cat="${c.slug}" onclick="App.selectCategoryShortcut('${c.slug}')">
          <span class="cat-icon-circle">${this.getCategoryEmoji(c.slug)}</span> ${c.name}
        </button>
      `).join('')}
    `;
  },

  getCategoryEmoji(slug) {
    const emojis = {
      'food-dining': '🍽️',
      'travel-stay': '🏨',
      'healthcare': '🏥',
      'shopping': '🛍️',
      'education': '🎓',
      'essential-services': '🚨',
      'transport-automotive': '🚗'
    };
    return emojis[slug] || '📍';
  },

  selectCategoryShortcut(slug) {
    document.querySelectorAll('.cat-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-cat') === slug);
    });

    if (slug === 'education') {
      window.Router.navigate('education');
    } else if (slug === 'essential-services') {
      window.Router.navigate('essential');
    } else {
      window.Router.navigate('explore');
      window.Filters.setCategory(slug);
    }
  },

  setupGlobalCitySelector() {
    const globalCity = document.getElementById('global-city-select');
    if (globalCity) {
      globalCity.addEventListener('change', (e) => {
        const cityName = e.target.value;
        this.handleHeroCityChange(cityName);
      });
    }
  },

  // --------------------------------------------------------------------------
  // DIRECTORY COVER PAGE & SECTOR COVER CARDS CONTROLLER
  // --------------------------------------------------------------------------
  handleHeroCityChange(cityName) {
    // 1. Synchronize all select elements
    const selects = [
      document.getElementById('hero-city-select'),
      document.getElementById('drawer-city-select'),
      document.getElementById('global-city-select'),
      document.getElementById('filter-city'),
      document.getElementById('education-city-select'),
      document.getElementById('essential-city-select')
    ];
    selects.forEach(sel => {
      if (sel && sel.value !== cityName) sel.value = cityName;
    });

    // 2. Synchronize Quick Switch Pills
    document.querySelectorAll('.quick-city-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-city') === cityName);
    });

    // 3. Update Hero Subtitle & Badges
    const subtitle = document.getElementById('directory-hero-subtitle');
    const badgeText = document.getElementById('directory-badge-text');

    const sectorCounts = {
      'All Cities': { food: 350, travel: 275, health: 200, shop: 250, edu: 175, ess: 275, trans: 275, total: '1,750' },
      'Bengaluru': { food: 70, travel: 55, health: 40, shop: 50, edu: 35, ess: 55, trans: 55, total: '350' },
      'Hyderabad': { food: 70, travel: 55, health: 40, shop: 50, edu: 35, ess: 55, trans: 55, total: '350' },
      'Vijayawada': { food: 70, travel: 55, health: 40, shop: 50, edu: 35, ess: 55, trans: 55, total: '350' },
      'Rajahmundry': { food: 70, travel: 55, health: 40, shop: 50, edu: 35, ess: 55, trans: 55, total: '350' },
      'Tanuku': { food: 70, travel: 55, health: 40, shop: 50, edu: 35, ess: 55, trans: 55, total: '350' }
    };

    const counts = sectorCounts[cityName] || sectorCounts['All Cities'];

    if (cityName === 'All Cities') {
      if (subtitle) {
        subtitle.innerHTML = 'Your verified directory covering <strong>Bengaluru, Hyderabad, Vijayawada, Rajahmundry, and Tanuku</strong> with 100% physically audited spots.';
      }
      if (badgeText) {
        badgeText.textContent = 'Showing All Cities (1,750 Verified Spots)';
      }
    } else {
      const state = (cityName === 'Bengaluru') ? 'Karnataka' : (cityName === 'Hyderabad') ? 'Telangana' : 'Andhra Pradesh';
      if (subtitle) {
        subtitle.innerHTML = `Showing <strong>${counts.total} verified places</strong>, civic helplines, and community hotspots in <strong>${cityName} (${state})</strong>.`;
      }
      if (badgeText) {
        badgeText.textContent = `Showing ${cityName} (${counts.total} Verified Spots)`;
      }
    }

    // 4. Update Sector Count Badges
    const countMappings = [
      { id: 'sector-count-food-dining', count: counts.food },
      { id: 'sector-count-travel-stay', count: counts.travel },
      { id: 'sector-count-healthcare', count: counts.health },
      { id: 'sector-count-shopping', count: counts.shop },
      { id: 'sector-count-education', count: counts.edu },
      { id: 'sector-count-essential-services', count: counts.ess },
      { id: 'sector-count-transport-automotive', count: counts.trans }
    ];
    countMappings.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) el.textContent = `${item.count} Verified Spots`;
    });

    // 5. Update global filters & reload home showcases
    if (window.Filters) window.Filters.setCity(cityName);
    if (window.TruMap) window.TruMap.setCityCenter(cityName);
    this.loadHomeShowcases(cityName);
    window.showToast(`Displaying verified directory in ${cityName}`, 'info');
  },

  handleRealtimeSearchInput(rawQuery) {
    const query = (rawQuery || '').trim().toLowerCase();
    const tray = document.getElementById('realtime-search-tray');
    const allChips = document.querySelectorAll('.subcat-pill-chip');
    const allCards = document.querySelectorAll('.sector-cover-card');

    if (!query) {
      allChips.forEach(c => c.classList.remove('subcat-match-highlight'));
      allCards.forEach(c => {
        c.classList.remove('sector-card-dimmed');
        c.classList.remove('sector-card-highlighted');
      });
      if (tray) {
        tray.style.display = 'none';
        tray.innerHTML = '';
      }
      return;
    }

    let matchingChips = [];
    allChips.forEach(chip => {
      const text = chip.textContent.trim().toLowerCase();
      const sub = (chip.getAttribute('data-sub') || '').toLowerCase();
      const isMatch = text.includes(query) || sub.includes(query);
      chip.classList.toggle('subcat-match-highlight', isMatch);
      if (isMatch) {
        matchingChips.push({
          name: chip.textContent.trim(),
          category: chip.getAttribute('data-cat'),
          sub: chip.getAttribute('data-sub')
        });
      }
    });

    allCards.forEach(card => {
      const sector = card.getAttribute('data-sector') || '';
      const title = card.querySelector('.sector-card-title')?.textContent.toLowerCase() || '';
      const hasMatchingChip = card.querySelectorAll('.subcat-match-highlight').length > 0;
      const isSectorMatch = sector.includes(query) || title.includes(query);

      if (hasMatchingChip || isSectorMatch) {
        card.classList.remove('sector-card-dimmed');
        card.classList.add('sector-card-highlighted');
      } else {
        card.classList.add('sector-card-dimmed');
        card.classList.remove('sector-card-highlighted');
      }
    });

    // Render Real-Time Search Dropdown
    if (tray) {
      const citySelect = document.getElementById('hero-city-select');
      const activeCity = citySelect?.value || 'All Cities';

      let html = '';
      if (matchingChips.length > 0) {
        html += `
          <div class="realtime-search-tray-header">
            <span>Matching Subcategories (${matchingChips.length})</span>
            <small style="color: #0D9488;">Click to filter instantly</small>
          </div>
          <div class="realtime-subcat-matches">
            ${matchingChips.slice(0, 10).map(m => `
              <button type="button" class="realtime-match-chip" onclick="App.handleSubcategoryClick('${m.category}', '${m.name}')">
                <span>🏷️</span> ${m.name}
              </button>
            `).join('')}
          </div>
        `;
      }

      html += `
        <div class="realtime-search-tray-header">
          <span>Search in Directory</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center; justify-content: space-between; padding: 6px 0;">
          <div style="font-size: 0.88rem; color: #475569;">
            Find all "<strong>${rawQuery}</strong>" in <strong>${activeCity}</strong>
          </div>
          <button type="button" class="btn btn-primary btn-sm" onclick="App.executeHeroSearch()">
            Search Places &rarr;
          </button>
        </div>
      `;

      tray.innerHTML = html;
      tray.style.display = 'block';
    }
  },

  executeHeroSearch() {
    const input = document.getElementById('hero-search-input');
    const citySelect = document.getElementById('hero-city-select');
    const query = input?.value.trim() || '';
    const city = citySelect?.value || 'All Cities';

    if (city && city !== 'All Cities' && window.Filters) {
      window.Filters.setCity(city);
    }

    const tray = document.getElementById('realtime-search-tray');
    if (tray) tray.style.display = 'none';

    if (window.SearchEngine) {
      window.SearchEngine.executeSearch(query);
    }
  },

  handleSubcategoryClick(categorySlug, subcategoryName) {
    const citySelect = document.getElementById('hero-city-select');
    const city = citySelect?.value || 'All Cities';

    const subcatSlug = subcategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (window.Router) {
      window.Router.navigate('explore');
    }

    if (window.Filters) {
      if (city && city !== 'All Cities') window.Filters.setCity(city);
      window.Filters.setCategory(categorySlug);
      window.Filters.setSubcategory(subcatSlug);
      
      setTimeout(() => {
        App.loadPlaces();
      }, 50);
    }

    window.showToast(`Filtering ${subcategoryName} in ${city}`, 'success');
  },

  navigateToSector(categorySlug) {
    if (categorySlug === 'education') {
      window.Router.navigate('education');
    } else if (categorySlug === 'essential-services') {
      window.Router.navigate('essential');
    } else {
      window.Router.navigate('explore');
      if (window.Filters) {
        window.Filters.setCategory(categorySlug);
        App.loadPlaces();
      }
    }
  },

  toggleSectorBookmark(sectorSlug, sectorName, btnElement) {
    let saved = JSON.parse(localStorage.getItem('truspot_saved_sectors') || '[]');
    const index = saved.indexOf(sectorSlug);

    if (index > -1) {
      saved.splice(index, 1);
      btnElement?.classList.remove('bookmarked');
      window.showToast(`Removed ${sectorName} from bookmarks`, 'info');
    } else {
      saved.push(sectorSlug);
      btnElement?.classList.add('bookmarked');
      window.showToast(`✓ Saved ${sectorName} to bookmarks!`, 'success');
    }

    localStorage.setItem('truspot_saved_sectors', JSON.stringify(saved));
  },

  toggleMobileDrawer(open) {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (drawer) drawer.classList.toggle('open', open);
    if (backdrop) backdrop.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  },

  setupViewModeToggles() {
    const btnSplit = document.getElementById('view-mode-split');
    const btnGrid = document.getElementById('view-mode-grid');
    const btnMap = document.getElementById('view-mode-map');
    const splitWrap = document.getElementById('split-content-wrap');

    const updateMode = (mode) => {
      this.currentViewMode = mode;
      [btnSplit, btnGrid, btnMap].forEach(b => b?.classList.remove('active'));

      if (mode === 'split') {
        btnSplit?.classList.add('active');
        splitWrap.className = 'split-content-wrap';
      } else if (mode === 'grid') {
        btnGrid?.classList.add('active');
        splitWrap.className = 'split-content-wrap grid-only';
      } else if (mode === 'map') {
        btnMap?.classList.add('active');
        splitWrap.className = 'split-content-wrap map-only';
      }

      setTimeout(() => window.TruMap?.mapInstance?.invalidateSize(), 200);
    };

    btnSplit?.addEventListener('click', () => updateMode('split'));
    btnGrid?.addEventListener('click', () => updateMode('grid'));
    btnMap?.addEventListener('click', () => updateMode('map'));
  },

  // --------------------------------------------------------------------------
  // HOME PAGE SHOWCASES
  // --------------------------------------------------------------------------
  async loadHomeShowcases(city = 'All Cities') {
    const cityParam = city === 'All Cities' ? '' : `&city=${encodeURIComponent(city)}`;
    try {
      // 1. Trending / Highly Rated places
      const res = await fetch(`/api/places?limit=6&sort_by=rating_desc${cityParam}`);
      if (res.ok) {
        const data = await res.json();
        this.renderPlacesGrid(data.places, 'home-trending-grid');
      }

      // 2. Local Recommendations
      const recRes = await fetch(`/api/places?limit=6&sort_by=reviews_desc${cityParam}`);
      if (recRes.ok) {
        const data = await recRes.json();
        this.renderPlacesGrid(data.places, 'home-recommendations-grid');
      }

      // 3. Guides
      this.loadGuides(city, 'home-guides-grid', 3);

      // 4. Questions
      this.loadQuestions(city, 'home-questions-grid', 3);
    } catch (err) {
      console.warn('Error loading showcases:', err);
    }
  },

  // --------------------------------------------------------------------------
  // PLACES LOADING & RENDERING
  // --------------------------------------------------------------------------
  async loadPlaces(queryString = '') {
    const placesGrid = document.getElementById('explore-places-grid');
    const countDisplay = document.getElementById('explore-count');
    if (!placesGrid) return;

    placesGrid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px; text-align: center; color: var(--text-muted);">
        <div style="display: inline-block; width: 36px; height: 36px; border: 3px solid #E2E8F0; border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="margin-top: 12px; font-weight: 600;">Searching verified local spots...</p>
      </div>
    `;

    const queryParams = window.Filters.buildQueryParams();
    if (queryString) {
      queryParams.set('q', queryString);
    }

    try {
      const res = await fetch(`/api/places?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch places');

      const data = await res.json();
      this.currentPlaces = data.places || [];

      // Update result count
      if (countDisplay) {
        countDisplay.textContent = this.currentPlaces.length;
      }

      // Natural language parsed badge
      if (window.SearchEngine) {
        window.SearchEngine.renderParsedQueryBadge(data.parsed_query);
      }

      // Render category cover banner (Education, Essential Services, etc.)
      this.renderExploreCategoryCoverBanner(window.Filters?.state?.category);

      // Render cards
      if (this.currentPlaces.length === 0) {
        placesGrid.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-state-icon">🔍</div>
            <div class="empty-state-title">No places found matching your filters</div>
            <p class="empty-state-desc">Try loosening your filter parameters or search terms to uncover more places in your city.</p>
            <button class="btn btn-primary btn-sm" onclick="Filters.resetFilters()">Reset All Filters</button>
          </div>
        `;
      } else {
        this.renderPlacesGrid(this.currentPlaces, 'explore-places-grid');
      }

      // Update Map Markers
      window.TruMap?.updateMarkers(this.currentPlaces);

    } catch (err) {
      console.error('Error fetching places:', err);
      placesGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">⚠️</div>
          <div class="empty-state-title">Unable to load places right now</div>
          <p class="empty-state-desc">Please check your network connection and try again.</p>
          <button class="btn btn-primary btn-sm" onclick="App.loadPlaces()">Retry</button>
        </div>
      `;
    }
  },

  renderExploreCategoryCoverBanner(catSlug) {
    const bannerContainer = document.getElementById('explore-category-cover-banner');
    if (!bannerContainer) return;

    if (catSlug === 'education') {
      bannerContainer.style.display = 'block';
      bannerContainer.innerHTML = `
        <div class="explore-cat-cover-banner edu">
          <div class="cat-cover-left">
            <div class="cat-cover-badge" style="color: #A7F3D0; background: rgba(13, 148, 136, 0.45); display: inline-flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              🎓 Verified Academic & Institutional Directory
            </div>
            <h2>Education & Learning Hub</h2>
            <p>Explore 175 registered physical schools, colleges, research universities, coaching centers, libraries, and skill training academies.</p>
            <div class="cat-cover-badges">
              <span class="cat-cover-badge">🏫 25 Schools</span>
              <span class="cat-cover-badge">🏛️ 25 Colleges</span>
              <span class="cat-cover-badge">🎓 25 Universities</span>
              <span class="cat-cover-badge">🎯 25 Coaching Centers</span>
              <span class="cat-cover-badge">💻 25 Tech Institutes</span>
              <span class="cat-cover-badge">📚 25 Libraries</span>
              <span class="cat-cover-badge">⚙️ 25 Skill Centers</span>
            </div>
          </div>
          <button type="button" class="btn btn-primary" onclick="Router.navigate('education')" style="white-space: nowrap; align-self: center; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            Open Dedicated Education Portal &rarr;
          </button>
        </div>
      `;
    } else if (catSlug === 'essential-services') {
      bannerContainer.style.display = 'block';
      bannerContainer.innerHTML = `
        <div class="explore-cat-cover-banner essential">
          <div class="cat-cover-left">
            <div class="cat-cover-badge" style="color: #FECDD3; background: rgba(190, 18, 60, 0.45); display: inline-flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              🚨 24/7 Civic & Emergency Infrastructure
            </div>
            <h2>Essential Public Services & Helplines</h2>
            <p>Direct emergency trauma response, law enforcement, municipal headquarters, banking, power, and water utility networks across all 5 target cities.</p>
            <div class="cat-cover-badges">
              <span class="cat-cover-badge">👮 25 Police Stations</span>
              <span class="cat-cover-badge">🚒 25 Fire Stations</span>
              <span class="cat-cover-badge">🚑 25 Trauma Centers</span>
              <span class="cat-cover-badge">🏛️ 25 Civic HQs</span>
              <span class="cat-cover-badge">⚡ 25 Power Stations</span>
              <span class="cat-cover-badge">💧 25 Water Works</span>
            </div>
          </div>
          <button type="button" class="btn btn-danger" onclick="Router.navigate('essential')" style="white-space: nowrap; align-self: center; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            Open Dedicated Emergency Portal &rarr;
          </button>
        </div>
      `;
    } else if (catSlug === 'food-dining') {
      bannerContainer.style.display = 'block';
      bannerContainer.innerHTML = `
        <div class="explore-cat-cover-banner food" style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border-left: 5px solid #F59E0B; border-radius: 16px; padding: 24px; margin-bottom: 24px; color: white; display: flex; justify-content: space-between; align-items: center; gap: 20px; box-shadow: var(--shadow-md); position: relative; overflow: hidden;">
          <div class="cat-cover-left" style="z-index: 1;">
            <div class="cat-cover-badge" style="color: #FDE68A; background: rgba(217, 119, 6, 0.35); display: inline-flex; align-items: center; gap: 6px; margin-bottom: 8px; padding: 4px 12px; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;">
              🍽️ Verified Culinary & Dining Directory
            </div>
            <h2 style="font-size: 1.5rem; font-weight: 800; margin: 4px 0 8px; color: white;">Food & Dining Hotspots</h2>
            <p style="color: #CBD5E1; font-size: 0.92rem; margin: 0 0 12px; max-width: 650px;">Authentic physical dining destinations across Andhra Pradesh & Karnataka — from traditional banana-leaf Thalis and artisanal cafes to bakeries, street food, and fine dining.</p>
            <div class="cat-cover-badges" style="display: flex; flex-wrap: wrap; gap: 6px;">
              <span class="cat-cover-badge" style="background: rgba(255,255,255,0.1); color: #F1F5F9; font-size: 0.76rem; padding: 3px 10px; border-radius: 9999px;">🍛 Traditional Thali</span>
              <span class="cat-cover-badge" style="background: rgba(255,255,255,0.1); color: #F1F5F9; font-size: 0.76rem; padding: 3px 10px; border-radius: 9999px;">☕ Artisanal Cafes</span>
              <span class="cat-cover-badge" style="background: rgba(255,255,255,0.1); color: #F1F5F9; font-size: 0.76rem; padding: 3px 10px; border-radius: 9999px;">🥐 Bakeries</span>
              <span class="cat-cover-badge" style="background: rgba(255,255,255,0.1); color: #F1F5F9; font-size: 0.76rem; padding: 3px 10px; border-radius: 9999px;">🍲 Street Food</span>
              <span class="cat-cover-badge" style="background: rgba(255,255,255,0.1); color: #F1F5F9; font-size: 0.76rem; padding: 3px 10px; border-radius: 9999px;">🍔 Fast Food</span>
              <span class="cat-cover-badge" style="background: rgba(255,255,255,0.1); color: #F1F5F9; font-size: 0.76rem; padding: 3px 10px; border-radius: 9999px;">🌱 Pure Vegan</span>
              <span class="cat-cover-badge" style="background: rgba(255,255,255,0.1); color: #F1F5F9; font-size: 0.76rem; padding: 3px 10px; border-radius: 9999px;">🍨 Gelato & Ice Cream</span>
              <span class="cat-cover-badge" style="background: rgba(255,255,255,0.1); color: #F1F5F9; font-size: 0.76rem; padding: 3px 10px; border-radius: 9999px;">✨ Fine Dining</span>
            </div>
          </div>
          <div style="position: absolute; right: -15px; top: -15px; opacity: 0.1; font-size: 130px; pointer-events: none; user-select: none;">🍽️</div>
        </div>
      `;
    } else {
      bannerContainer.style.display = 'none';
      bannerContainer.innerHTML = '';
    }
  },

  renderPlacesGrid(places, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = places.map(place => {
      const isSaved = window.Auth?.isSaved('place', place.id);
      const coverUrl = this.resolveSpotCoverImage(place);
      const sectorKey = place.category_slug || place.category_name || place.category || place.sector || '';
      const subcatKey = place.subcategory_slug || place.subcategory_name || place.subcategory || '';

      return `
        <div class="place-card">
          <div class="card-image-wrap rounded-t-xl relative overflow-hidden h-48 md:h-56">
            <img 
              src="${coverUrl}" 
              alt="${place.name}" 
              class="w-full h-48 md:h-56 object-cover rounded-t-xl transition-all duration-300 hover:scale-105" 
              loading="lazy" 
              onerror="App.handleCardImageError(this, '${sectorKey}', '${subcatKey}')"
            >
            <div class="card-top-badges">
              <span class="cover-card-verified-badge" style="position: absolute; top: 12px; left: 12px; z-index: 2; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); background: rgba(220, 252, 231, 0.92); color: #065F46; border: 1px solid rgba(167, 243, 208, 0.8);">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>✓ Verified</span>
              </span>
              <button 
                class="card-bookmark-btn ${isSaved ? 'saved' : ''}" 
                style="position: absolute; top: 12px; right: 12px; z-index: 2; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);" 
                data-save-type="place" 
                data-save-id="${place.id}"
                title="Bookmark Place"
                onclick="event.stopPropagation(); Auth.toggleSave('place', ${place.id})"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="card-meta-row">
              <span class="card-category-sub">${place.subcategory_name || place.category_name}</span>
              <div class="card-rating-box">
                <span>★</span> ${place.average_rating} <span style="font-size: 0.75rem; color: #713F12; font-weight: 500;">(${place.review_count})</span>
              </div>
            </div>
            <h3 class="card-title">${place.name}</h3>
            <div class="card-address">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-top: 2px; flex-shrink: 0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${place.address}</span>
            </div>
            <div class="card-amenities-row">
              ${(place.amenities || []).slice(0, 3).map(a => `<span class="amenity-pill">${a}</span>`).join('')}
              ${place.amenities && place.amenities.length > 3 ? `<span class="amenity-pill">+${place.amenities.length - 3}</span>` : ''}
            </div>
            <div class="card-footer">
              <div class="card-price-open">
                <span class="badge badge-price">${place.price_level}</span>
                <span class="badge ${place.is_open_now ? 'badge-open' : 'badge-closed'}">
                  ${place.is_open_now ? '● Open Now' : '○ Closed'}
                </span>
              </div>
              <button class="btn btn-outline btn-sm" onclick="App.openPlaceDetails(${place.id})">
                View Details
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // --------------------------------------------------------------------------
  // PLACE DETAILS MODAL
  // --------------------------------------------------------------------------
  async openPlaceDetails(placeId) {
    const modal = document.getElementById('place-details-modal');
    const content = document.getElementById('place-details-modal-body');
    if (!modal || !content) return;

    modal.classList.add('open');
    content.innerHTML = `
      <div style="padding: 60px; text-align: center;">
        <div style="display: inline-block; width: 36px; height: 36px; border: 3px solid #E2E8F0; border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="margin-top: 12px; font-weight: 600;">Loading verified details...</p>
      </div>
    `;

    try {
      const res = await fetch(`/api/places/${placeId}`);
      if (!res.ok) throw new Error('Place not found');

      const place = await res.json();
      this.currentActivePlace = place;
      this.renderPlaceDetailsModal(place, content);
    } catch (err) {
      content.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div class="empty-state-title">Could not load details</div>
          <p class="empty-state-desc">The place details could not be retrieved at this time.</p>
        </div>
      `;
    }
  },

  renderPlaceDetailsModal(place, container) {
    const isSaved = window.Auth?.isSaved('place', place.id);
    const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const coverUrl = this.resolveSpotCoverImage(place);
    const sectorKey = place.category_slug || place.category_name || place.category || place.sector || '';
    const subcatKey = place.subcategory_slug || place.subcategory_name || place.subcategory || '';

    container.innerHTML = `
      <div class="place-detail-hero">
        <img src="${coverUrl}" alt="${place.name}" onerror="App.handleCardImageError(this, '${sectorKey}', '${subcatKey}')">
        <div class="place-detail-hero-overlay">
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <span class="badge ${place.is_demo ? 'badge-demo' : 'badge-verified'}">${place.is_demo ? 'Demo Data' : '✓ Verified'}</span>
            <span class="badge badge-category">${place.category_name}</span>
            <span class="badge badge-price">${place.price_level}</span>
          </div>
          <h1 class="place-detail-title">${place.name}</h1>
          <div class="place-detail-meta-bar">
            <span>★ <strong>${place.average_rating}</strong> (${place.review_count} reviews)</span> • 
            <span>${place.city_name}</span> • 
            <span>${place.address}</span>
          </div>
        </div>
      </div>

      <div class="place-detail-content">
        <div class="detail-left">
          <!-- Action Buttons -->
          <div class="detail-actions-row">
            <button class="btn btn-primary" onclick="Auth.toggleSave('place', ${place.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              <span>${isSaved ? 'Saved in Collection' : 'Bookmark Spot'}</span>
            </button>
            <button class="btn btn-outline" onclick="App.sharePlace('${place.name}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Share Spot
            </button>
            ${place.phone ? `
              <a href="tel:${place.phone}" class="btn btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call: ${place.phone}
              </a>
            ` : ''}
            <a href="https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}" target="_blank" class="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              Get Directions
            </a>
            <button class="btn btn-outline" onclick="App.openAskModalForPlace(${place.id}, '${place.name}', ${place.city_id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Ask Community
            </button>
          </div>

          <!-- Description -->
          <div>
            <h3 class="detail-section-title">About this Spot</h3>
            <p class="detail-desc-text">${place.description}</p>
          </div>

          <!-- Amenities -->
          <div>
            <h3 class="detail-section-title">Amenities & Highlights</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${(place.amenities || []).map(a => `
                <div style="background: white; border: 1px solid var(--border); padding: 6px 14px; border-radius: var(--radius-md); font-size: 0.88rem; font-weight: 500; display: flex; align-items: center; gap: 6px;">
                  <span style="color: var(--primary);">✓</span> ${a}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Review Engine -->
          <div class="review-engine-box">
            <h3 class="detail-section-title">Community Reviews & Ratings</h3>
            
            <div class="ratings-summary-wrap">
              <div class="overall-score-box">
                <div class="overall-number">${place.average_rating}</div>
                <div class="stars-row">★★★★★</div>
                <div class="total-reviews-label">${place.review_count} verified reviews</div>
              </div>
              <div class="breakdown-bars-wrap">
                ${[5, 4, 3, 2, 1].map(stars => {
                  const count = place.rating_breakdown?.[stars] || 0;
                  const pct = place.review_count > 0 ? (count / place.review_count) * 100 : 0;
                  return `
                    <div class="breakdown-bar-row">
                      <span style="width: 28px;">${stars}★</span>
                      <div class="breakdown-bar-track">
                        <div class="breakdown-bar-fill" style="width: ${pct}%;"></div>
                      </div>
                      <span style="width: 24px; text-align: right;">${count}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Write Review Form -->
            <div class="review-form-card" id="write-review-section">
              <h4 style="font-weight: 700; margin-bottom: 8px;">Write a Review</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Share your genuine experience with other locals in ${place.city_name}.</p>
              
              <div class="star-rating-input" id="modal-star-input">
                <span class="star" data-rating="1">★</span>
                <span class="star" data-rating="2">★</span>
                <span class="star" data-rating="3">★</span>
                <span class="star" data-rating="4">★</span>
                <span class="star active" data-rating="5">★</span>
              </div>
              <input type="hidden" id="selected-star-rating" value="5">

              <textarea id="review-comment-input" class="review-textarea" placeholder="Tell the community about food taste, service quality, atmosphere, parking..."></textarea>
              
              <button class="btn btn-primary btn-sm" onclick="App.submitReview(${place.id})">
                Post Review
              </button>
            </div>

            <!-- Reviews List -->
            <div class="reviews-list">
              ${(place.reviews || []).map(r => `
                <div class="review-item">
                  <div class="review-header">
                    <div class="reviewer-profile">
                      <img src="${r.user_avatar}" alt="${r.user_name}" class="reviewer-avatar" onerror="this.src='https://ui-avatars.com/api/?name=User&background=0D9488&color=fff'">
                      <div>
                        <div class="reviewer-name">${r.user_name}</div>
                        <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                          <span class="badge ${r.is_demo ? 'badge-demo' : 'badge-category'}" style="font-size: 0.7rem; padding: 1px 6px;">
                            ${r.is_demo ? 'Demo Review' : r.user_role}
                          </span>
                          <span style="font-size: 0.78rem; color: var(--text-muted);">${r.created_at}</span>
                        </div>
                      </div>
                    </div>
                    <div class="card-rating-box">★ ${r.rating}</div>
                  </div>
                  <p class="review-comment">${r.comment}</p>
                  
                  ${r.business_reply ? `
                    <div class="business-reply-box">
                      <div class="business-reply-title">Official Response from Business:</div>
                      <div>${r.business_reply}</div>
                    </div>
                  ` : ''}

                  <div class="review-footer">
                    <button class="helpful-btn" onclick="App.upvoteReview(${place.id}, ${r.id}, this)">
                      👍 Helpful (${r.helpful_count})
                    </button>
                    ${window.Auth?.currentUser?.id === r.user_id ? `
                      <button class="btn btn-sm btn-danger" style="padding: 2px 8px; font-size: 0.75rem;" onclick="App.deleteReview(${place.id}, ${r.id})">
                        Delete
                      </button>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Sidebar Info -->
        <div class="detail-sidebar-box">
          <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 8px;">Business Information</div>
          
          <div class="sidebar-info-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div style="flex: 1;">
              <div style="font-weight: 600; margin-bottom: 4px;">Opening Hours</div>
              <table class="hours-table">
                ${Object.entries(place.opening_hours || {}).map(([day, hrs]) => `
                  <tr class="${day.toLowerCase() === todayName.toLowerCase() ? 'today' : ''}">
                    <td>${day}</td>
                    <td style="text-align: right;">${hrs}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
          </div>

          <div class="sidebar-info-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div>
              <div style="font-weight: 600;">Location</div>
              <div style="color: var(--text-muted); font-size: 0.85rem;">${place.address}</div>
            </div>
          </div>

          ${place.website ? `
            <div class="sidebar-info-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <div>
                <div style="font-weight: 600;">Official Website</div>
                <a href="${place.website}" target="_blank" style="color: var(--primary); font-size: 0.85rem; word-break: break-all;">${place.website}</a>
              </div>
            </div>
          ` : ''}

          <!-- Business Claim Section -->
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">Do you own or manage this place?</div>
            <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;" onclick="App.claimPlaceFromDetails(${place.id})">
              Claim this Business Listing
            </button>
          </div>
        </div>
      </div>
    `;

    // Star selector interactivity
    const starContainer = document.getElementById('modal-star-input');
    if (starContainer) {
      starContainer.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
          const rating = parseInt(star.getAttribute('data-rating'), 10);
          document.getElementById('selected-star-rating').value = rating;
          starContainer.querySelectorAll('.star').forEach(s => {
            const r = parseInt(s.getAttribute('data-rating'), 10);
            s.classList.toggle('active', r <= rating);
          });
        });
      });
    }
  },

  sharePlace(name) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      window.showToast(`Link for "${name}" copied to clipboard!`, 'success');
    } else {
      window.showToast(`Sharing "${name}"`, 'info');
    }
  },

  async submitReview(placeId) {
    if (!window.Auth?.currentUser) {
      window.Auth.openAuthModal('login');
      window.showToast('Please sign in to post a review.', 'info');
      return;
    }

    const rating = document.getElementById('selected-star-rating')?.value || '5';
    const comment = document.getElementById('review-comment-input')?.value.trim();

    if (!comment) {
      window.showToast('Please type a review comment.', 'error');
      return;
    }

    try {
      const res = await fetch(`/api/places/${placeId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: parseFloat(rating), comment })
      });

      const data = await res.json();
      if (res.ok) {
        window.showToast(data.message, 'success');
        // Refresh place modal
        this.openPlaceDetails(placeId);
        // Refresh explore list
        this.loadPlaces();
      } else {
        window.showToast(data.error || 'Failed to submit review', 'error');
      }
    } catch (err) {
      window.showToast('Network error submitting review', 'error');
    }
  },

  async deleteReview(placeId, reviewId) {
    if (!confirm('Are you sure you want to remove your review?')) return;
    try {
      const res = await fetch(`/api/places/${placeId}/reviews/${reviewId}`, { method: 'DELETE' });
      if (res.ok) {
        window.showToast('Review deleted successfully', 'info');
        this.openPlaceDetails(placeId);
        this.loadPlaces();
      }
    } catch (err) {
      window.showToast('Error deleting review', 'error');
    }
  },

  async upvoteReview(placeId, reviewId, button) {
    try {
      const res = await fetch(`/api/places/${placeId}/reviews/${reviewId}/helpful`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        button.innerHTML = `👍 Helpful (${data.helpful_count})`;
        window.showToast('Thank you for voting this review helpful!', 'success');
      }
    } catch (e) {}
  },

  async claimPlaceFromDetails(placeId) {
    if (!window.Auth?.currentUser) {
      window.Auth.openAuthModal('login');
      window.showToast('Please sign in with a Business Owner account to claim.', 'info');
      return;
    }
    try {
      const res = await fetch('/api/business/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ place_id: placeId })
      });
      const data = await res.json();
      if (res.ok) {
        window.showToast(data.message, 'success');
        window.Router.navigate('business');
      } else {
        window.showToast(data.error || 'Could not claim place', 'error');
      }
    } catch (err) {
      window.showToast('Network error claiming place', 'error');
    }
  },

  // --------------------------------------------------------------------------
  // ASK LOCALS (COMMUNITY Q&A)
  // --------------------------------------------------------------------------
  async loadQuestions(city = 'All Cities', containerId = 'qa-feed-grid', limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cityParam = city === 'All Cities' ? '' : `city=${encodeURIComponent(city)}`;
    try {
      const res = await fetch(`/api/questions?${cityParam}`);
      if (!res.ok) return;

      let questions = await res.json();
      if (limit) questions = questions.slice(0, limit);

      if (!questions.length) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">💬</div>
            <div class="empty-state-title">No questions yet for this city</div>
            <p class="empty-state-desc">Be the first to ask questions about food, travel, or services to real local residents!</p>
            <button class="btn btn-primary btn-sm" onclick="App.openAskModal()">Ask a Question</button>
          </div>
        `;
        return;
      }

      container.innerHTML = questions.map(q => `
        <div class="qa-card">
          <div class="qa-header">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge ${q.status === 'Answered' ? 'badge-verified' : 'badge-category'}">${q.status}</span>
              <span class="badge badge-price">${q.city_name}</span>
              <span style="font-size: 0.78rem; color: var(--text-muted);">${q.created_at}</span>
            </div>
            <button class="helpful-btn" onclick="Auth.toggleSave('question', ${q.id})">
              🔖 Save
            </button>
          </div>
          <h3 class="qa-title">${q.title}</h3>
          <p class="qa-body">${q.content}</p>

          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted);">
            <div>Asked by <strong>${q.author_name}</strong> (${q.author_role})</div>
            <div>${q.answers_count} Community Answers</div>
          </div>

          <div class="answers-section">
            <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 10px; color: var(--text-main);">Community Responses:</div>
            ${q.answers.length > 0 ? q.answers.map(ans => `
              <div class="answer-item">
                <div class="answer-author-bar">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${ans.author_avatar || 'https://ui-avatars.com/api/?name=Guide&background=0D9488&color=fff'}" style="width: 24px; height: 24px; border-radius: 50%;">
                    <strong>${ans.author_name}</strong>
                    <span class="badge badge-category" style="font-size: 0.7rem; padding: 1px 6px;">${ans.author_role}</span>
                  </div>
                  <span style="color: var(--text-muted); font-size: 0.78rem;">${ans.created_at}</span>
                </div>
                <div class="answer-text">${ans.content}</div>
                <button class="helpful-btn" onclick="App.upvoteAnswer(${ans.id}, this)">
                  👍 Helpful (${ans.helpful_count})
                </button>
              </div>
            `).join('') : '<div style="font-size: 0.85rem; color: var(--text-muted);">No answers yet. Share your local insight below!</div>'}

            <!-- Answer Submission Form -->
            <div style="margin-top: 14px; display: flex; gap: 8px;">
              <input type="text" id="ans-input-${q.id}" class="form-input" placeholder="Write your verified local advice..." style="font-size: 0.88rem; padding: 8px 12px;">
              <button class="btn btn-primary btn-sm" onclick="App.submitAnswer(${q.id})">Answer</button>
            </div>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.warn('Error loading questions:', err);
    }
  },

  openAskModal() {
    const modal = document.getElementById('ask-modal');
    if (modal) modal.classList.add('open');
  },

  openAskModalForPlace(placeId, placeName, cityId) {
    this.openAskModal();
    const titleInput = document.getElementById('ask-title-input');
    const citySelect = document.getElementById('ask-city-select');
    if (titleInput) titleInput.value = `Question about ${placeName}: `;
    if (citySelect && cityId) citySelect.value = cityId;
  },

  async submitQuestion(e) {
    if (e) e.preventDefault();
    if (!window.Auth?.currentUser) {
      window.Auth.openAuthModal('login');
      window.showToast('Please sign in to ask a question.', 'info');
      return;
    }

    const title = document.getElementById('ask-title-input')?.value.trim();
    const content = document.getElementById('ask-content-input')?.value.trim();
    const city_id = document.getElementById('ask-city-select')?.value;
    const category_id = document.getElementById('ask-category-select')?.value;

    if (!title || !content) {
      window.showToast('Please provide both question title and details.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, city_id: city_id !== 'All Cities' ? city_id : 1, category_id: category_id !== 'all' ? category_id : null })
      });
      const data = await res.json();
      if (res.ok) {
        window.showToast('Your question has been published!', 'success');
        document.getElementById('ask-modal')?.classList.remove('open');
        document.getElementById('ask-title-input').value = '';
        document.getElementById('ask-content-input').value = '';
        this.loadQuestions();
      } else {
        window.showToast(data.error || 'Failed to post question', 'error');
      }
    } catch (err) {
      window.showToast('Network error posting question', 'error');
    }
  },

  async submitAnswer(questionId) {
    if (!window.Auth?.currentUser) {
      window.Auth.openAuthModal('login');
      window.showToast('Please sign in to answer questions.', 'info');
      return;
    }

    const input = document.getElementById(`ans-input-${questionId}`);
    const content = input?.value.trim();

    if (!content) {
      window.showToast('Please enter your answer text.', 'error');
      return;
    }

    try {
      const res = await fetch(`/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      if (res.ok) {
        window.showToast('Thank you! Your answer was posted.', 'success');
        this.loadQuestions();
      } else {
        window.showToast(data.error || 'Failed to post answer', 'error');
      }
    } catch (err) {
      window.showToast('Network error posting answer', 'error');
    }
  },

  async upvoteAnswer(answerId, button) {
    try {
      const res = await fetch(`/api/answers/${answerId}/helpful`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        button.innerHTML = `👍 Helpful (${data.helpful_count})`;
        window.showToast('Vote recorded!', 'success');
      }
    } catch (e) {}
  },

  // --------------------------------------------------------------------------
  // LOCAL GUIDES & CONTRIBUTORS
  // --------------------------------------------------------------------------
  async loadGuides(city = 'All Cities', containerId = 'guides-feed-grid', limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cityParam = city === 'All Cities' ? '' : `city=${encodeURIComponent(city)}`;
    try {
      const res = await fetch(`/api/guides?${cityParam}`);
      if (!res.ok) return;

      let guides = await res.json();
      if (limit) guides = guides.slice(0, limit);

      container.innerHTML = guides.map(g => `
        <div class="guide-card">
          <div class="guide-cover-wrap">
            <img src="${g.cover_image}" alt="${g.title}" onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'">
            <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 6px;">
              <span class="badge badge-demo">Demo Data</span>
              <span class="badge badge-price">${g.city_name}</span>
            </div>
          </div>
          <div class="guide-card-body">
            <h3 class="guide-title">${g.title}</h3>
            <p class="guide-desc">${g.description}</p>
            <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-bottom: 12px;">
              📍 Includes ${g.places_count} Curated Places
            </div>
            <div class="guide-author-footer">
              <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="App.openContributorModal(${g.user_id})">
                <img src="${g.author_avatar || 'https://ui-avatars.com/api/?name=Guide&background=0D9488&color=fff'}" style="width: 28px; height: 28px; border-radius: 50%;">
                <span style="font-weight: 600; font-size: 0.88rem;">${g.author_name}</span>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="helpful-btn" onclick="App.likeGuide(${g.id}, this)">
                  ❤️ ${g.likes_count}
                </button>
                <button class="btn btn-outline btn-sm" onclick="App.openGuideDetails(${g.id})">
                  View Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.warn('Error loading guides:', err);
    }
  },

  async openGuideDetails(guideId) {
    const modal = document.getElementById('guide-details-modal');
    const content = document.getElementById('guide-details-modal-body');
    if (!modal || !content) return;

    modal.classList.add('open');
    content.innerHTML = '<div style="padding: 40px; text-align: center;">Loading curated collection...</div>';

    try {
      const res = await fetch(`/api/guides/${guideId}`);
      const guide = await res.json();

      content.innerHTML = `
        <div style="position: relative; height: 240px; overflow: hidden; border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
          <img src="${guide.cover_image}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 80%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; color: white;">
            <div style="display: flex; gap: 6px; margin-bottom: 6px;">
              <span class="badge badge-demo">Demo Guide</span>
              <span class="badge badge-category">${guide.city_name}</span>
            </div>
            <h2 style="font-size: 1.8rem; font-weight: 800;">${guide.title}</h2>
          </div>
        </div>
        <div style="padding: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
            <div style="display: flex; align-items: center; gap: 12px; cursor: pointer;" onclick="App.openContributorModal(${guide.user_id})">
              <img src="${guide.author_avatar}" style="width: 44px; height: 44px; border-radius: 50%;">
              <div>
                <div style="font-weight: 700;">Curated by ${guide.author_name}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${guide.author_bio || 'Local Guide'}</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="Auth.toggleSave('guide', ${guide.id})">
              🔖 Bookmark Guide
            </button>
          </div>
          <p style="font-size: 1rem; color: #334155; line-height: 1.6; margin-bottom: 24px;">${guide.description}</p>
          
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 16px;">Recommended Stops Along This Trail</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${(guide.places || []).map((p, idx) => `
              <div style="display: flex; gap: 16px; background: var(--bg-subtle); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border); align-items: center;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">
                  ${idx + 1}
                </div>
                <img src="${p.image_url}" style="width: 70px; height: 70px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0;">
                <div style="flex: 1;">
                  <div style="font-weight: 700; font-size: 1.05rem;">${p.name}</div>
                  <div style="font-size: 0.82rem; color: var(--text-muted);">${p.address} • ★ ${p.average_rating}</div>
                  <div style="font-size: 0.85rem; color: var(--primary); margin-top: 4px; font-weight: 500;">"${p.guide_note || 'Highlight stop'}"</div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="App.openPlaceDetails(${p.id})">
                  View Spot
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } catch (err) {
      content.innerHTML = '<div class="empty-state">Unable to load guide details</div>';
    }
  },

  async likeGuide(guideId, button) {
    try {
      const res = await fetch(`/api/guides/${guideId}/like`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        button.innerHTML = `❤️ ${data.likes_count}`;
        window.showToast('Guide upvoted!', 'success');
      }
    } catch (e) {}
  },

  async openContributorModal(userId) {
    const modal = document.getElementById('contributor-modal');
    const content = document.getElementById('contributor-modal-body');
    if (!modal || !content) return;

    modal.classList.add('open');
    content.innerHTML = '<div style="padding: 40px; text-align: center;">Loading contributor profile...</div>';

    try {
      const res = await fetch(`/api/contributors/${userId}`);
      const data = await res.json();
      const u = data.user;

      content.innerHTML = `
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="${u.avatar}" style="width: 90px; height: 90px; border-radius: 50%; border: 3px solid var(--primary); margin: 0 auto 12px; object-fit: cover;">
          <h2 style="font-size: 1.5rem; font-weight: 800;">${u.name}</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem;">${u.city} • TruSpot Verified Local Contributor</p>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 12px;">
            ${(data.badges || []).map(b => `
              <span class="badge badge-verified" style="padding: 4px 10px; font-size: 0.82rem;">
                ★ ${b.name}
              </span>
            `).join('')}
          </div>
        </div>
        <p style="font-size: 0.92rem; color: #475569; text-align: center; margin-bottom: 24px; line-height: 1.6;">${u.bio}</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
          <div style="background: var(--bg-subtle); padding: 14px; text-align: center; border-radius: var(--radius-md);">
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary);">${data.stats.reviews_count}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Reviews</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 14px; text-align: center; border-radius: var(--radius-md);">
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--secondary);">${data.stats.guides_count}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Guides</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 14px; text-align: center; border-radius: var(--radius-md);">
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--accent-amber);">${data.stats.answers_count}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Q&A Answers</div>
          </div>
        </div>
      `;
    } catch (err) {
      content.innerHTML = '<div class="empty-state">Could not load contributor details</div>';
    }
  },

  // --------------------------------------------------------------------------
  // EDUCATION PORTAL & COVER PAGE
  // --------------------------------------------------------------------------
  currentEducationSubcat: 'all',

  setEducationSubcategory(subSlug) {
    this.currentEducationSubcat = subSlug;
    document.querySelectorAll('#education-subcat-tabs .portal-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-sub') === subSlug);
    });
    this.loadEducationPlaces();
  },

  async loadEducationPlaces() {
    const container = document.getElementById('education-cards-grid');
    const countDisplay = document.getElementById('education-count');
    if (!container) return;

    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px; text-align: center; color: var(--text-muted);">
        <div style="display: inline-block; width: 36px; height: 36px; border: 3px solid #E2E8F0; border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="margin-top: 12px; font-weight: 600;">Loading verified educational institutions...</p>
      </div>
    `;

    const city = document.getElementById('education-city-select')?.value || 'All Cities';
    const searchVal = document.getElementById('education-search-input')?.value.trim() || '';

    const params = new URLSearchParams();
    params.set('category', 'education');
    if (city !== 'All Cities') params.set('city', city);
    if (this.currentEducationSubcat && this.currentEducationSubcat !== 'all') {
      params.set('subcategory', this.currentEducationSubcat);
    }
    if (searchVal) {
      params.set('q', searchVal);
    }

    try {
      const res = await fetch(`/api/places?${params.toString()}`);
      const data = await res.json();
      const places = data.places || [];

      if (countDisplay) {
        countDisplay.textContent = places.length;
      }

      if (!places.length) {
        container.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-state-icon">🎓</div>
            <div class="empty-state-title">No matching learning institutions found</div>
            <p class="empty-state-desc">Try clearing search terms or selecting another city.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = places.map(p => {
        const isSaved = window.Auth?.isSaved('place', p.id);
        const coverUrl = this.resolveSpotCoverImage(p);
        const sectorKey = 'education';
        const subcatKey = p.subcategory_slug || p.subcategory_name || '';

        return `
        <div class="place-card" style="border-top: 4px solid var(--primary); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md);">
          <div class="card-image-wrap rounded-t-xl relative overflow-hidden h-48 md:h-56">
            <img 
              src="${coverUrl}" 
              alt="${p.name}" 
              class="w-full h-48 md:h-56 object-cover rounded-t-xl transition-all duration-300 hover:scale-105"
              loading="lazy"
              onerror="App.handleCardImageError(this, '${sectorKey}', '${subcatKey}')"
            >
            <div class="card-top-badges">
              <span class="cover-card-verified-badge" style="position: absolute; top: 12px; left: 12px; z-index: 2; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); background: rgba(220, 252, 231, 0.92); color: #065F46; border: 1px solid rgba(167, 243, 208, 0.8);">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>✓ Verified</span>
              </span>
              <button 
                class="card-bookmark-btn ${isSaved ? 'saved' : ''}" 
                style="position: absolute; top: 12px; right: 12px; z-index: 2; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);" 
                data-save-type="place" 
                data-save-id="${p.id}"
                title="Bookmark Place"
                onclick="event.stopPropagation(); Auth.toggleSave('place', ${p.id})"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
            <span class="badge" style="position: absolute; bottom: 12px; right: 12px; background: rgba(255,255,255,0.95); color: var(--primary-hover); font-weight: 700; box-shadow: var(--shadow-sm); z-index: 2;">
              ${p.subcategory_name}
            </span>
          </div>
          <div class="card-body">
            <h3 class="card-title" style="margin-top: 4px; font-size: 1.12rem; font-weight: 700; color: var(--text-main);">${p.name}</h3>
            <div class="card-address" style="font-size: 0.88rem; color: var(--text-muted); margin: 6px 0 12px; line-height: 1.5;">
              📍 ${p.address}
            </div>
            <div class="card-footer" style="padding-top: 12px; border-top: 1px solid var(--border); display: flex; gap: 8px;">
              <a href="tel:${p.phone}" class="btn btn-outline btn-sm" style="flex: 1; justify-content: center;">
                📞 Call Campus
              </a>
              <button class="btn btn-primary btn-sm" onclick="App.openPlaceDetails(${p.id})">
                Details &rarr;
              </button>
            </div>
          </div>
        </div>
      `;
      }).join('');
    } catch (err) {
      console.warn('Error loading education places:', err);
      container.innerHTML = '<div class="empty-state">Error loading educational directory</div>';
    }
  },

  // --------------------------------------------------------------------------
  // ESSENTIAL SERVICES PORTAL & COVER PAGE
  // --------------------------------------------------------------------------
  currentEssentialSubcat: 'all',

  setEssentialSubcategory(subSlug) {
    this.currentEssentialSubcat = subSlug;
    document.querySelectorAll('#essential-subcat-tabs .portal-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-sub') === subSlug);
    });
    this.loadEssentialServices();
  },

  async loadEssentialServices() {
    const container = document.getElementById('essential-cards-grid');
    const countDisplay = document.getElementById('essential-count');
    if (!container) return;

    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px; text-align: center; color: var(--text-muted);">
        <div style="display: inline-block; width: 36px; height: 36px; border: 3px solid #E2E8F0; border-top-color: var(--accent-rose); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="margin-top: 12px; font-weight: 600;">Loading verified civic & essential services...</p>
      </div>
    `;

    const city = document.getElementById('essential-city-select')?.value || 'All Cities';
    const openNow = document.getElementById('essential-open-now-check')?.checked || false;
    const is24x7 = document.getElementById('essential-24x7-check')?.checked || false;
    const searchVal = document.getElementById('essential-search-input')?.value.trim() || '';

    const params = new URLSearchParams();
    params.set('category', 'essential-services');
    if (city !== 'All Cities') params.set('city', city);
    if (this.currentEssentialSubcat && this.currentEssentialSubcat !== 'all') {
      params.set('subcategory', this.currentEssentialSubcat);
    }
    if (openNow) params.set('open_now', 'true');
    if (is24x7) params.set('amenities', '24/7 Availability');
    if (searchVal) params.set('q', searchVal);

    try {
      const res = await fetch(`/api/places?${params.toString()}`);
      const data = await res.json();
      const places = data.places || [];

      if (countDisplay) {
        countDisplay.textContent = places.length;
      }

      if (!places.length) {
        container.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-state-icon">🚨</div>
            <div class="empty-state-title">No matching emergency or essential services</div>
            <p class="empty-state-desc">Try clearing search terms or selecting another city.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = places.map(p => {
        const isSaved = window.Auth?.isSaved('place', p.id);
        const coverUrl = this.resolveSpotCoverImage(p);
        const sectorKey = 'essential-services';
        const subcatKey = p.subcategory_slug || p.subcategory_name || '';

        return `
        <div class="place-card" style="border-top: 4px solid var(--accent-rose); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md);">
          <div class="card-image-wrap rounded-t-xl relative overflow-hidden h-48 md:h-56">
            <img 
              src="${coverUrl}" 
              alt="${p.name}" 
              class="w-full h-48 md:h-56 object-cover rounded-t-xl transition-all duration-300 hover:scale-105"
              loading="lazy"
              onerror="App.handleCardImageError(this, '${sectorKey}', '${subcatKey}')"
            >
            <div class="card-top-badges">
              <span class="cover-card-verified-badge" style="position: absolute; top: 12px; left: 12px; z-index: 2; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); background: rgba(220, 252, 231, 0.92); color: #065F46; border: 1px solid rgba(167, 243, 208, 0.8);">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>✓ Verified</span>
              </span>
              <button 
                class="card-bookmark-btn ${isSaved ? 'saved' : ''}" 
                style="position: absolute; top: 12px; right: 12px; z-index: 2; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);" 
                data-save-type="place" 
                data-save-id="${p.id}"
                title="Bookmark Place"
                onclick="event.stopPropagation(); Auth.toggleSave('place', ${p.id})"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
            <span class="badge ${p.is_open_now ? 'badge-open' : 'badge-closed'}" style="position: absolute; bottom: 12px; right: 12px; background: rgba(255,255,255,0.95); font-weight: 700; box-shadow: var(--shadow-sm); z-index: 2;">
              ${p.is_open_now ? '● Open Now' : 'Closed'}
            </span>
          </div>
          <div class="card-body">
            <div class="card-meta-row" style="margin-bottom: 6px;">
              <span class="badge" style="background: #FFE4E6; color: #BE123C; font-weight: 700;">${p.subcategory_name}</span>
            </div>
            <h3 class="card-title" style="margin-top: 4px; font-size: 1.12rem; font-weight: 700; color: var(--text-main);">${p.name}</h3>
            <div class="card-address" style="font-size: 0.88rem; color: var(--text-muted); margin: 6px 0 12px; line-height: 1.5;">
              📍 ${p.address}
            </div>
            <div class="card-footer" style="padding-top: 12px; border-top: 1px solid var(--border); display: flex; gap: 8px;">
              <a href="tel:${p.phone}" class="btn btn-danger btn-sm" style="flex: 1; justify-content: center;">
                📞 Direct Line
              </a>
              <button class="btn btn-outline btn-sm" onclick="App.openPlaceDetails(${p.id})">
                Details &rarr;
              </button>
            </div>
          </div>
        </div>
      `;
      }).join('');
    } catch (err) {
      console.warn('Error loading essential services:', err);
      container.innerHTML = '<div class="empty-state">Error loading essential services directory</div>';
    }
  },

  // --------------------------------------------------------------------------
  // BUSINESS OWNER PORTAL
  // --------------------------------------------------------------------------
  async loadBusinessDashboard() {
    const container = document.getElementById('business-portal-container');
    if (!container) return;

    const user = window.Auth?.currentUser;
    const role = String(user?.role || '').toLowerCase();
    const isOwner = (role === 'business' || role === 'business_owner');

    if (!user) {
      window.showToast?.('Please sign in with verified merchant credentials to access Business Hub.', 'info');
      window.Router?.navigate('business-login');
      return;
    }

    if (!isOwner) {
      window.showToast?.('Access restricted to verified business owners', 'error');
      window.Router?.navigate('explore');
      return;
    }

    try {
      const res = await fetch('/api/business/dashboard');
      const data = await res.json();

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: gap; gap: 16px;">
          <div>
            <h1 style="font-size: 1.85rem; font-weight: 800;">Owner Dashboard: ${window.Auth.currentUser.business_name || 'My Business Listings'}</h1>
            <p style="color: var(--text-muted);">Manage verified listings and respond to local reviews.</p>
          </div>
          <button class="btn btn-primary" onclick="document.getElementById('add-business-place-modal')?.classList.add('open')">
            + Add New Business Listing
          </button>
        </div>

        <!-- Analytics Stats -->
        <div class="stats-cards-row">
          <div class="stat-card">
            <div class="stat-icon">🏢</div>
            <div>
              <div class="stat-number">${data.stats.total_places}</div>
              <div class="stat-label">Active Listings</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: #EEF2FF; color: var(--secondary);">👁️</div>
            <div>
              <div class="stat-number">${data.stats.total_views}</div>
              <div class="stat-label">Total Profile Views</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: #FEF3C7; color: var(--accent-amber);">💬</div>
            <div>
              <div class="stat-number">${data.stats.total_reviews}</div>
              <div class="stat-label">Customer Reviews</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: #D1FAE5; color: var(--accent-emerald);">★</div>
            <div>
              <div class="stat-number">${data.stats.average_rating}</div>
              <div class="stat-label">Average Score</div>
            </div>
          </div>
        </div>

        <!-- Managed Listings -->
        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 16px;">Your Managed Listings</h3>
        <div class="places-grid" style="margin-bottom: 40px;">
          ${data.places.length > 0 ? data.places.map(p => {
            const coverUrl = this.resolveSpotCoverImage(p);
            const sectorKey = p.category_slug || p.category_name || '';
            const subcatKey = p.subcategory_slug || p.subcategory_name || '';
            return `
            <div class="place-card">
              <div class="card-image-wrap rounded-t-xl relative overflow-hidden h-48 md:h-56">
                <img 
                  src="${coverUrl}" 
                  alt="${p.name}" 
                  class="w-full h-48 md:h-56 object-cover rounded-t-xl transition-all duration-300 hover:scale-105"
                  loading="lazy"
                  onerror="App.handleCardImageError(this, '${sectorKey}', '${subcatKey}')"
                >
                <div class="card-top-badges">
                  <span class="badge badge-verified" style="position: absolute; top: 12px; left: 12px; z-index: 2;">✓ Managed</span>
                  <span class="badge badge-price" style="position: absolute; top: 12px; right: 12px; z-index: 2;">${p.views_count} Views</span>
                </div>
              </div>
              <div class="card-body">
                <h3 class="card-title">${p.name}</h3>
                <div class="card-address">${p.address}</div>
                <div class="card-footer">
                  <button class="btn btn-outline btn-sm" onclick="App.openEditPlaceModal(${p.id})">
                    Edit Profile
                  </button>
                  <button class="btn btn-primary btn-sm" onclick="App.openPlaceDetails(${p.id})">
                    View Public Page
                  </button>
                </div>
              </div>
            </div>
          `;
          }).join('') : '<div class="empty-state" style="grid-column: 1 / -1;">No listings claimed yet. Use the button above to add your first place!</div>'}
        </div>

        <!-- Reviews Management -->
        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 16px;">Customer Reviews Requiring Attention</h3>
        <div class="reviews-list">
          ${data.recent_reviews.length > 0 ? data.recent_reviews.map(r => `
            <div class="review-item">
              <div class="review-header">
                <div>
                  <div style="font-weight: 700;">${r.place_name}</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">${r.user_name} • ★ ${r.rating} • ${r.created_at}</div>
                </div>
              </div>
              <p class="review-comment">${r.comment}</p>
              ${r.business_reply ? `
                <div class="business-reply-box">
                  <div class="business-reply-title">Your Current Official Reply:</div>
                  <div>${r.business_reply}</div>
                </div>
              ` : ''}
              <div style="margin-top: 12px; display: flex; gap: 8px;">
                <input type="text" id="reply-input-${r.id}" class="form-input" placeholder="Write official business reply..." style="padding: 6px 12px; font-size: 0.85rem;" value="${r.business_reply || ''}">
                <button class="btn btn-primary btn-sm" onclick="App.submitBusinessReply(${r.id})">Post Reply</button>
              </div>
            </div>
          `).join('') : '<div class="empty-state">No reviews yet for your listings.</div>'}
        </div>
      `;
    } catch (err) {
      console.warn('Error loading business dashboard:', err);
    }
  },

  async submitBusinessReply(reviewId) {
    const input = document.getElementById(`reply-input-${reviewId}`);
    const reply = input?.value.trim();
    if (!reply) {
      window.showToast('Please type a reply message.', 'error');
      return;
    }

    try {
      const res = await fetch(`/api/business/reviews/${reviewId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply })
      });
      const data = await res.json();
      if (res.ok) {
        window.showToast('Official business reply published.', 'success');
        this.loadBusinessDashboard();
      } else {
        window.showToast(data.error || 'Failed to post reply', 'error');
      }
    } catch (err) {
      window.showToast('Network error posting reply', 'error');
    }
  },

  async createBusinessListing(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('biz-place-name')?.value.trim();
    const city_id = document.getElementById('biz-place-city')?.value;
    const category_slug = document.getElementById('biz-place-category')?.value;
    const address = document.getElementById('biz-place-address')?.value.trim();
    const phone = document.getElementById('biz-place-phone')?.value.trim();
    const price_level = document.getElementById('biz-place-price')?.value || '₹₹';
    const description = document.getElementById('biz-place-desc')?.value.trim();
    const amenities = (document.getElementById('biz-place-amenities')?.value || '').split(',').map(s => s.trim()).filter(Boolean);

    const catObj = this.categories.find(c => c.slug === category_slug);

    if (!name || !address || !catObj) {
      window.showToast('Please complete name, category, and address.', 'error');
      return;
    }

    const cityObj = this.cities.find(c => c.name === city_id) || this.cities[0];

    try {
      const res = await fetch('/api/business/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          city_id: cityObj ? cityObj.id : 1,
          category_id: catObj.id,
          address,
          phone,
          price_level,
          description,
          amenities
        })
      });
      const data = await res.json();
      if (res.ok) {
        window.showToast('Listing added successfully!', 'success');
        document.getElementById('add-business-place-modal')?.classList.remove('open');
        this.loadBusinessDashboard();
        this.loadPlaces();
      } else {
        window.showToast(data.error || 'Failed to create listing', 'error');
      }
    } catch (err) {
      window.showToast('Network error adding listing', 'error');
    }
  },

  // --------------------------------------------------------------------------
  // SAVED ITEMS VIEW
  // --------------------------------------------------------------------------
  async loadSavedItemsView() {
    const container = document.getElementById('saved-items-container');
    if (!container) return;

    if (!window.Auth?.currentUser) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔒</div>
          <div class="empty-state-title">Sign In Required</div>
          <p class="empty-state-desc">Please log in to view your saved places, guides, and questions.</p>
          <button class="btn btn-primary" onclick="Auth.openAuthModal('login')">Sign In</button>
        </div>
      `;
      return;
    }

    try {
      const res = await fetch('/api/auth/saved');
      const data = await res.json();

      container.innerHTML = `
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.85rem; font-weight: 800;">Saved Collection</h1>
          <p style="color: var(--text-muted);">Access your bookmarked spots, local guides, and community discussions.</p>
        </div>

        <div class="auth-tabs" style="margin-bottom: 24px;">
          <button class="auth-tab-btn active" id="saved-tab-places" onclick="App.switchSavedTab('places')">Saved Places (${data.places.length})</button>
          <button class="auth-tab-btn" id="saved-tab-guides" onclick="App.switchSavedTab('guides')">Saved Guides (${data.guides.length})</button>
          <button class="auth-tab-btn" id="saved-tab-questions" onclick="App.switchSavedTab('questions')">Saved Questions (${data.questions.length})</button>
        </div>

        <div id="saved-content-places" class="places-grid">
          ${data.places.length > 0 ? '' : '<div class="empty-state" style="grid-column: 1 / -1;">No saved places yet. Click the bookmark icon on any card to save it!</div>'}
        </div>
        <div id="saved-content-guides" class="guides-grid" style="display: none;">
          ${data.guides.length > 0 ? '' : '<div class="empty-state" style="grid-column: 1 / -1;">No saved guides yet.</div>'}
        </div>
        <div id="saved-content-questions" class="qa-grid" style="display: none;">
          ${data.questions.length > 0 ? '' : '<div class="empty-state" style="grid-column: 1 / -1;">No saved questions yet.</div>'}
        </div>
      `;

      if (data.places.length > 0) {
        this.renderPlacesGrid(data.places, 'saved-content-places');
      }
      if (data.guides.length > 0) {
        document.getElementById('saved-content-guides').innerHTML = data.guides.map(g => `
          <div class="guide-card">
            <div class="guide-cover-wrap"><img src="${g.cover_image}"></div>
            <div class="guide-card-body">
              <h3 class="guide-title">${g.title}</h3>
              <p class="guide-desc">${g.description}</p>
              <button class="btn btn-primary btn-sm" onclick="App.openGuideDetails(${g.id})">View Guide</button>
            </div>
          </div>
        `).join('');
      }
      if (data.questions.length > 0) {
        document.getElementById('saved-content-questions').innerHTML = data.questions.map(q => `
          <div class="qa-card">
            <h3 class="qa-title">${q.title}</h3>
            <p class="qa-body">${q.content}</p>
          </div>
        `).join('');
      }

    } catch (err) {
      console.warn('Error loading saved items:', err);
    }
  },

  switchSavedTab(tab) {
    ['places', 'guides', 'questions'].forEach(t => {
      const btn = document.getElementById(`saved-tab-${t}`);
      const content = document.getElementById(`saved-content-${t}`);
      if (btn) btn.classList.toggle('active', t === tab);
      if (content) content.style.display = t === tab ? (t === 'places' ? 'grid' : 'grid') : 'none';
    });
  },

  // --------------------------------------------------------------------------
  // LOCAL CONTRIBUTOR PORTAL & WORKSPACE
  // --------------------------------------------------------------------------
  contributorActiveTab: 'spots',
  contributorData: {
    spots: [
      { id: 101, name: 'Lakshmana Rao Tiffin Centre', city: 'Tanuku', category: 'Food & Dining', address: 'Old Bus Stand Rd, Tanuku', status: 'Approved & Live', statusClass: 'badge-verified', date: '2026-09-14' },
      { id: 102, name: 'Godavari Ghat Sunrise Walk', city: 'Rajahmundry', category: 'Travel & Stay', address: 'Pushkar Ghat, Rajahmundry', status: 'Approved & Live', statusClass: 'badge-verified', date: '2026-09-20' },
      { id: 103, name: 'Sree Kanya Andhra Mess', city: 'Vijayawada', category: 'Food & Dining', address: 'Governorpet, Vijayawada', status: 'Approved & Live', statusClass: 'badge-verified', date: '2026-09-28' },
      { id: 104, name: 'Subbayya Gari Traditional Sweets', city: 'Hyderabad', category: 'Food & Dining', address: 'Kukatpally, Hyderabad', status: 'Under Community Review', statusClass: 'badge-demo', date: '2026-10-04' }
    ],
    reviews: [
      { id: 201, place_id: 1, place_name: 'Vidyarthi Bhavan', city: 'Bengaluru', rating: 5, comment: 'Crispy ghee masala dosa with signature mint chutney is unbeatable. Come before 8 AM to avoid the rush.', date: '2026-10-01' },
      { id: 202, place_id: 2, place_name: 'Brahmin Coffee Bar', city: 'Bengaluru', rating: 5, comment: 'Steaming hot idlis with authentic filter coffee. Flawless South Indian morning breakfast spot.', date: '2026-10-03' },
      { id: 203, place_id: 3, place_name: 'Shah Ghouse Hotel', city: 'Hyderabad', rating: 4, comment: 'Rich mutton biryani and special irani chai. Great late-night atmosphere.', date: '2026-10-05' }
    ]
  },

  async loadContributorPortal() {
    const container = document.getElementById('contributor-portal-container');
    if (!container) return;

    const user = window.Auth?.currentUser;
    const role = String(user?.role || '').toLowerCase();
    const isContributor = user && (role === 'guide' || role === 'contributor');

    if (!user || !isContributor) {
      container.innerHTML = `
        <div style="background: white; border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 48px 24px; text-align: center; max-width: 680px; margin: 40px auto; box-shadow: var(--shadow-md);">
          <div style="font-size: 3rem; margin-bottom: 12px;">⭐</div>
          <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 8px;">TruSpot Local Contributor Portal</h2>
          <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 24px;">
            Join our community of passionate local guides documenting hidden culinary gems, cultural monuments, and neighborhood secrets across Andhra Pradesh & Karnataka.
          </p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="Auth.quickDemoLogin('guide')">
              ⭐ Quick Log In as Local Contributor (guide@demo.truspot.local)
            </button>
            <button class="btn btn-outline" onclick="Auth.openAuthModal('signup')">
              Create Contributor Account
            </button>
          </div>
        </div>
      `;
      return;
    }

    const currentTab = this.contributorActiveTab || 'spots';
    container.innerHTML = `
      <!-- Contributor Hero Card -->
      <div style="background: linear-gradient(135deg, #064E3B 0%, #065F46 60%, #0F766E 100%); color: white; border-radius: var(--radius-xl); padding: 32px 28px; margin-bottom: 28px; box-shadow: var(--shadow-lg); position: relative; overflow: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px; position: relative; z-index: 1;">
          <div style="display: flex; align-items: center; gap: 18px;">
            <img src="${user.avatar}" alt="${user.name}" style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid #6EE7B7; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
                <h1 style="font-size: 1.75rem; font-weight: 800; color: white; margin: 0;">${user.name}</h1>
                <span class="badge" style="background: #A7F3D0; color: #064E3B; font-weight: 700; font-size: 0.75rem;">Level 4 Master Guide</span>
              </div>
              <p style="color: #D1FAE5; font-size: 0.92rem; margin: 0 0 8px;">${user.city} &bull; TruSpot Verified Local Contributor &bull; Active Member</p>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="badge" style="background: rgba(255,255,255,0.18); color: white; font-size: 0.72rem; border: 1px solid rgba(255,255,255,0.3);">✓ Verified Local Guide</span>
                <span class="badge" style="background: rgba(254, 243, 199, 0.25); color: #FEF3C7; font-size: 0.72rem; border: 1px solid rgba(254, 243, 199, 0.4);">★ Top Reviewer</span>
                <span class="badge" style="background: rgba(224, 231, 255, 0.25); color: #E0E7FF; font-size: 0.72rem; border: 1px solid rgba(224, 231, 255, 0.4);">🗺️ Local Curator</span>
                <span class="badge" style="background: rgba(207, 250, 254, 0.25); color: #CFFAFE; font-size: 0.72rem; border: 1px solid rgba(207, 250, 254, 0.4);">💬 Community Guru</span>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary" style="background: white; color: #065F46; font-weight: 700;" onclick="App.openAddContributorSpotModal()">
              + Submit Local Spot
            </button>
          </div>
        </div>
      </div>

      <!-- Contributor Metrics Row -->
      <div class="stats-cards-row" style="margin-bottom: 28px;">
        <div class="stat-card">
          <div class="stat-icon" style="background: #DCFCE7; color: #166534;">📍</div>
          <div>
            <div class="stat-number">${this.contributorData.spots.length}</div>
            <div class="stat-label">Spots Submitted</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #FEF3C7; color: #92400E;">✍️</div>
          <div>
            <div class="stat-number">${this.contributorData.reviews.length}</div>
            <div class="stat-label">Reviews Authored</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #EEF2FF; color: #3730A3;">🗺️</div>
          <div>
            <div class="stat-number">5</div>
            <div class="stat-label">Curated Guides</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #FCE7F3; color: #9D174D;">❤️</div>
          <div>
            <div class="stat-number">184</div>
            <div class="stat-label">Helpful Upvotes</div>
          </div>
        </div>
      </div>

      <!-- Contributor Navigation Tabs -->
      <div class="auth-tabs" style="margin-bottom: 24px; max-width: 640px;">
        <button type="button" class="auth-tab-btn ${currentTab === 'spots' ? 'active' : ''}" onclick="App.switchContributorTab('spots')">
          📍 Spot Submissions (${this.contributorData.spots.length})
        </button>
        <button type="button" class="auth-tab-btn ${currentTab === 'reviews' ? 'active' : ''}" onclick="App.switchContributorTab('reviews')">
          ✏️ Review Editing (${this.contributorData.reviews.length})
        </button>
        <button type="button" class="auth-tab-btn ${currentTab === 'curation' ? 'active' : ''}" onclick="App.switchContributorTab('curation')">
          🗺️ Community Curation
        </button>
      </div>

      <!-- Tab Content: Spot Submissions -->
      <div id="contrib-tab-spots" style="display: ${currentTab === 'spots' ? 'block' : 'none'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 2px;">Your Contributed Spots & Hidden Gems</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem;">Local places you submitted to TruSpot across AP & Karnataka.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="App.openAddContributorSpotModal()">
            + Submit Another Spot
          </button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-bottom: 32px;">
          ${this.contributorData.spots.map(s => `
            <div style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin: 0;">${s.name}</h4>
                  <span class="badge ${s.statusClass}" style="white-space: nowrap; font-size: 0.7rem;">${s.status}</span>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 4px;">📍 ${s.address}</div>
                <div style="font-size: 0.82rem; color: var(--primary); font-weight: 600;">🏷️ ${s.category} &bull; ${s.city}</div>
              </div>
              <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border); font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
                <span>Submitted: ${s.date}</span>
                <span style="color: var(--primary); font-weight: 600;">Public Live</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab Content: My Reviews & Review Editing -->
      <div id="contrib-tab-reviews" style="display: ${currentTab === 'reviews' ? 'block' : 'none'};">
        <div style="margin-bottom: 16px;">
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 2px;">Your Authored Reviews & Recommendations</h3>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Edit your reviews, adjust ratings, or update your advice for fellow travelers.</p>
        </div>
        <div class="reviews-list" style="margin-bottom: 32px;">
          ${this.contributorData.reviews.map(r => `
            <div class="review-item" id="review-item-${r.id}" style="background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 20px; margin-bottom: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
                <div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; margin: 0 0 2px;">${r.place_name}</h4>
                  <div style="font-size: 0.82rem; color: var(--text-muted);">${r.city} &bull; Reviewed on ${r.date}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 700; font-size: 0.82rem;" id="review-stars-badge-${r.id}">
                    ★ ${r.rating}.0 / 5.0
                  </span>
                  <button class="btn btn-outline btn-sm" onclick="App.editContributorReview(${r.id})" id="edit-btn-${r.id}">
                    ✏️ Edit Review
                  </button>
                </div>
              </div>
              <div id="review-display-${r.id}">
                <p class="review-comment" style="color: #334155; font-size: 0.92rem; line-height: 1.6; margin: 0;">${r.comment}</p>
              </div>
              <div id="review-editor-${r.id}" style="display: none; margin-top: 12px; background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border);">
                <label style="font-size: 0.82rem; font-weight: 700; display: block; margin-bottom: 4px;">Update Rating:</label>
                <select id="edit-rating-input-${r.id}" class="form-input" style="max-width: 140px; margin-bottom: 10px; font-size: 0.85rem; padding: 6px 10px;">
                  <option value="5" ${r.rating === 5 ? 'selected' : ''}>★ ★ ★ ★ ★ (5)</option>
                  <option value="4" ${r.rating === 4 ? 'selected' : ''}>★ ★ ★ ★ ☆ (4)</option>
                  <option value="3" ${r.rating === 3 ? 'selected' : ''}>★ ★ ★ ☆ ☆ (3)</option>
                  <option value="2" ${r.rating === 2 ? 'selected' : ''}>★ ★ ☆ ☆ ☆ (2)</option>
                  <option value="1" ${r.rating === 1 ? 'selected' : ''}>★ ☆ ☆ ☆ ☆ (1)</option>
                </select>
                <label style="font-size: 0.82rem; font-weight: 700; display: block; margin-bottom: 4px;">Update Your Review Text:</label>
                <textarea id="edit-comment-input-${r.id}" class="form-input" rows="3" style="font-size: 0.9rem; line-height: 1.5; margin-bottom: 10px;">${r.comment}</textarea>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-primary btn-sm" onclick="App.saveContributorReview(${r.id})">Save Changes</button>
                  <button class="btn btn-outline btn-sm" onclick="App.cancelEditContributorReview(${r.id})">Cancel</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab Content: Community Curation & Guides -->
      <div id="contrib-tab-curation" style="display: ${currentTab === 'curation' ? 'block' : 'none'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 2px;">Your Curated City Guides</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem;">Guides published to assist explorers discovering local culture.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="Router.navigate('guides')">
            Browse All Community Guides
          </button>
        </div>
        <div class="guides-grid" style="margin-bottom: 32px;">
          <div class="guide-card">
            <div class="guide-cover-wrap">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80">
              <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 6px;">
                <span class="badge badge-verified">Verified Curator</span>
                <span class="badge badge-price">Bengaluru</span>
              </div>
            </div>
            <div class="guide-card-body">
              <h3 class="guide-title">Legendary South Indian Tiffins of Bengaluru</h3>
              <p class="guide-desc">The ultimate morning circuit from crispy Vidyarthi Bhavan benne dosa to Brahmin Coffee Bar filter coffee.</p>
              <div style="font-size: 0.82rem; color: var(--primary); font-weight: 600; margin-bottom: 10px;">
                📍 6 Curated Heritage Spots &bull; 2,840 Views
              </div>
              <button class="btn btn-outline btn-sm" onclick="Router.navigate('guides')">View Guide</button>
            </div>
          </div>
          <div class="guide-card">
            <div class="guide-cover-wrap">
              <img src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80">
              <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 6px;">
                <span class="badge badge-verified">Verified Curator</span>
                <span class="badge badge-price">Rajahmundry</span>
              </div>
            </div>
            <div class="guide-card-body">
              <h3 class="guide-title">Godavari River Heritage & Sunset Spots</h3>
              <p class="guide-desc">Scenic river ghats, boat points, and ancient temples across the Godavari corridor in Rajahmundry.</p>
              <div style="font-size: 0.82rem; color: var(--primary); font-weight: 600; margin-bottom: 10px;">
                📍 5 Curated Spots &bull; 1,920 Views
              </div>
              <button class="btn btn-outline btn-sm" onclick="Router.navigate('guides')">View Guide</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  openAddContributorSpotModal() {
    let modal = document.getElementById('contributor-add-spot-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'contributor-add-spot-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-box" style="max-width: 580px;">
          <button class="modal-close-btn" onclick="document.getElementById('contributor-add-spot-modal').classList.remove('open')">&times;</button>
          <div style="padding: 28px;">
            <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 4px;">Submit New Local Spot</h2>
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 20px;">Share a hidden gem with the TruSpot community across AP & Karnataka.</p>
            <form onsubmit="App.submitContributorSpot(event)">
              <div class="form-group">
                <label class="form-label">Spot / Venue Name</label>
                <input type="text" id="contrib-spot-name" class="form-input" placeholder="e.g. Subba Rao Filter Coffee" required>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label">City</label>
                  <select id="contrib-spot-city" class="form-input">
                    <option value="Tanuku">Tanuku, AP</option>
                    <option value="Rajahmundry">Rajahmundry, AP</option>
                    <option value="Vijayawada">Vijayawada, AP</option>
                    <option value="Hyderabad">Hyderabad, TS</option>
                    <option value="Bengaluru">Bengaluru, KA</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Sector</label>
                  <select id="contrib-spot-category" class="form-input">
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Travel & Stay">Travel & Stay</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Education">Education</option>
                    <option value="Essential Services">Essential Services</option>
                    <option value="Transport & Automotive">Transport & Automotive</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Address / Landmark</label>
                <input type="text" id="contrib-spot-address" class="form-input" placeholder="Street name, landmark, area" required>
              </div>
              <div class="form-group">
                <label class="form-label">Insider Contributor Tip</label>
                <textarea id="contrib-spot-tip" class="form-input" rows="3" placeholder="What must visitors order or know before going?" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Spot for Live Publication</button>
            </form>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.add('open');
  },

  submitContributorSpot(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('contrib-spot-name')?.value.trim();
    const city = document.getElementById('contrib-spot-city')?.value;
    const category = document.getElementById('contrib-spot-category')?.value;
    const address = document.getElementById('contrib-spot-address')?.value.trim();

    if (!name || !address) {
      window.showToast?.('Please fill out spot name and address.', 'error');
      return;
    }

    const newSpot = {
      id: Date.now(),
      name,
      city,
      category,
      address,
      status: 'Approved & Live',
      statusClass: 'badge-verified',
      date: new Date().toISOString().split('T')[0]
    };

    this.contributorData.spots.unshift(newSpot);
    document.getElementById('contributor-add-spot-modal')?.classList.remove('open');
    window.showToast?.(`"${name}" submitted successfully and published!`, 'success');
    this.loadContributorPortal();
  },

  editContributorReview(id) {
    document.getElementById(`review-display-${id}`)?.style.setProperty('display', 'none');
    document.getElementById(`review-editor-${id}`)?.style.setProperty('display', 'block');
    document.getElementById(`edit-btn-${id}`)?.style.setProperty('display', 'none');
  },

  cancelEditContributorReview(id) {
    document.getElementById(`review-display-${id}`)?.style.setProperty('display', 'block');
    document.getElementById(`review-editor-${id}`)?.style.setProperty('display', 'none');
    document.getElementById(`edit-btn-${id}`)?.style.setProperty('display', 'inline-flex');
  },

  saveContributorReview(id) {
    const rating = parseInt(document.getElementById(`edit-rating-input-${id}`)?.value || '5', 10);
    const comment = document.getElementById(`edit-comment-input-${id}`)?.value.trim();

    if (!comment) {
      window.showToast?.('Review text cannot be empty.', 'error');
      return;
    }

    const review = this.contributorData.reviews.find(r => r.id === id);
    if (review) {
      review.rating = rating;
      review.comment = comment;
    }

    window.showToast?.('Review updated successfully!', 'success');
    this.loadContributorPortal();
  },

  switchContributorTab(tab) {
    this.contributorActiveTab = tab;
    this.loadContributorPortal();
  }
};

// Client-side SPA Router with Protected Route Guards
const Router = {
  activeView: 'home',

  init() {
    this.setupNavLinks();
    this.handleRoute();
    window.addEventListener('popstate', () => this.handleRoute());
  },

  setupNavLinks() {
    document.querySelectorAll('[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        this.navigate(route);
      });
    });
  },

  normalizeRoute(routeName) {
    if (!routeName) return 'home';
    let r = String(routeName).trim().replace(/^#\/?/, '').replace(/^\//, '');
    if (r === '' || r === 'index.html') return 'home';
    return r;
  },

  checkRouteAccess(route) {
    const isBusinessProtected = 
      (route === 'business' || 
       (route.startsWith('business/') && route !== 'business/login') ||
       route === 'business-dashboard' ||
       route.startsWith('manage-venue') ||
       route.startsWith('analytics'));

    if (isBusinessProtected) {
      if (!window.Auth?.currentUser) {
        window.showToast?.('Please sign in with verified merchant credentials to access Business Hub.', 'info');
        this.activeView = 'business-login';
        window.history.replaceState({}, '', '#business-login');
        this.updateView();
        return false;
      }

      const role = String(window.Auth.currentUser.role || '').toUpperCase();
      const isOwner = (role === 'BUSINESS' || role === 'BUSINESS_OWNER');

      if (!isOwner) {
        // Active session with role 'EXPLORER' or 'GUIDE'
        window.showToast?.('Access restricted to verified business owners', 'error');
        this.activeView = 'explore';
        window.history.replaceState({}, '', '#explore');
        this.updateView();
        return false;
      }
    }

    return true;
  },

  navigate(routeName) {
    const normalized = this.normalizeRoute(routeName);
    if (!this.checkRouteAccess(normalized)) {
      return;
    }

    this.activeView = normalized;
    window.history.pushState({}, '', `#${normalized}`);
    this.updateView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  handleRoute() {
    const route = this.getRequestedRoute();
    if (!this.checkRouteAccess(route)) {
      return;
    }
    this.activeView = route;
    this.updateView();
  },

  getRequestedRoute() {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (hash) return this.normalizeRoute(hash);

    const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').trim();
    if (path && path !== 'index.html') {
      return this.normalizeRoute(path);
    }
    return 'home';
  },

  updateView() {
    document.querySelectorAll('.app-view').forEach(view => {
      view.style.display = 'none';
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-route') === this.activeView);
    });

    document.querySelectorAll('.mobile-nav-item').forEach(item => item.classList.remove('active'));
    if (this.activeView === 'home' || !this.activeView) {
      document.getElementById('mob-nav-home')?.classList.add('active');
    } else if (this.activeView === 'explore') {
      document.getElementById('mob-nav-explore')?.classList.add('active');
    } else if (this.activeView === 'saved') {
      document.getElementById('mob-nav-saved')?.classList.add('active');
    } else if (this.activeView === 'contributor-portal' || this.activeView === 'contributor') {
      document.getElementById('mob-nav-contribute')?.classList.add('active');
    }

    let viewId = `view-${this.activeView}`;
    if (this.activeView === 'business-login' || this.activeView === 'business/login') {
      viewId = 'view-business-login';
    } else if (this.activeView === 'contributor-portal' || this.activeView === 'contributor') {
      viewId = 'view-contributor-portal';
    } else if (this.activeView === 'business' || this.activeView.startsWith('business/') || this.activeView.startsWith('manage-venue') || this.activeView.startsWith('analytics')) {
      viewId = 'view-business';
    }

    const activeViewElem = document.getElementById(viewId);
    if (activeViewElem) {
      activeViewElem.style.display = 'block';
    } else {
      document.getElementById('view-home').style.display = 'block';
    }

    // Trigger view-specific loads
    if (this.activeView === 'explore') {
      window.App.loadPlaces(window.SearchEngine?.currentQuery || '');
      setTimeout(() => window.TruMap?.mapInstance?.invalidateSize(), 300);
    } else if (this.activeView === 'education') {
      window.App.loadEducationPlaces();
    } else if (this.activeView === 'ask-locals') {
      window.App.loadQuestions();
    } else if (this.activeView === 'guides') {
      window.App.loadGuides();
    } else if (this.activeView === 'essential') {
      window.App.loadEssentialServices();
    } else if (viewId === 'view-business') {
      window.App.loadBusinessDashboard();
    } else if (viewId === 'view-contributor-portal') {
      window.App.loadContributorPortal();
    } else if (this.activeView === 'saved') {
      window.App.loadSavedItemsView();
    }
  }
};

window.Router = Router;
window.App = App;

document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});

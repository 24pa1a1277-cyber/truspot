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
    homestays: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
    'tourist-places': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    attractions: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    parks: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    temples: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    museums: 'https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=800&q=80',
    'weekend-getaways': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    'travel-agencies': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    // Aliases
    hotel: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    resort: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    lodge: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    homestay: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
    attraction: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    park: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    temple: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    museum: 'https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=800&q=80'
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

};
module.exports = { SECTOR_COVER_IMAGES, App };
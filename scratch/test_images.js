const fs = require('fs');

const content = fs.readFileSync('frontend/js/app.js', 'utf8');

// Simple regex extraction or evaluating the object
const SECTOR_START = content.indexOf('const SECTOR_COVER_IMAGES = {');
const SECTOR_END = content.indexOf('const App = {');
const APP_START = content.indexOf('const App = {');
const APP_END = content.indexOf('  async init()');

const scriptCode = content.slice(SECTOR_START, SECTOR_END) + '\n' +
  content.slice(APP_START, APP_END) + '};\n' +
  'module.exports = { SECTOR_COVER_IMAGES, App };';

fs.writeFileSync('scratch/extracted_app.js', scriptCode);
const { SECTOR_COVER_IMAGES, App } = require('./extracted_app.js');

const spots = [
  { name: 'Pure Veg Meals', category: 'Food & Dining', subcategory: 'Vegetarian' },
  { name: 'Traditional Thali Center', category: 'food-dining', subcategory: 'Traditional Thali' },
  { name: 'Artisan Cafe', category: 'Food & Dining', subcategory: 'Cafes' },
  { name: 'Sourdough Bakehouse', category: 'food-dining', subcategory: 'Bakeries' },
  { name: 'Smashed Burger Joint', category: 'Food & Dining', subcategory: 'Fast Food' },
  { name: 'Evening Chaat Stalls', category: 'food-dining', subcategory: 'Street Food' },
  { name: 'Green Harvest Bowls', category: 'Food & Dining', subcategory: 'Vegan' },
  { name: 'Patisserie Delights', category: 'food-dining', subcategory: 'Desserts' },
  { name: 'Artisan Gelato Bar', category: 'Food & Dining', subcategory: 'Ice Cream' },
  { name: 'Grand Family Seating', category: 'food-dining', subcategory: 'Family Dining' },
  { name: 'Candlelit Luxury Dine', category: 'Food & Dining', subcategory: 'Fine Dining' },
  { name: 'Eco Cloud Kitchen', category: 'food-dining', subcategory: 'Food Delivery' },
  { name: 'General Multicuisine', category: 'Food & Dining', subcategory: 'Restaurants' },
  { name: 'Custom Venue', category: 'food-dining', subcategory: 'Restaurants', imageUrl: 'https://my-venue-photo.jpg' },
  { name: 'Cover Venue', category: 'food-dining', subcategory: 'Cafes', cover_image: 'https://my-cover-photo.jpg' },
  { name: 'Unmapped Dining', category: 'food-dining', subcategory: 'Mysterious Dining' }
];

console.log('--- TEST RESULTS ---');
spots.forEach(s => {
  const resolved = App.resolveSpotCoverImage(s);
  console.log(`${s.subcategory.padEnd(20)} | ${s.imageUrl || s.cover_image ? 'VENUE-SPECIFIC' : 'SUBCATEGORY'} | ${resolved.slice(0, 60)}...`);
});

// places.js - Locations, Vehicles, Simple Fare Map & Notifications

// ----- VEHICLES -----
const VEHICLES = [
  { id: 'auto',  name: 'Auto Rickshaw', enabled: true },
  { id: 'bike',  name: 'Bike Taxi',     enabled: true },
  { id: 'sedan', name: 'Sedan',         enabled: false },
  { id: 'suv',   name: 'SUV',           enabled: false }
];

function getVehicleImg(id) {
  const imgs = { auto:'🛺', bike:'🛵', sedan:'🚗', suv:'🚙' };
  return imgs[id] || '🚕';
}

// ----- LOCATIONS (each has two image URLs) -----
const LOCATIONS = [
  { id: 'mgroad',       name: 'MG Road',       caption: 'City Center',  emoji: '🏙️', imgs: ['https://picsum.photos/id/104/400/200','https://picsum.photos/id/106/400/200'] },
  { id: 'indiranagar',  name: 'Indiranagar',   caption: 'Metro Station',emoji: '🚇', imgs: ['https://picsum.photos/id/91/400/200','https://picsum.photos/id/92/400/200'] },
  { id: 'koramangala',  name: 'Koramangala',   caption: 'Tech Hub',    emoji: '💻', imgs: ['https://picsum.photos/id/96/400/200','https://picsum.photos/id/97/400/200'] },
  { id: 'whitefield',   name: 'Whitefield',    caption: 'ITPL',        emoji: '🏢', imgs: ['https://picsum.photos/id/20/400/200','https://picsum.photos/id/21/400/200'] },
  { id: 'yeshwanthpur', name: 'Yeshwanthpur',  caption: 'Railway Stn', emoji: '🚂', imgs: ['https://picsum.photos/id/15/400/200','https://picsum.photos/id/16/400/200'] },
  { id: 'jpnagar',      name: 'JP Nagar',      caption: 'Shopping',    emoji: '🛍️', imgs: ['https://picsum.photos/id/26/400/200','https://picsum.photos/id/27/400/200'] }
];

// ----- SIMPLE FARE (from, to, vehicle) -> price -----
// Format: `${fromId}_${toId}_${vehicleId}` → ₹ amount
const FARE_MAP = {
  // Auto fares
  'mgroad_indiranagar_auto': 45,  'indiranagar_mgroad_auto': 45,
  'mgroad_koramangala_auto': 60,  'koramangala_mgroad_auto': 60,
  'mgroad_whitefield_auto': 85,   'whitefield_mgroad_auto': 85,
  'indiranagar_koramangala_auto': 50, 'koramangala_indiranagar_auto': 50,
  'indiranagar_whitefield_auto': 70,  'whitefield_indiranagar_auto': 70,
  'koramangala_whitefield_auto': 75,  'whitefield_koramangala_auto': 75,
  'mgroad_yeshwanthpur_auto': 55, 'yeshwanthpur_mgroad_auto': 55,
  'koramangala_jpnagar_auto': 40, 'jpnagar_koramangala_auto': 40,
  // Bike fares (cheaper)
  'mgroad_indiranagar_bike': 30,  'indiranagar_mgroad_bike': 30,
  'mgroad_koramangala_bike': 40,  'koramangala_mgroad_bike': 40,
  'indiranagar_koramangala_bike': 35, 'koramangala_indiranagar_bike': 35,
  'indiranagar_whitefield_bike': 50,  'whitefield_indiranagar_bike': 50,
  'koramangala_whitefield_bike': 55,  'whitefield_koramangala_bike': 55,
  // Sedan (premium)
  'mgroad_indiranagar_sedan': 80,  'indiranagar_mgroad_sedan': 80,
  'mgroad_koramangala_sedan': 100, 'koramangala_mgroad_sedan': 100,
  // SUV
  'mgroad_indiranagar_suv': 110,   'indiranagar_mgroad_suv': 110,
  'mgroad_koramangala_suv': 130,   'koramangala_mgroad_suv': 130
};

function getFare(fromId, toId, vehicleId) {
  const key = `${fromId}_${toId}_${vehicleId}`;
  if(FARE_MAP[key]) return FARE_MAP[key];
  // fallback default fares per vehicle
  const defaults = { auto: 50, bike: 35, sedan: 90, suv: 120 };
  return defaults[vehicleId] || 50;
}

// ----- NOTIFICATIONS -----
const NOTIFICATIONS = [
  { id: 'welcome', title: 'Welcome to XOS.GO!', desc: 'First ride code: WELCOME10', img: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' },
  { id: 'festive', title: '🎉 Weekend Offer', desc: '20% off on all rides.', img: 'https://cdn-icons-png.flaticon.com/512/2801/2801423.png' }
];

window.VEHICLES = VEHICLES;
window.LOCATIONS = LOCATIONS;
window.NOTIFICATIONS = NOTIFICATIONS;
window.getFare = getFare;
window.getVehicleImg = getVehicleImg;

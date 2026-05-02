/* ═══════════════════════════════════════════════════════════════
   POSTS.JS  —  XOS Content Data
   
   Each post has:
     notify: true  → appears in XOS.GO notifications (if user follows)
     notify: false → only appears in profile page grid, NOT notifications

   Profile page grid shows ALL posts regardless of notify flag.
   Notifications panel shows ONLY posts where notify === true.
═══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════
   PROFILE POSTS
   (rendered in profile.html grid)
   ALL posts show here — notify flag irrelevant for profile
══════════════════════════════════════ */
const GITHUB_POST_FILES = [
  {
    id: 'post_001',
    files: ["file_00000000862871fab1161995ce9f104e.png", "XOS_STAMP_1776237339190.png"],
    type: "image",
    caption: "Deep logic toggle.",
    notify: true   // ← this post appears in notifications too
  },
  {
    id: 'post_002',
    files: ["lv_7587788892909276421_20260417222425.mp4"],
    type: "video",
    caption: "✨✨",
    notify: false  // ← profile only, NOT in notifications
  }
];


/* ══════════════════════════════════════
   NOTIFICATIONS
   (rendered in XOS.GO notification panel)
   Only posts with notify: true appear here
══════════════════════════════════════ */
const NOTIFICATIONS = GITHUB_POST_FILES
  .filter(p => p.notify === true)
  .map(p => ({
    id: p.id,
    notify: true,
    // Thumbnail: first file for images, poster frame path for video
    img: p.type === 'video'
      ? (p.poster || p.files[0])   // use poster if set, else video file (fallback)
      : p.files[0],
    title: 'x0s tech posted',
    desc: p.caption || '',
    type: p.type,
    // For video notifications, we flag so XOS.GO can show a play badge
    isVideo: p.type === 'video',
  }));


/* ══════════════════════════════════════
   VEHICLES
   (used by XOS.GO ride selector)
══════════════════════════════════════ */
const VEHICLES = [
  { id: 'auto',  name: 'Auto',  enabled: true  },
  { id: 'bike',  name: 'Bike',  enabled: false  },
  { id: 'cab',   name: 'Cab',   enabled: false  },
  { id: 'bus',   name: 'Bus',   enabled: false  },
];

function getVehicleImg(id) {
  const map = { auto: 'wauto.png', bike: 'wbike.png', cab: 'wcab.png', bus: 'wbus.png' };
  return map[id] || 'wauto.png';
}


/* ══════════════════════════════════════
   LOCATIONS
   (used by XOS.GO location/destination selectors)
══════════════════════════════════════ */
const LOCATIONS = [
  {
    id: 'bus_stand',
    name: 'Bus Stand',
    caption: 'Central hub',
    imgs: ['loc_busstand_a.jpg', 'loc_busstand_b.jpg']
  },
  {
    id: 'market',
    name: 'Main Market',
    caption: 'Shopping district',
    imgs: ['loc_market_a.jpg', 'loc_market_b.jpg']
  },
  {
    id: 'hospital',
    name: 'Hospital',
    caption: 'Medical centre',
    imgs: ['loc_hospital_a.jpg', 'loc_hospital_b.jpg']
  },
  {
    id: 'school',
    name: 'School Zone',
    caption: 'Education area',
    imgs: ['loc_school_a.jpg', 'loc_school_b.jpg']
  },
  {
    id: 'temple',
    name: 'Temple Road',
    caption: 'Heritage area',
    imgs: ['loc_temple_a.jpg', 'loc_temple_b.jpg']
  },
  {
    id: 'railway',
    name: 'Railway Station',
    caption: 'Train connectivity',
    imgs: ['loc_railway_a.jpg', 'loc_railway_b.jpg']
  },
];


/* ══════════════════════════════════════
   FARE CALCULATOR
   (used by XOS.GO confirm page)
══════════════════════════════════════ */
const FARE_TABLE = {
  'bus_stand-market':   25,
  'bus_stand-hospital': 35,
  'bus_stand-school':   30,
  'bus_stand-temple':   40,
  'bus_stand-railway':  50,
  'market-hospital':    20,
  'market-school':      25,
  'market-temple':      30,
  'market-railway':     45,
  'hospital-school':    20,
  'hospital-temple':    25,
  'hospital-railway':   40,
  'school-temple':      20,
  'school-railway':     35,
  'temple-railway':     30,
};

const VEHICLE_MULTIPLIER = { auto: 1.0, bike: 0.7, cab: 1.8, bus: 0.4 };

function getFare(fromId, toId, vehicle) {
  const key = [fromId, toId].sort().join('-');
  const base = FARE_TABLE[key] || 30;
  const mult = VEHICLE_MULTIPLIER[vehicle] || 1;
  return Math.round(base * mult);
}

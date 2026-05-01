const CACHE_NAME = 'xos-go-v1';
const ASSETS = [
  './',
  './index.html',
  './logo.png',
  './wallpaper.jpg',
  './users.js',
  './places.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

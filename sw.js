const CACHE_NAME = 'hamza-portfolio-v1';

// Static local assets to pre-cache immediately
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './images/HG.png',
  './images/HG.svg',
  './images/imgHamza.png',
  './images/imgLeon.png',
  './images/imgNote.png',
  './images/imgPortfolio.png',
  './images/imgQuran.png',
  './images/imgResturant.png',
  './images/Services.png',
  './Audio/Quran.mp3',
  './manifest.json'
];

// Install Event: Pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache First with Network Fallback & Runtime Caching
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip form submissions or external API requests (e.g., Web3Forms)
  if (event.request.url.includes('api.web3forms.com')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cache hit immediately
        return cachedResponse;
      }

      // If not in cache, fetch from network and dynamically cache it
      return fetch(event.request)
        .then((networkResponse) => {
          // Check for valid response (or opaque response for CDNs like fonts/fa)
          if (
            networkResponse &&
            (networkResponse.status === 200 || networkResponse.type === 'opaque')
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If network failed and navigating to a page, fallback to index.html
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});

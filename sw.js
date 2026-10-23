const CACHE_NAME = 'hamza-portfolio-v2';

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
  './manifest.json',
  // CDN Stylesheets & Webfonts so they work completely offline:
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/fonts/bootstrap-icons.woff2?223121516f406b0b0200e47dafaef02c',
  'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playwrite+DE+SAS:wght@300&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik+Storm&display=swap'
];

// Install Event: Pre-cache static assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use map with Promise.allSettled so if one external font fails, the rest still cache
      return Promise.allSettled(
        STATIC_ASSETS.map((url) => {
          return fetch(url, { mode: 'cors' })
            .catch(() => fetch(url, { mode: 'no-cors' }))
            .then((res) => cache.put(url, res))
            .catch((err) => console.warn('Could not pre-cache:', url, err));
        })
      );
    })
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
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not in cache, fetch from network and dynamically cache it
      return fetch(event.request)
        .then((networkResponse) => {
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
          // Fallback to index.html for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});

// ==========================================
// AP Schools PWA - Offline Caching Service Worker
// An initiative of @VALIASS team
// ==========================================

const CACHE_NAME = 'apschools-v2.6-cache';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',
  '/js/app.js',
  '/assets/emblem.png',
  '/assets/favicon.ico',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/model-school.jpg',
  '/pages/setup.html',
  '/pages/login.html',
  '/pages/dashboard.html',
  '/pages/ediary.html',
  '/pages/announcement.html',
  '/pages/mdm-cook.html',
  '/pages/reports.html',
  '/pages/reset.html'
];

// Install Event - Caching core static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened AP Schools cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old AP Schools cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Serve from cache first, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Fallback for offline navigation if needed
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

const cacheName = 'starship-console-v1';
const assets = [
  './',
  './index.html',
  './stars.json',
  './manifest.json',
  './icon-512.png',
  'https://unpkg.com/three@0.160.0/build/three.module.js'
];

// Install the Service Worker and cache all files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('LCARS Memory Bank: Caching System Files');
      return cache.addAll(assets);
    })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch files from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
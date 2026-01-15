const cacheName = 'starship-console-v39';
const assets = [
  './',
  './index.html',
  './stars.json',
  './manifest.json',
  './icon-512.png',
  './icon-192.png',
  'https://unpkg.com/three@0.160.0/build/three.module.js'
];

// 1. Install: Caches the core system files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('LCARS Memory Bank: Caching System Files...');
      return cache.addAll(assets);
    })
  );
});

// 2. Activate: Purges old cache versions so updates actually show up
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => {
            console.log('LCARS: Purging outdated cache sector...');
            return caches.delete(key);
        })
      );
    })
  );
});

// 3. Fetch: Serves files from cache for instant offline access
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
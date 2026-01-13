const cacheName = 'starship-v1';
const assets = ['./', './index.html', 'https://unpkg.com/three@0.160.0/build/three.module.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
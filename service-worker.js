const CACHE_NAME = "dialer-final-v3";

const urlsToCache = [
  "/dialer/",
  "/dialer/index.html",
  "/dialer/manifest.json",
  "/dialer/icon.png"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 force update immediately

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🔥 delete old cache
          }
        })
      );
    })
  );

  self.clients.claim(); // take control immediately
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});

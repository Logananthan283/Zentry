const CACHE_NAME = "zentry-cache-v1";
const urlsToCache = [
  "/",
  "/Add_Credit_Transaction.html",
  "/Add_EMI.html",
  "/Add_Transaction.html",
  "/Edit_EMI.html",
  "/Edit_Transaction.html",
  "/Header.html",
  "/index.html",
  "/Pay_EMI.html",
  "/Set_Balance.html",
  "/View_EMI.html",
  "/View_Transaction.html",
  "/assets/images/logo.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/upload.svg",
  "/icons/delete.svg",
  "/icons/download.svg",
  "/icons/pay.svg",
  "/icons/edit.svg"
];

// Install event: cache all necessary files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event: clean up old caches if any
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: serve from cache or fetch online
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Optionally return fallback content here
        })
      );
    })
  );
});

// public/service-worker.js

// Version du cache
const CACHE_NAME = 'zak-sport-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.jpeg', // Le logo du site
  '/manifest.json',
  // Ajoutez ici d'autres assets critiques qui doivent être mis en cache
  // comme les CSS, JS (qui sont souvent générés et ont des noms hashés)
  // Pour l'instant, on se contente du minimum
];

// Installation du Service Worker et mise en cache des assets statiques
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interception des requêtes réseau (stratégie "cache-first" ou "network-first" basique)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si la ressource est dans le cache, on la renvoie
        if (response) {
          return response;
        }
        // Sinon, on va chercher la ressource sur le réseau
        return fetch(event.request);
      })
  );
});

// Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

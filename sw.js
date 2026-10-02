/**
 * sw.js — service worker for the Hemal Das portfolio.
 * Caches visited pages and assets so the site keeps working offline and
 * serves offline.html when a page has never been visited while offline.
 * Author: Hemal Das · Last updated: October 2026
 */
'use strict';

var CACHE_NAME = 'hd-portfolio-v1';
var OFFLINE_URL = './offline.html';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) { return cache.add(OFFLINE_URL); })
            .then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(keys
                    .filter(function (key) { return key !== CACHE_NAME; })
                    .map(function (key) { return caches.delete(key); }));
            })
            .then(function () { return self.clients.claim(); })
    );
});

self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (request.method !== 'GET') return;

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(function (response) {
                    var copy = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
                    return response;
                })
                .catch(function () {
                    return caches.match(request).then(function (cached) {
                        return cached || caches.match(OFFLINE_URL);
                    });
                })
        );
        return;
    }

    if (new URL(request.url).origin === self.location.origin) {
        event.respondWith(
            caches.match(request).then(function (cached) {
                if (cached) return cached;
                return fetch(request).then(function (response) {
                    if (response && response.status === 200) {
                        var copy = response.clone();
                        caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
                    }
                    return response;
                });
            })
        );
    }
});

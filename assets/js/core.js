/**
 * core.js — shared behaviour for every page of the Hemal Das portfolio.
 * Handles: loading screen (3–5s), mobile nav, scroll state, offline
 * detection, service worker, live Dhaka clock and reveal-on-scroll.
 * Author: Hemal Das · Last updated: October 2026
 */
(function () {
    'use strict';

    var CORE_URL = document.currentScript && document.currentScript.src;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --- Loading screen: visible 3s minimum, 5s maximum --- */
    var startTime = Date.now();
    var preloader = document.getElementById('preloader');
    var preloaderHidden = false;

    function hidePreloader() {
        if (preloaderHidden) return;
        var remaining = Math.max(0, 3000 - (Date.now() - startTime));
        if (reducedMotion) remaining = 0;
        setTimeout(function () {
            if (preloaderHidden) return;
            preloaderHidden = true;
            if (preloader) preloader.classList.add('is-hidden');
            document.documentElement.classList.remove('preloading');
        }, remaining);
    }

    if (document.readyState === 'complete') hidePreloader();
    else window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 5000);
    var hamburger = document.querySelector('.hamburger');
    var navMenu = document.querySelector('.nav-menu');

    function closeMenu() {
        if (!navMenu || !hamburger) return;
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            var open = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) closeMenu();
        });
    }
    var nav = document.querySelector('.main-nav');
    var scrollTicking = false;

    function updateNavState() {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
        scrollTicking = false;
    }

    if (nav) {
        window.addEventListener('scroll', function () {
            if (scrollTicking) return;
            scrollTicking = true;
            requestAnimationFrame(updateNavState);
        }, { passive: true });
        updateNavState();
    }

    /* --- Offline banner + service worker (hosted sites only) --- */
    var offlineToast = document.getElementById('offlineToast');

    function showConnectionState(online) {
        if (offlineToast) offlineToast.classList.toggle('show', !online);
    }

    window.addEventListener('offline', function () { showConnectionState(false); });
    window.addEventListener('online', function () { showConnectionState(true); });
    if (navigator.onLine === false) showConnectionState(false);

    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && CORE_URL) {
        navigator.serviceWorker.register(new URL('../../sw.js', CORE_URL).href).catch(function () {});
    }
    var dhakaClock = document.getElementById('dhakaClock');
    var contactTime = document.getElementById('currentTime');

    function tickClock() {
        var now = new Date();
        if (dhakaClock) {
            dhakaClock.textContent = now.toLocaleTimeString('en-GB', {
                timeZone: 'Asia/Dhaka',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
        if (contactTime) {
            contactTime.textContent = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Dhaka',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
        }
    }

    if (dhakaClock || contactTime) {
        tickClock();
        setInterval(tickClock, 1000);
    }

    /* --- Shared reveal-on-scroll helper (GPU-only transform/opacity) --- */
    window.hdReveal = function (elements, stepDelay) {
        if (!elements || !elements.length) return;
        if (!('IntersectionObserver' in window) || reducedMotion) {
            elements.forEach(function (el) { el.classList.add('reveal-ready', 'revealed'); });
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var step = parseInt(el.getAttribute('data-reveal-step') || '0', 10);
                setTimeout(function () { el.classList.add('revealed'); }, step * (stepDelay || 0));
                observer.unobserve(el);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        elements.forEach(function (el) {
            el.classList.add('reveal-ready');
            observer.observe(el);
        });
    };
}());

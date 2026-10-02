/**
 * script.js — projects page entrance reveals. Repository cards, stats
 * and filters are built by assets/js/github-live.js in realtime.
 * Author: Hemal Das · Last updated: October 2026
 */
(function () {
    'use strict';

    var targets = document.querySelectorAll('.section-header, .github-stats, .filter-container');
    if (targets.length) {
        window.hdReveal(Array.prototype.slice.call(targets));
    }
}());

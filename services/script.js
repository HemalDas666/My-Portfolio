/**
 * script.js — services page entrance animations for cards, features,
 * tech items and process steps. Shared behaviour lives in core.js.
 * Author: Hemal Das · Last updated: October 2026
 */
(function () {
    'use strict';

    var revealTargets = document.querySelectorAll('.section-header, .service-card, .feature, .tech-item');
    if (revealTargets.length) {
        window.hdReveal(Array.prototype.slice.call(revealTargets), 90);
    }

    var steps = document.querySelectorAll('.step');
    steps.forEach(function (step, index) {
        step.classList.add('reveal-ready');
        step.setAttribute('data-reveal-step', String(index + 1));
    });
    if (steps.length) {
        window.hdReveal(Array.prototype.slice.call(steps), 180);
    }
}());

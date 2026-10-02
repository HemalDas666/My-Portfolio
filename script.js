/**
 * script.js — home page behaviour: hero typing effect and entrance
 * reveals. Nav, preloader, clock and offline handling live in core.js.
 * Author: Hemal Das · Last updated: October 2026
 */
(function () {
    'use strict';

    var subtitle = document.querySelector('.home-text h2');
    if (subtitle) {
        var fullText = subtitle.textContent;
        var charIndex = 0;
        subtitle.textContent = '';

        function typeHero() {
            if (charIndex < fullText.length) {
                subtitle.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeHero, 70);
            }
        }

        window.addEventListener('load', function () {
            setTimeout(typeHero, 3200);
        });
    }

    var homeContent = document.querySelector('.home-content');
    if (homeContent) {
        window.hdReveal([homeContent]);
    }
}());

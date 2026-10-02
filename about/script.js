/**
 * script.js — about page behaviour: typewriter headline, animated skill
 * bars and entrance reveals. Shared nav/preloader logic lives in core.js.
 * Author: Hemal Das · Last updated: October 2026
 */
(function () {
    'use strict';

    var words = [
        'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express',
        'Django', 'REST APIs', 'MongoDB', 'MySQL', 'PostgreSQL', 'Git',
        'Tailwind CSS', 'Firebase', 'HTML', 'CSS', 'Squarespace', 'Full Stack'
    ];

    var typingText = document.querySelector('.typing-text');
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingTimer = null;

    function typeEffect() {
        if (!typingText) return;
        var currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingTimer = setTimeout(typeEffect, 1800);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingTimer = setTimeout(typeEffect, 400);
        } else {
            typingTimer = setTimeout(typeEffect, isDeleting ? 45 : 95);
        }
    }

    if (typingText) {
        typingTimer = setTimeout(typeEffect, 3400);
        document.addEventListener('visibilitychange', function () {
            if (document.hidden && typingTimer) clearTimeout(typingTimer);
            else if (!document.hidden) typingTimer = setTimeout(typeEffect, 300);
        });
    }

    var skillBars = document.querySelectorAll('.progress');
    var skillsSection = document.querySelector('.skills-container');

    function animateSkillBars() {
        skillBars.forEach(function (bar) {
            var target = bar.style.width;
            bar.style.width = '0';
            setTimeout(function () { bar.style.width = target; }, 120);
        });
    }

    if (skillsSection && 'IntersectionObserver' in window) {
        var skillsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        skillsObserver.observe(skillsSection);
    }

    var aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        window.hdReveal([aboutContent]);
    }
}());

/**
 * script.js — contact page behaviour: FormSubmit AJAX handler, FAQ
 * accordion, file picker feedback and entrance reveals. Clock and nav
 * logic are shared through core.js.
 * Author: Hemal Das · Last updated: October 2026
 */
(function () {
    'use strict';

    var contactForm = document.getElementById('contactForm');
    var submitBtn = document.getElementById('submitBtn');
    var formStatus = document.getElementById('formStatus');

    function showStatus(type, message) {
        if (!formStatus) return;
        formStatus.className = 'form-status ' + type;
        formStatus.style.display = 'block';
        formStatus.innerHTML = message;
        setTimeout(function () { formStatus.style.display = 'none'; }, 6000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

            var formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
                .then(function (response) {
                    if (!response.ok) throw new Error('Failed to send');
                    contactForm.reset();
                    showStatus('success', '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.');
                })
                .catch(function () {
                    showStatus('error', '<i class="fas fa-exclamation-circle"></i> Failed to send. Please email me directly at dashemal08@gmail.com');
                })
                .finally(function () {
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                });
        });
    }

    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', function () {
            faqItems.forEach(function (other) {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    var fileInput = document.getElementById('attachment');
    var fileLabel = document.querySelector('.file-label');
    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', function (event) {
            var fileName = event.target.files[0] && event.target.files[0].name;
            if (fileName) {
                fileLabel.textContent = '📎 ' + fileName;
                fileLabel.style.color = '#ffd700';
            } else {
                fileLabel.textContent = 'Choose file or drag here';
                fileLabel.style.color = 'rgba(255, 255, 255, 0.5)';
            }
        });
    }

    var revealTargets = document.querySelectorAll('.section-header, .method-card, .social-card, .faq-item, .form-container');
    if (revealTargets.length) {
        window.hdReveal(Array.prototype.slice.call(revealTargets), 80);
    }
}());

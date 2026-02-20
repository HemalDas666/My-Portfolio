// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active link highlighting
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || 
        (currentPath.includes('/contact/') && linkPath.includes('/contact/'))) {
        link.classList.add('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 15, 30, 0.98)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.08)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner"></i>';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Using FormSubmit.co service
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                contactForm.reset();
                
                // Reset after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                // Error
                throw new Error('Failed to send');
            }
        } catch (error) {
            // Show error
            formStatus.className = 'form-status error';
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send. Please email me directly at dashemal08@gmail.com';
            
            // Reset after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        } finally {
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        }
    });
}

// Display current time in user's timezone
function updateTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZoneName: 'short'
        };
        timeElement.textContent = now.toLocaleTimeString('en-US', options);
    }
}

updateTime();
setInterval(updateTime, 60000); // Update every minute

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// File input enhancement
const fileInput = document.getElementById('attachment');
const fileLabel = document.querySelector('.file-label');

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const fileName = e.target.files[0]?.name;
        if (fileName) {
            fileLabel.textContent = `📎 ${fileName}`;
            fileLabel.style.color = '#ffd700';
        } else {
            fileLabel.textContent = 'Choose file or drag here';
            fileLabel.style.color = 'rgba(255, 255, 255, 0.5)';
        }
    });
}

// Form validation with visual feedback
const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');

formInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.style.borderColor = '#ff4444';
    });
    
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.style.borderColor = 'rgba(255, 215, 0, 0.2)';
        }
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="/"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '/') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.method-card, .social-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Form validation function
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');
    
    let isValid = true;
    
    // Name validation
    if (name.value.trim().length < 2) {
        name.style.borderColor = '#ff4444';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.style.borderColor = '#ff4444';
        isValid = false;
    }
    
    // Message validation
    if (message.value.trim().length < 10) {
        message.style.borderColor = '#ff4444';
        isValid = false;
    }
    
    // Consent validation
    if (!consent.checked) {
        consent.style.outline = '2px solid #ff4444';
        setTimeout(() => {
            consent.style.outline = 'none';
        }, 2000);
        isValid = false;
    }
    
    return isValid;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Contact page loaded!');
    
    // Set default hidden fields for FormSubmit
    const form = document.getElementById('contactForm');
    if (form) {
        // Add timestamp
        const timestamp = new Date().toISOString();
        const timeInput = document.createElement('input');
        timeInput.type = 'hidden';
        timeInput.name = '_timestamp';
        timeInput.value = timestamp;
        form.appendChild(timeInput);
    }
    
    // Animate header
    const header = document.querySelector('.section-header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Export form data (optional - for debugging)
window.contactFormData = {
    email: 'dashemal08@gmail.com',
    formService: 'FormSubmit.co'
};


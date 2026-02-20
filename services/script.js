// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active link highlighting
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || 
        (currentPath.includes('/services/') && linkPath.includes('/services/'))) {
        link.classList.add('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 15, 30, 0.98)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.08)';
    }
});

// Smooth scroll for home link
document.querySelectorAll('a[href="/"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Close menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Animate service cards on scroll
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

document.querySelectorAll('.service-card, .feature, .tech-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Service card hover sound effect (optional - just for fun)
// Uncomment if you want sound effects
/*
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // You can add a subtle sound effect here if desired
        console.log('Service card hovered');
    });
});
*/

// Price formatter (for future use)
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(price);
}

// Service data (for future dynamic loading)
const services = [
    {
        name: 'Web Development',
        price: 499,
        icon: 'fa-code',
        features: ['Responsive Design', 'Modern UI/UX', 'Performance Optimized']
    },
    {
        name: 'Python Development',
        price: 699,
        icon: 'fa-python',
        features: ['Automation Scripts', 'Data Analysis', 'Django/Flask Apps']
    },
    {
        name: 'JavaScript Apps',
        price: 599,
        icon: 'fa-js',
        features: ['Single Page Apps', 'Interactive UI', 'Real-time Features']
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Services page loaded!');
    
    // Add fade-in animation to header
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
    
    // Animate process steps sequentially
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, 500 + (index * 200));
    });
});

// Counter animation for stats (if you add stats later)
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Export for debugging
window.servicesData = {
    page: 'Services',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'Django']
};
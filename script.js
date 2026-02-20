// Mobile menu toggle with enhanced interaction
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Toggle body scroll when menu is open
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

// Smooth scroll for home link
document.querySelectorAll('a[href="/"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '/') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Update active class
            updateActiveLink('/');
        }
    });
});

// Active link highlighting based on current path
const currentPath = window.location.pathname;

function updateActiveLink(path) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
}

// Set active link on page load
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath === '/' && link.getAttribute('href') === '/')) {
        link.classList.add('active');
    }
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 15, 30, 0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.08)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    }
});

// Close mobile menu on window resize (if open)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add hover effect for nav items (optional enhancement)
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(-2px)';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Parallax effect for home image (optional)
const homeImage = document.querySelector('.image-container');
if (homeImage) {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        homeImage.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    });
}

// Typing effect for subtitle (optional enhancement)
const subtitle = document.querySelector('.home-text h2');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// Smooth reveal animation on scroll
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

// Observe home content for animation
const homeContent = document.querySelector('.home-content');
if (homeContent) {
    homeContent.style.opacity = '0';
    homeContent.style.transform = 'translateY(30px)';
    homeContent.style.transition = 'all 0.8s ease';
    observer.observe(homeContent);
}
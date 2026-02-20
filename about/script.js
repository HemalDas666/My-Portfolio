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

// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['HTML', 'CSS', 'JavaScript', 'Python', 'Next.js', 'Squarespace', 'Hugo', 'MySQL', 'MongoDB', 'API Management', 'Full Stack',];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Start typing animation
if (typingText) {
    setTimeout(typeEffect, 1000);
}

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.progress');
const skillsSection = document.querySelector('.skills-container');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Intersection Observer for skills section
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    observer.observe(skillsSection);
}

// Active link highlighting
const currentPath = window.location.pathname;

document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || 
        (currentPath.includes('/about/') && linkPath.includes('/about/'))) {
        link.classList.add('active');
    }
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

// Download resume functionality
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Create a dummy PDF download (you can replace with actual resume link)
        alert('Resume download started! (Demo - Add your actual resume link)');
        
        // Example: window.open('path/to/resume.pdf', '_blank');
    });
}

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // Divide animation into 50 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 20);
    });
}

// Trigger stats animation when profile card is visible
const profileCard = document.querySelector('.profile-card');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (profileCard) {
    statsObserver.observe(profileCard);
}

// Mouse move parallax effect on profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        profileImage.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
    });
}

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add hover effect for skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const progress = this.querySelector('.progress');
        progress.style.background = 'linear-gradient(90deg, #ffd700, #ffa500)';
        progress.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
    });
    
    item.addEventListener('mouseleave', function() {
        const progress = this.querySelector('.progress');
        progress.style.background = 'linear-gradient(90deg, #ffd700, #ffb347)';
        progress.style.boxShadow = 'none';
    });
});

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    console.log('About page loaded with master-level animations!');
    
    // Add fade-in animation for about content
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(30px)';
        aboutContent.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            aboutContent.style.opacity = '1';
            aboutContent.style.transform = 'translateY(0)';
        }, 200);
    }
});
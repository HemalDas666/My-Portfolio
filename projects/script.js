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
        (currentPath.includes('/projects/') && linkPath.includes('/projects/'))) {
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

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                card.classList.remove('hide');
                card.style.animation = 'fadeIn 0.6s ease forwards';
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// GitHub Repositories Management
let repos = [
    {
        name: 'JS Project',
        url: 'https://github.com/HemalDas666/Hemals-Afk-Bot-For-Minecraft',
        description: 'A Minecraft Server Afk',
        language: 'JavaScript',
        stars: 45,
        forks: 12
    },
    {
        name: 'AI Voice Assistant',
        url: 'https://github.com/HemalDas666/Friday-Vartual-assistent',
        description: 'Python-based AI assistant with NLP capabilities',
        language: 'Python',
        stars: 78,
        forks: 23
    },
];

// Function to display repos
function displayRepos() {
    const reposGrid = document.getElementById('reposGrid');
    if (!reposGrid) return;
    
    reposGrid.innerHTML = '';
    
    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        
        repoCard.innerHTML = `
            <h4>${repo.name}</h4>
            <p>${repo.description}</p>
            <div class="repo-meta">
                <span class="repo-language">
                    <span class="language-dot"></span>
                    ${repo.language}
                </span>
                <div class="repo-stats">
                    <span><i class="far fa-star"></i> ${repo.stars}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks}</span>
                </div>
            </div>
            <a href="${repo.url}" target="_blank" class="repo-link">
                View Repository <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        reposGrid.appendChild(repoCard);
    });
}

// Add new repo form
const repoForm = document.getElementById('repoForm');
if (repoForm) {
    repoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newRepo = {
            name: document.getElementById('repoName').value,
            url: document.getElementById('repoUrl').value,
            description: document.getElementById('repoDesc').value,
            language: document.getElementById('repoLanguage').value,
            stars: 0,
            forks: 0
        };
        
        repos.push(newRepo);
        displayRepos();
        repoForm.reset();
        
        // Show success message
        alert('Repository added successfully!');
    });
}

// Initialize repos display
displayRepos();

// Counter animation for stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
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

// Trigger stats animation when GitHub card is visible
const githubCard = document.querySelector('.github-card');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (githubCard) {
    statsObserver.observe(githubCard);
}

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

// Add hover effect for project links
document.querySelectorAll('.project-link').forEach((link, index) => {
    link.style.setProperty('--i', index + 1);
});

// Initialize page animations
document.addEventListener('DOMContentLoaded', () => {
    console.log('Projects page loaded!');
    
    // Add fade-in animation for projects section
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.style.opacity = '0';
        projectsGrid.style.transform = 'translateY(30px)';
        projectsGrid.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            projectsGrid.style.opacity = '1';
            projectsGrid.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Export repos data (for you to add your actual GitHub repos)
window.githubRepos = repos;
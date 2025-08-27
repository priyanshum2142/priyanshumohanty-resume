// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Project data
const projectsData = [
    {
        title: "Computer Vision based Iron Man Hand HUD using OpenCV and MediaPipe",
        location: "Pune",
        date: "August 2025",
        description: "Developed an interactive hand gesture recognition system using computer vision techniques. This project combines OpenCV and MediaPipe to create a futuristic HUD interface that responds to hand movements, similar to the Iron Man suit interface. The system can detect and track hand gestures in real-time, providing an immersive user experience."
    },
    {
        title: "Design and Fabrication of 3D Printed Keychains for ISKCON",
        location: "Pune",
        date: "January 2025 to April 2025",
        description: "Designed and fabricated custom 3D printed keychains for the International Society for Krishna Consciousness (ISKCON). This project involved creating detailed CAD models, optimizing designs for 3D printing, and managing the complete fabrication process. The keychains featured intricate religious symbols and were produced using advanced 3D printing techniques with post-processing for enhanced quality."
    },
    {
        title: "Ornithopter: A Flapping-Wing Flying Prototype",
        location: "Pune",
        date: "February 2024 to April 2024",
        description: "Built a biomimetic flapping-wing aircraft prototype inspired by bird flight mechanics. This innovative project explored the principles of ornithopter flight, involving aerodynamic analysis, mechanical design, and prototype fabrication. The ornithopter demonstrates the complex engineering challenges of replicating natural flight patterns in artificial systems."
    },
    {
        title: "Arduino based Line Following Robot (IIT Bombay Robotics Workshop)",
        location: "Mumbai",
        date: "December 2023",
        description: "Developed an autonomous line-following robot using Arduino microcontroller as part of the IIT Bombay Robotics Workshop. The robot uses infrared sensors to detect and follow a predetermined path, demonstrating principles of autonomous navigation, sensor integration, and real-time control systems. This project provided hands-on experience with embedded programming and robotics fundamentals."
    },
    {
        title: "Robotic Arm using Arduino, Servo Motors, and Electromagnets",
        location: "Pune",
        date: "September 2023",
        description: "Built a multi-axis robotic arm with precise motor control using Arduino microcontroller, servo motors, and electromagnets. The robotic arm features multiple degrees of freedom and can perform pick-and-place operations. This project involved mechanical design, control system programming, and integration of various actuators to create a functional robotic manipulation system."
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupScrollEffects();
    setupProjectModals();
    setupAnimations();
    initializeThemeToggle();
    setTimeout(() => {
        typeWriterEffect();
    }, 500);
}

// Navigation functionality
function setupNavigation() {
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }

    // Navigation link clicks - Fixed smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveNavLink(targetId);
            }
        });
    });

    // Hero section button clicks
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = mobileMenu.querySelectorAll('.bar');
    if (mobileMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        bars[0].style.transform = 'rotate(0deg) translate(0px, 0px)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0deg) translate(0px, 0px)';
    }
}

function updateActiveNavLink(activeTargetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeTargetId) {
            link.classList.add('active');
        }
    });
}

// Scroll effects
function setupScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                handleActiveNavLink();
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function handleActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    if (currentSection) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Project modal functionality - Fixed
function setupProjectModals() {
    // Add click listeners to project cards
    projectCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            openProjectModal(index);
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 8px 30px rgba(220, 38, 38, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Modal close events
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(index) {
    if (!modal || !projectsData[index]) return;
    
    const project = projectsData[index];
    
    // Update modal content
    const modalTitle = document.getElementById('modalTitle');
    const modalLocation = document.getElementById('modalLocation');
    const modalDate = document.getElementById('modalDate');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalLocation) modalLocation.textContent = `Location: ${project.location}`;
    if (modalDate) modalDate.textContent = `Date: ${project.date}`;
    if (modalDescription) modalDescription.textContent = project.description;
    
    // Show modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Animation setup
function setupAnimations() {
    // Initialize intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.section-title, .about-text, .stat-item, .timeline-item, .skill-category, .project-card, .activity-card, .contact-item, .certificate-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Enhanced skill tag animations
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Activity card hover effects
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.activity-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.activity-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Contact item effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateX(10px)';
            }, 100);
        });
    });
}

// Fixed typewriter effect
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (!heroTitle || !heroSubtitle) return;

    // Store original text and clear
    const titleText = 'Priyanshu Mohanty';
    const subtitleText = 'Robotics & Automation Engineer';
    
    heroTitle.textContent = '';
    heroSubtitle.textContent = '';
    heroTitle.style.opacity = '1';
    heroSubtitle.style.opacity = '1';
    
    let titleIndex = 0;
    let subtitleIndex = 0;
    
    function typeTitle() {
        if (titleIndex < titleText.length) {
            heroTitle.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitle, 100);
        } else {
            setTimeout(typeSubtitle, 300);
        }
    }
    
    function typeSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            heroSubtitle.textContent += subtitleText.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeSubtitle, 80);
        }
    }
    
    typeTitle();
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add a small animation effect
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 100);
            
            console.log('Theme switched to:', newTheme);
        });
        
        console.log('Theme toggle initialized with theme:', savedTheme);
    } else {
        console.error('Theme toggle element not found!');
    }
}

// Enhanced button click effects
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        createRippleEffect(e);
    }
});

function createRippleEffect(e) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.height, rect.width);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Scroll to top button
function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--custom-red);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced stagger animation for skill tags
function initializeStaggerAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    tag.style.opacity = '0';
                    tag.style.transform = 'translateY(20px)';
                    tag.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });

    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
}

// Initialize after DOM is loaded
setTimeout(initializeStaggerAnimations, 1000);

// Console greeting
console.log(`
🚀 Priyanshu Mohanty's Resume Website
📧 Contact: priyanshumohanty1112@gmail.com
📱 Phone: +91 9717889998
🎓 B.Tech Robotics & Automation Engineering

Website loaded successfully! All navigation and interactions should now work properly.
Built with vanilla HTML, CSS, and JavaScript for optimal performance.
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }, 0);
    });
}

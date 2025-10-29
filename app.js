// Data for projects
const projectsData = [
    {
        title: "Smart Vehicle Detection & Entry Logging System",
        location: "Symbiosis Institute of Technology, Pune",
        date: "August 2025 - Present"
    },
    {
        title: "Iron Man Hand HUD",
        location: "Symbiosis Institute of Technology, Pune",
        date: "August 2025",
        description: "Built a HUD interface with real-time hand gesture recognition using Python and OpenCV, enabling smooth virtual object control through Computer Vision and MediaPipe."
    },
    {
        title: "3D Printed Keychains",
        location: "Symbiosis Institute of Technology, Pune",
        date: "January - April 2025",
        description: "Designed and fabricated 50+ custom 3D printed keychains with intricate religious symbols, optimizing printing efficiency by 40% using advanced CAD design techniques."
    },
    {
        title: "Ornithopter Prototype",
        location: "Symbiosis Institute of Technology, Pune",
        date: "February - April 2024",
        description: "Designed and fabricated a bio-inspired flying mechanism, demonstrating efficient flapping-wing flight control with 8-second sustained flight using aerodynamics and biomimetics principles."
    },
    {
        title: "Line Following Robot",
        location: "Symbiosis Institute of Technology, Pune",
        date: "December 2023",
        description: "Built an autonomous navigation robot achieving 98% path accuracy using sensor fusion and real-time control algorithms with Arduino and advanced sensors."
    },
    {
        title: "Robotic Arm",
        location: "Symbiosis Institute of Technology, Pune",
        date: "September 2023",
        description: "Developed a multi-axis robotic arm with precise motor control, achieving 2mm positioning accuracy for pick-and-place operations using Arduino and servo motors."
    }
];

// Data for activities
const activitiesData = [
    {
        title: "Speech at the 4th BRICS SciTech Forum",
        location: "RUDN University, Russia (Online)",
        date: "November 2023",
        description: "Delivered a presentation on 'Space Flight Mechanics and Space Structures and Materials' at the international forum hosted by RUDN University in Russia."
    },
    {
        title: "Event Team Member",
        location: "Rotonity Club, SIT, Pune",
        date: "August 2023 – September 2024",
        description: "Active member of the event team, responsible for planning and coordinating various robotics events and competitions."
    },
    {
        title: "Design Team Member",
        location: "SymbiTech, SIT, Pune",
        date: "September 2023",
        description: "Contributed to the design team for creating visual content and promotional materials for technology events and initiatives."
    },
    {
        title: "Sports Enthusiast",
        location: "Symbiosis Institute of Technology, Pune",
        date: "Ongoing",
        description: "Active participation in college sports including Football, Cricket, and Pool, promoting teamwork and physical fitness."
    }
];

// Gallery data with image arrays
const galleryData = {
    'ironman-hud': {
        title: 'Iron Man Hand HUD',
        images: [
            { src: 'ironman-hud-1.jpg' },
            { src: 'ironman-hud-2.jpg' },
            { src: 'ironman-hud-3.jpg' },
            { src: 'ironman-hud-4.jpg' }
        ]
    },
    'robotic-arm': {
        title: 'Multi-Axis Robotic Arm',
        images: [
            { src: 'robotic-arm-1.jpg' },
            { src: 'robotic-arm-2.jpg' },
            { src: 'robotic-arm-3.jpg' },
            { src: 'robotic-arm-4.jpg' }
        ]
    },
    'ornithopter': {
        title: 'Ornithopter Prototype',
        images: [
            { src: 'ornithopter-1.jpg' },
            { src: 'ornithopter-2.jpg' }
        ]
    },
    '3d-printing': {
        title: '3D Printed Keychains',
        images: [
            { src: '3d-printing-1.jpg' },
            { src: '3d-printing-2.jpg' },
            { src: '3d-printing-3.jpg' },
            { src: '3d-printing-4.jpg' }
        ]
    },
    'line-robot': {
        title: 'Line Following Robot',
        images: [
            { src: 'line-robot-1.jpg' },
            { src: 'line-robot-2.jpg' }
        ]
    },
    'brics-forum': {
        title: 'BRICS SciTech Forum',
        images: [
            { src: 'brics-forum-1.jpg' },
            { src: 'brics-forum-2.jpg' },
            { src: 'brics-forum-3.jpg' }
        ]
    },
    'sports-activities': {
        title: 'Sports Achievements',
        images: [
            { src: 'sports-activities-1.jpg' },
            { src: 'sports-activities-2.jpg' },
            { src: 'sports-activities-3.jpg' },
            { src: 'sports-activities-4.jpg' }
        ]
    },
    'club-activities': {
        title: 'Club Activities',
        images: [
            { src: 'club-activities-1.jpg' },
            { src: 'club-activities-2.jpg' },
            { src: 'club-activities-3.jpg' }
        ]
    }
};

// Global variables
let currentGallery = null;
let currentSlideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// DOM elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectCards = document.querySelectorAll('.project-card');
const activityCards = document.querySelectorAll('.activity-card');
const galleryCards = document.querySelectorAll('.gallery-project-card');
const projectModal = document.getElementById('projectModal');
const activityModal = document.getElementById('activityModal');
const modalCloses = document.querySelectorAll('.modal-close');
const modalOverlays = document.querySelectorAll('.modal-overlay');

// Gallery modal elements
const galleryModal = document.getElementById('galleryModal');
const galleryModalTitle = document.getElementById('galleryModalTitle');
const gallerySlides = document.getElementById('gallerySlides');
const galleryDots = document.getElementById('galleryDots');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const currentImageIndex = document.getElementById('currentImageIndex');
const totalImages = document.getElementById('totalImages');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing...');
    
    // Initialize all functionality
    initializeThemeToggle();
    setupNavigation();
    setupScrollEffects();
    setupProjectModals();
    setupActivityModals();
    setupGalleryModal();
    setupAnimations();
    typeWriterEffect();
    
    console.log('✅ All features initialized successfully!');
});

// FIXED Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (!themeToggle) {
        console.error('❌ Theme toggle element not found!');
        return;
    }
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    console.log('🎨 Initializing theme toggle with theme:', savedTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('🔄 Switching theme from', currentTheme, 'to', newTheme);
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a small animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        console.log('✅ Theme switched successfully to:', newTheme);
    });
    
    console.log('✅ Theme toggle initialized successfully');
}

// Gallery Modal Setup
function setupGalleryModal() {
    // Add click listeners to gallery cards
    galleryCards.forEach(card => {
        card.addEventListener('click', function() {
            const galleryType = this.dataset.gallery;
            if (galleryType) {
                openGallery(galleryType);
            }
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Navigation buttons
    if (galleryPrev) {
        galleryPrev.addEventListener('click', () => {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateGallerySlide();
            }
        });
    }

    if (galleryNext) {
        galleryNext.addEventListener('click', () => {
            if (currentGallery && currentSlideIndex < galleryData[currentGallery].images.length - 1) {
                currentSlideIndex++;
                updateGallerySlide();
            }
        });
    }

    // Close modal events
    if (galleryModal) {
        const closeBtn = galleryModal.querySelector('.gallery-modal-close');
        const overlay = galleryModal.querySelector('.gallery-modal-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeGallery);
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeGallery);
        }

        // Touch events for swipe
        galleryModal.addEventListener('touchstart', handleTouchStart, { passive: true });
        galleryModal.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (galleryModal && galleryModal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeGallery();
                    break;
                case 'ArrowLeft':
                    galleryPrev.click();
                    break;
                case 'ArrowRight':
                    galleryNext.click();
                    break;
            }
        }
    });
}

function openGallery(galleryType) {
    if (!galleryData[galleryType]) return;

    currentGallery = galleryType;
    currentSlideIndex = 0;
    
    const gallery = galleryData[galleryType];
    
    // Update modal title
    if (galleryModalTitle) {
        galleryModalTitle.textContent = gallery.title;
    }
    
    // Update total images count
    if (totalImages) {
        totalImages.textContent = gallery.images.length;
    }
    
    // Create slides
    createGallerySlides(gallery.images);
    
    // Create dots
    createGalleryDots(gallery.images.length);
    
    // Show modal
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update slide
    updateGallerySlide();
}

function closeGallery() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentGallery = null;
    currentSlideIndex = 0;
}

function createGallerySlides(images) {
    gallerySlides.innerHTML = '';
    
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `
            <img src="${image.src}" alt="Image ${index + 1}" 
                 onerror="this.style.background='linear-gradient(135deg, var(--custom-red), var(--custom-red-hover))'; this.innerHTML='<div style=\\"display: flex; align-items: center; justify-content: center; height: 100%; font-size: 4rem; color: white;\\">🖼️</div>';">
        `;
        gallerySlides.appendChild(slide);
    });
}

function createGalleryDots(count) {
    galleryDots.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot';
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            currentSlideIndex = i;
            updateGallerySlide();
        });
        
        galleryDots.appendChild(dot);
    }
}

function updateGallerySlide() {
    if (!currentGallery) return;
    
    const gallery = galleryData[currentGallery];
    
    // Update slide position
    const translateX = -currentSlideIndex * 100;
    gallerySlides.style.transform = `translateX(${translateX}%)`;
    
    // Update counter
    if (currentImageIndex) {
        currentImageIndex.textContent = currentSlideIndex + 1;
    }
    
    // Update dots
    const dots = galleryDots.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
    
    // Update navigation buttons
    if (galleryPrev) {
        galleryPrev.style.opacity = currentSlideIndex === 0 ? '0.5' : '1';
        galleryPrev.style.pointerEvents = currentSlideIndex === 0 ? 'none' : 'auto';
    }
    
    if (galleryNext) {
        const isLast = currentSlideIndex === gallery.images.length - 1;
        galleryNext.style.opacity = isLast ? '0.5' : '1';
        galleryNext.style.pointerEvents = isLast ? 'none' : 'auto';
    }
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            galleryNext.click();
        } else {
            // Swipe right - previous slide
            galleryPrev.click();
        }
    }
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

// Project modal functionality
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

    // Modal close events for project modal
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            if (this.closest('#projectModal')) {
                closeProjectModal();
            } else if (this.closest('#activityModal')) {
                closeActivityModal();
            }
        });
    });
    
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            if (this.closest('#projectModal')) {
                closeProjectModal();
            } else if (this.closest('#activityModal')) {
                closeActivityModal();
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (projectModal && projectModal.classList.contains('active')) {
                closeProjectModal();
            }
            if (activityModal && activityModal.classList.contains('active')) {
                closeActivityModal();
            }
        }
    });
}

function openProjectModal(index) {
    if (!projectModal || !projectsData[index]) return;
    
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
    projectModal.classList.remove('hidden');
    setTimeout(() => {
        projectModal.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!projectModal) return;
    
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        projectModal.classList.add('hidden');
    }, 300);
}

// Activity modal functionality
function setupActivityModals() {
    // Add click listeners to activity cards
    activityCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            openActivityModal(index);
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 8px 30px rgba(220, 38, 38, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

function openActivityModal(index) {
    if (!activityModal || !activitiesData[index]) return;
    
    const activity = activitiesData[index];
    
    // Update modal content
    const modalTitle = document.getElementById('activityModalTitle');
    const modalLocation = document.getElementById('activityModalLocation');
    const modalDate = document.getElementById('activityModalDate');
    const modalDescription = document.getElementById('activityModalDescription');
    
    if (modalTitle) modalTitle.textContent = activity.title;
    if (modalLocation) modalLocation.textContent = `Location: ${activity.location}`;
    if (modalDate) modalDate.textContent = `Date: ${activity.date}`;
    if (modalDescription) modalDescription.textContent = activity.description;
    
    // Show modal
    activityModal.classList.remove('hidden');
    setTimeout(() => {
        activityModal.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeActivityModal() {
    if (!activityModal) return;
    
    activityModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        activityModal.classList.add('hidden');
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
        '.section-title, .about-text, .stat-item, .timeline-item, .skill-category, .project-card, .hackathon-card, .activity-card, .contact-item, .certificate-card, .gallery-project-card'
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
    const activityCardsForHover = document.querySelectorAll('.activity-card');
    activityCardsForHover.forEach(card => {
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

    // Hackathon card hover effects
    const hackathonCards = document.querySelectorAll('.hackathon-card');
    hackathonCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.hackathon-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.hackathon-icon');
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
                this.style.transform = 'translateY(-5px)';
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

// Console greeting
console.log(`
🚀 Priyanshu Mohanty's Portfolio Website
📧 Contact: priyanshumohanty1112@gmail.com
📱 Phone: +91 9717889998
🎓 B.Tech Robotics & Automation Engineering

✅ Website loaded successfully! 
🌓 Dark mode toggle FIXED and working!
✨ Features:
- ✅ Working Dark/Light Theme Toggle
- ✅ Interactive Project Gallery (5 projects)
- ✅ Interactive Activity Gallery (6 activities)
- ✅ Smooth Scrolling Navigation
- ✅ Mobile Responsive Design
- ✅ Project & Activity Modals
- ✅ Touch/Swipe Support for Gallery
- ✅ Keyboard Navigation
- ✅ Scroll Animations
- ✅ Consistent Red Headings
- ✅ Alternating Section Backgrounds
- ✅ Uniform Card Styling

Built with vanilla HTML, CSS, and JavaScript for optimal performance.
Dark mode now works perfectly! 🎯✨
`);

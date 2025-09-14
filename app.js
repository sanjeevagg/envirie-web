// Envirie Landing Page JavaScript
// Modern ES6+ implementation for interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTabSwitching();
    initCTAButtons();
    initSmoothScrolling();
    initStickyHeader();
    initMobileMenu();
    initFormValidation();
});

// Navigation and smooth scrolling
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Smooth scrolling for all anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just # or already handled by navigation
            if (href === '#' || this.classList.contains('nav-link')) {
                return;
            }
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Tab switching for Individual vs Enterprise sections
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// CTA Button interactions
function initCTAButtons() {
    // Individual signup buttons
    const individualSignupButtons = document.querySelectorAll('#signup-btn, #hero-signup, #individual-signup, #final-signup');
    individualSignupButtons.forEach(button => {
        button.addEventListener('click', function() {
            showSignupModal('individual');
        });
    });
    
    // Enterprise demo buttons
    const enterpriseDemoButtons = document.querySelectorAll('#demo-btn, #hero-demo, #enterprise-demo, #final-demo');
    enterpriseDemoButtons.forEach(button => {
        button.addEventListener('click', function() {
            showDemoModal();
        });
    });
    
    // Pricing buttons
    const freeButtons = document.querySelectorAll('.pricing-card .btn--outline');
    freeButtons.forEach(button => {
        if (button.textContent.includes('Get Started Free')) {
            button.addEventListener('click', function() {
                showSignupModal('individual');
            });
        }
    });
    
    const premiumButtons = document.querySelectorAll('.pricing-card .btn--primary');
    premiumButtons.forEach(button => {
        if (button.textContent.includes('Upgrade')) {
            button.addEventListener('click', function() {
                showSignupModal('premium');
            });
        } else if (button.textContent.includes('Contact Sales')) {
            button.addEventListener('click', function() {
                showDemoModal();
            });
        }
    });
}

// Modal functions for demo purposes
function showSignupModal(type = 'individual') {
    const messages = {
        individual: 'Welcome! You would now be redirected to create your free Envirie account. Start your climate journey today and earn your first GreenCoins!',
        premium: 'Upgrading to Premium! You would be redirected to our premium signup flow with advanced AI missions and detailed analytics.'
    };
    
    alert(messages[type] || messages.individual);
}

function showDemoModal() {
    const message = `Thank you for your interest in Envirie Enterprise!

Our sales team will contact you within 24 hours to schedule a personalized demo.

We'll show you:
• Employee engagement platform
• BRSR/ESG automated reporting
• Team management tools
• Real-time compliance dashboard
• API integrations

For immediate assistance, call us at +91-80-4000-1234 or email enterprise@envirie.com`;
    
    alert(message);
}

// Sticky header behavior
function initStickyHeader() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize if mobile menu is hidden
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Form validation (for future contact forms)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const formType = form.dataset.type || 'contact';
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                handleFormSubmission(formType, formData);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
}

function handleFormSubmission(type, formData) {
    // Demo form submission handler
    const messages = {
        contact: 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
        newsletter: 'Successfully subscribed to our newsletter! Stay tuned for sustainability tips and product updates.',
        demo: 'Demo request submitted! Our team will contact you shortly to schedule your personalized demo.'
    };
    
    // Simulate API call delay
    setTimeout(() => {
        alert(messages[type] || messages.contact);
    }, 500);
}

// Intersection Observer for animations (optional enhancement)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatableElements = document.querySelectorAll(
        '.feature-card, .step-card, .pricing-card, .stat-card, .testimonial'
    );
    
    animatableElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Progress bar animation for hero card
function animateProgressBar() {
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        // Animate from 0 to 75% over 2 seconds
        let width = 0;
        const targetWidth = 75;
        const duration = 2000;
        const increment = targetWidth / (duration / 16); // 60fps
        
        const animate = () => {
            if (width < targetWidth) {
                width += increment;
                progressBar.style.width = Math.min(width, targetWidth) + '%';
                requestAnimationFrame(animate);
            }
        };
        
        // Start animation when page loads
        setTimeout(animate, 1000);
    }
}

// Initialize progress bar animation
document.addEventListener('DOMContentLoaded', function() {
    animateProgressBar();
});

// Handle external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For demo purposes, show alert instead of opening external links
            e.preventDefault();
            const linkText = this.textContent.trim();
            const linkType = this.getAttribute('href');
            
            if (linkType === '#') {
                alert(`This would open the ${linkText} page in a new tab.`);
            } else {
                alert(`This would open an external link: ${linkType}`);
            }
        });
    });
});

// Add CSS classes for mobile menu styling
const additionalCSS = `
.nav-menu.active {
    display: flex !important;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--color-surface);
    flex-direction: column;
    padding: var(--space-24);
    box-shadow: var(--shadow-lg);
    border-top: 1px solid var(--color-border);
    z-index: 999;
}

.nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
    opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

.header.scrolled {
    background: rgba(252, 252, 249, 0.98);
    backdrop-filter: blur(15px);
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .nav-actions {
        order: -1;
        flex: 1;
        justify-content: flex-end;
        gap: var(--space-8);
    }
    
    .nav-actions .btn {
        padding: var(--space-6) var(--space-12);
        font-size: var(--font-size-sm);
    }
}

.form-control.error {
    border-color: var(--color-error);
    box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
}

.animate-in {
    animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
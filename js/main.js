/**
 * Michael Dutton - User Research Consultant
 * Main JavaScript file
 */

(function() {
    'use strict';

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);

            // Toggle hamburger animation
            navToggle.classList.toggle('is-active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav__link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('is-open');
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
                navMenu.classList.remove('is-open');
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form handling (basic client-side validation and feedback)
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach(function(value, key) {
                data[key] = value;
            });

            // Basic validation
            const requiredFields = ['name', 'email', 'message'];
            let isValid = true;

            requiredFields.forEach(function(field) {
                const input = contactForm.querySelector('[name="' + field + '"]');
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            // Email validation
            const emailInput = contactForm.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (data.email && !emailRegex.test(data.email)) {
                isValid = false;
                emailInput.classList.add('is-invalid');
            }

            if (!isValid) {
                return;
            }

            // Show success message (in production, this would submit to a backend)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(function() {
                contactForm.innerHTML = '<div class="form-success">' +
                    '<h3>Thank you for your message</h3>' +
                    '<p>I\'ll be in touch shortly to discuss your project.</p>' +
                    '</div>';
            }, 1000);
        });

        // Remove invalid state on input
        contactForm.querySelectorAll('input, textarea, select').forEach(function(input) {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.service-card, .timeline__item, .value, .engagement__card').forEach(function(el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });

})();

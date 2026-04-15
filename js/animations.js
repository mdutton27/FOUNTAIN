/**
 * Fountain X — Elevation Animations
 * Scroll reveals, mouse effects, and visual polish
 */

(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------------------------------------------------
       Scroll Reveal
       Elements with class "reveal" fade+slide in when they enter viewport.
       Add data-delay="1"-"6" for stagger timing.
    ------------------------------------------------------------------ */
    function initScrollReveal() {
        var elements = document.querySelectorAll('.reveal');
        if (!elements.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var delay = el.getAttribute('data-delay') || '0';
                    el.style.transitionDelay = prefersReducedMotion ? '0ms' : (parseFloat(delay) * 80) + 'ms';
                    el.classList.add('reveal--visible');
                    observer.unobserve(el);
                }
            });
        }, {
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ------------------------------------------------------------------
       Auto-stagger grid children
       Finds reveal items inside grids and assigns data-delay automatically.
    ------------------------------------------------------------------ */
    function initStagger() {
        var grids = document.querySelectorAll(
            '.services-grid, .engagement__grid, .principles-grid, .values__grid, .expertise__grid'
        );

        grids.forEach(function (grid) {
            var children = grid.querySelectorAll('.service-card, .engagement__card, .principle, .value, .expertise__category');
            children.forEach(function (child, i) {
                child.classList.add('reveal');
                child.setAttribute('data-delay', i + 1);
            });
        });

        // Section headers
        document.querySelectorAll('.section-header, .page-hero, .hero__content, .about-intro__content, .service-detail__content, .cta__content, .contact-grid').forEach(function (el) {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });

        // Timeline items
        document.querySelectorAll('.timeline__item').forEach(function (el, i) {
            el.classList.add('reveal', 'reveal--from-left');
            el.setAttribute('data-delay', i + 1);
        });

        // Experience logos
        document.querySelectorAll('.experience__logo').forEach(function (el, i) {
            el.classList.add('reveal', 'reveal--scale');
            el.setAttribute('data-delay', i + 1);
        });
    }

    /* ------------------------------------------------------------------
       Hero Parallax (mouse movement)
    ------------------------------------------------------------------ */
    function initHeroParallax() {
        var hero = document.querySelector('.hero');
        if (!hero || prefersReducedMotion) return;

        var heroContent = hero.querySelector('.hero__content');
        if (!heroContent) return;

        var ticking = false;
        var mouseX = 0;
        var mouseY = 0;

        hero.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!ticking) {
                requestAnimationFrame(function () {
                    var rect = hero.getBoundingClientRect();
                    var cx = rect.left + rect.width / 2;
                    var cy = rect.top + rect.height / 2;
                    var dx = (mouseX - cx) / rect.width;
                    var dy = (mouseY - cy) / rect.height;

                    heroContent.style.transform = 'translate(' + (dx * 8) + 'px, ' + (dy * 8) + 'px)';
                    ticking = false;
                });
                ticking = true;
            }
        });

        hero.addEventListener('mouseleave', function () {
            heroContent.style.transform = '';
            heroContent.style.transition = 'transform 0.6s ease';
            setTimeout(function () {
                heroContent.style.transition = '';
            }, 600);
        });
    }

    /* ------------------------------------------------------------------
       Card Tilt (subtle 3D on hover)
    ------------------------------------------------------------------ */
    function initCardTilt() {
        if (prefersReducedMotion) return;

        var cards = document.querySelectorAll('.service-card, .engagement__card, .principle');

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = 'translateY(-6px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg)';
                card.style.boxShadow = '0 20px 40px rgba(26,77,92,0.15)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
                setTimeout(function () { card.style.transition = ''; }, 400);
            });
        });
    }

    /* ------------------------------------------------------------------
       Section title reveal line
       Draws an animated accent line under section titles.
    ------------------------------------------------------------------ */
    function initTitleLines() {
        var titles = document.querySelectorAll('.section-title, .service-detail__title, .page-hero__title');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('title--animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        titles.forEach(function (title) {
            observer.observe(title);
        });
    }

    /* ------------------------------------------------------------------
       Number counter animation
    ------------------------------------------------------------------ */
    function initCounters() {
        var counters = document.querySelectorAll('[data-count]');
        if (!counters.length || prefersReducedMotion) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-count'), 10);
                    var duration = 1200;
                    var start = null;

                    function step(timestamp) {
                        if (!start) start = timestamp;
                        var progress = Math.min((timestamp - start) / duration, 1);
                        var ease = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(ease * target);
                        if (progress < 1) requestAnimationFrame(step);
                    }

                    requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (el) { observer.observe(el); });
    }

    /* ------------------------------------------------------------------
       Nav link underline animation
    ------------------------------------------------------------------ */
    function initNavLinks() {
        document.querySelectorAll('.nav__link:not(.nav__link--cta)').forEach(function (link) {
            link.classList.add('nav__link--animated');
        });
    }

    /* ------------------------------------------------------------------
       Boot
    ------------------------------------------------------------------ */
    function init() {
        initStagger();
        initScrollReveal();
        initHeroParallax();
        initCardTilt();
        initTitleLines();
        initCounters();
        initNavLinks();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/* ==============================
   Doriax Engine Website Scripts
   ============================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    function closeMobileMenu() {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
        const isOpen = navLinks.classList.contains('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Reset mobile menu state on viewport resize past mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // --- Editor tabs ---
    const editorTabs = document.querySelectorAll('.editor-tab');
    const editorPreviews = document.querySelectorAll('.editor-preview-image');

    editorTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            editorTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            editorPreviews.forEach(preview => {
                if (preview.dataset.tab === target) {
                    preview.classList.add('active');
                } else {
                    preview.classList.remove('active');
                }
            });
        });
    });

    // --- Gallery lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentLightboxIndex = 0;

    function openLightbox(index) {
        currentLightboxIndex = index;
        const src = galleryItems[index].dataset.full;
        const alt = galleryItems[index].querySelector('img').alt;
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
        const src = galleryItems[currentLightboxIndex].dataset.full;
        const alt = galleryItems[currentLightboxIndex].querySelector('img').alt;
        lightboxImg.src = src;
        lightboxImg.alt = alt;
    }

    function nextImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
        const src = galleryItems[currentLightboxIndex].dataset.full;
        const alt = galleryItems[currentLightboxIndex].querySelector('img').alt;
        lightboxImg.src = src;
        lightboxImg.alt = alt;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('active')) return closeLightbox();
            if (navLinks.classList.contains('open')) return closeMobileMenu();
        }
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // --- Scroll-triggered animations ---
    const animatedElements = document.querySelectorAll(
        '.feature-card, .download-card, .highlight-item, .gallery-item, .section-header'
    );

    animatedElements.forEach(el => el.classList.add('fade-in-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- Stagger animation delays for grids ---
    function addStaggerDelay(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, i) => {
            el.style.animationDelay = `${i * 0.08}s`;
        });
    }

    addStaggerDelay('.feature-card');
    addStaggerDelay('.download-card');
    addStaggerDelay('.gallery-item');
    addStaggerDelay('.highlight-item');

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});

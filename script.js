/* =========================================================
   Sri Tulasi Caterers – script.js
   Handles: navbar scroll, mobile menu, menu tabs,
            smooth scroll, scroll-reveal, contact form
   ========================================================= */

'use strict';

/* ---- DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initScrollActiveNav();
  initContactForm();
  initHeroParallax();
  initGalleryLightbox();
  initTestimonialsMarquee();
});


/* =========================================================
   1. NAVBAR — sticky + scroll class
   ========================================================= */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}


/* =========================================================
   2. MOBILE HAMBURGER MENU
   ========================================================= */
function initMobileMenu() {
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const hamOpen     = document.getElementById('ham-open');
  const hamClose    = document.getElementById('ham-close');

  if (!hamburger || !mobileMenu) return;

  hamburger.setAttribute('aria-expanded', 'false');

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    hamOpen.classList.add('hidden');
    hamClose.classList.remove('hidden');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });
}

/**
 * Close the mobile menu — called from inline onclick on links too
 */
function closeMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamOpen    = document.getElementById('ham-open');
  const hamClose   = document.getElementById('ham-close');

  if (mobileMenu) mobileMenu.classList.add('hidden');
  document.getElementById('hamburger')?.setAttribute('aria-expanded', 'false');
  if (hamOpen)    hamOpen.classList.remove('hidden');
  if (hamClose)   hamClose.classList.add('hidden');
}

// Expose globally so inline onclick works
window.closeMenu = closeMenu;


/* =========================================================
   3. MENU TAB TOGGLE (Veg / Non-Veg)
   ========================================================= */
/**
 * showMenu('veg' | 'nonveg')
 * Toggles visibility of the two menu panels and updates button state
 */
function showMenu(type) {
  const menuVeg    = document.getElementById('menu-veg');
  const menuNonVeg = document.getElementById('menu-nonveg');
  const btnVeg     = document.getElementById('btn-veg');
  const btnNonVeg  = document.getElementById('btn-nonveg');

  if (!menuVeg || !menuNonVeg) return;

  if (type === 'veg') {
    menuVeg.classList.remove('hidden');
    menuNonVeg.classList.add('hidden');
    btnVeg.classList.add('active');
    btnNonVeg.classList.remove('active');
  } else {
    menuVeg.classList.add('hidden');
    menuNonVeg.classList.remove('hidden');
    btnNonVeg.classList.add('active');
    btnVeg.classList.remove('active');
  }
}

// Expose globally
window.showMenu = showMenu;


/* =========================================================
   4. SCROLL REVEAL
   Adds .reveal class to sections/cards and triggers .visible
   when they enter the viewport
   ========================================================= */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.service-card, .menu-category, .gallery-item, .stat-card, .contact-info-card, .contact-form-card, .trust-item, .review-summary-card, section[id]').forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  // Elements to animate on scroll
  const targets = [
    ...document.querySelectorAll('.service-card'),
    ...document.querySelectorAll('.menu-category'),
    ...document.querySelectorAll('.gallery-item'),
    ...document.querySelectorAll('.stat-card'),
    ...document.querySelectorAll('.contact-info-card'),
    ...document.querySelectorAll('.contact-form-card'),
    ...document.querySelectorAll('.trust-item'),
    ...document.querySelectorAll('.review-summary-card'),
    document.getElementById('about'),
    document.getElementById('services'),
    document.getElementById('menu'),
    document.getElementById('gallery'),
    document.getElementById('contact'),
  ].filter(Boolean);

  // Add reveal class
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger delay for cards
    if (el.dataset.delay) {
      el.style.transitionDelay = el.dataset.delay + 'ms';
    } else if (el.classList.contains('service-card') ||
               el.classList.contains('menu-category') ||
               el.classList.contains('gallery-item') ||
               el.classList.contains('stat-card') ||
               el.classList.contains('contact-info-card')) {
      el.style.transitionDelay = (i % 6) * 80 + 'ms';
    }
  });

  // IntersectionObserver to trigger
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}


/* =========================================================
   5. ACTIVE NAV LINK based on scroll position
   ========================================================= */
function initScrollActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const highlightNav = () => {
    const scrollY = window.scrollY + 120; // offset for sticky nav

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav(); // run once on load
}


/* =========================================================
   6. CONTACT FORM SUBMIT
   ========================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const phoneInput = document.getElementById('f-phone');
  const successEl = document.getElementById('form-success');

  phoneInput?.addEventListener('input', () => {
    const phone = phoneInput.value.trim();
    if (!phone || /^[6-9]\d{9}$/.test(phone)) {
      phoneInput.setCustomValidity('');
    } else {
      phoneInput.setCustomValidity('Please enter a valid 10-digit Indian mobile number.');
    }
  });

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }

    if (phoneInput && !/^[6-9]\d{9}$/.test(phoneInput.value.trim())) {
      e.preventDefault();
      phoneInput.setCustomValidity('Please enter a valid 10-digit Indian mobile number.');
      form.reportValidity();
      return;
    }

    if (successEl) {
      successEl.textContent = 'Thank you. Sending your request now.';
      successEl.classList.remove('hidden');
    }
  });
}

/* =========================================================
   7. HERO PARALLAX
   ========================================================= */
function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const background = document.querySelector('.site-photo-bg');
  if (!background) return;

  const onScroll = () => {
    const offset = Math.min(window.scrollY * 0.08, 32);
    background.style.transform = `scale(1.04) translateY(${offset}px)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* =========================================================
   8. GALLERY LIGHTBOX
   ========================================================= */
function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCopy = document.getElementById('lightbox-copy');
  const closeButton = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxCopy || !galleryItems.length) return;

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const image = item.querySelector('.gallery-photo');
      const title = item.querySelector('.gallery-overlay span');
      const copy = item.querySelector('.gallery-overlay small');
      if (!image || !title) return;

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt || title.textContent.trim();
      lightboxTitle.textContent = title.textContent.trim();
      lightboxCopy.textContent = copy ? copy.textContent.trim() : '';
      lightbox.classList.remove('hidden');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  closeButton?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

/* =========================================================
   9. TESTIMONIALS MARQUEE
   ========================================================= */
function initTestimonialsMarquee() {
  const marquee = document.querySelector('[data-marquee]');
  const track = marquee?.querySelector('[data-marquee-track]');

  if (!marquee || !track) return;

  const desktopQuery = window.matchMedia('(min-width: 901px)');
  const baseCards = Array.from(track.children);
  let animationFrameId = null;
  let currentX = 0;
  let singleSetWidth = 0;
  let paused = false;

  const buildMarquee = () => {
    track.querySelectorAll('[data-duplicate="true"]').forEach((node) => node.remove());
    track.style.transform = 'translate3d(0, 0, 0)';
    currentX = 0;

    if (!desktopQuery.matches) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      return;
    }

    if (!baseCards.length) return;

    const containerWidth = marquee.getBoundingClientRect().width;
    let originalWidth = baseCards.reduce((total, card) => total + card.getBoundingClientRect().width, 0);
    const cardGap = parseFloat(getComputedStyle(track).gap || '0');
    originalWidth += cardGap * Math.max(baseCards.length - 1, 0);
    singleSetWidth = originalWidth;

    let workingWidth = originalWidth;
    let safety = 0;
    while (workingWidth < containerWidth * 2.2 && safety < 8) {
      baseCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.dataset.duplicate = 'true';
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      workingWidth += originalWidth + cardGap;
      safety += 1;
    }

    if (track.querySelectorAll('[data-duplicate="true"]').length === 0) {
      baseCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.dataset.duplicate = 'true';
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }
  };

  const animate = () => {
    if (!desktopQuery.matches) return;

    if (!paused && singleSetWidth > 0) {
      currentX -= 0.45;
      if (Math.abs(currentX) >= singleSetWidth) {
        currentX = 0;
      }
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  const startAfterLayout = () => {
    buildMarquee();
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(animate);
  };

  marquee.addEventListener('mouseenter', () => {
    paused = true;
  });

  marquee.addEventListener('mouseleave', () => {
    paused = false;
  });

  buildMarquee();
  if (document.readyState === 'complete') {
    startAfterLayout();
  } else {
    window.addEventListener('load', startAfterLayout, { once: true });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(buildMarquee, 150);
  });

  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', startAfterLayout);
  } else if (typeof desktopQuery.addListener === 'function') {
    desktopQuery.addListener(startAfterLayout);
  }
}


/* =========================================================
   10. SMOOTH SCROLL for anchor links
   (Handles the offset created by the sticky navbar)
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();

    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

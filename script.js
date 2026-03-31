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
    document.querySelectorAll('.service-card, .menu-category, .gallery-item, .stat-card, .contact-info-card, .contact-form-card, section[id]').forEach((el) => {
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather values
    const name   = document.getElementById('f-name')?.value.trim()  || '';
    const phone  = document.getElementById('f-phone')?.value.trim() || '';
    const event  = document.getElementById('f-event')?.value        || '';
    const guests = document.getElementById('f-guests')?.value       || '';
    const msg    = document.getElementById('f-msg')?.value.trim()   || '';

    // Basic validation
    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    // Build a WhatsApp pre-filled message and redirect
    const waText =
      `Hello Sri Tulasi Caterers!%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      (event  ? `*Event:* ${encodeURIComponent(event)}%0A`            : '') +
      (guests ? `*Guests (approx):* ${encodeURIComponent(guests)}%0A` : '') +
      (msg    ? `*Message:* ${encodeURIComponent(msg)}%0A`            : '') +
      `%0APlease let me know the details for catering. Thank you!`;

    // Show success message
    const successEl = document.getElementById('form-success');
    if (successEl) {
      successEl.textContent = "Thanks! ధన్యవాదాలు. We'll contact you soon on WhatsApp.";
      successEl.classList.remove('hidden');
    }

    // Reset form
    form.reset();

    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(`https://wa.me/919392923516?text=${waText}`, '_blank');
    }, 800);
  });
}


/* =========================================================
   7. SMOOTH SCROLL for anchor links
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

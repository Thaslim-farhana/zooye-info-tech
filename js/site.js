/**
 * Zooye Info Technologies - Core Site JavaScript
 * Lightweight, fast, accessible micro-interactions and navigation
 */

(function () {
  'use strict';

  // Benign Chrome ResizeObserver notification warning suppression
  window.addEventListener('error', function (e) {
    if (e.message && e.message.includes('ResizeObserver loop')) {
      e.stopImmediatePropagation();
    }
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    initHeader();
    ensureMobileNavElements();
    initMobileNav();
    initFaqAccordion();
    initScrollReveals();
    initCounters();
  }

  // Header scroll appearance
  function initHeader() {
    const hdr = document.querySelector('header');
    if (!hdr) return;

    function handleScroll() {
      if (window.scrollY > 16) {
        hdr.classList.add('hdr-scrolled');
      } else {
        hdr.classList.remove('hdr-scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Ensure mobile nav button & drawer exist on every page
  function ensureMobileNavElements() {
    const navCta = document.querySelector('.nav-cta');
    if (navCta && !navCta.querySelector('.menu-btn')) {
      const btn = document.createElement('button');
      btn.className = 'menu-btn';
      btn.setAttribute('aria-label', 'Toggle navigation menu');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<span></span><span></span><span></span>';
      navCta.appendChild(btn);
    }

    let drawer = document.querySelector('.mobile-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.className = 'mobile-drawer';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      drawer.setAttribute('aria-label', 'Mobile Navigation');
      drawer.innerHTML = `
        <div class="mobile-drawer-content">
          <div class="mobile-nav-links">
            <a href="index.html">Home</a>
            <a href="services.html">Services</a>
            <div class="mobile-sub-group">
              <a href="service-custom-website-development.html">Custom Web Development</a>
              <a href="service-wordpress-development.html">WordPress &amp; WooCommerce</a>
              <a href="service-ai-chatbot-development.html">AI &amp; Automation</a>
              <a href="service-portal-platform-development.html">Portals &amp; Platforms</a>
              <a href="service-white-label-web-development.html">White Label Development</a>
            </div>
            <a href="services.html#white-label">White Label Partnerships</a>
            <a href="about.html">About Us</a>
            <a href="process.html">Our Process</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="faqs.html">FAQs</a>
            <a href="news-room.html">News Room</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="mobile-cta-row">
            <a href="contact.html" class="btn btn-primary" style="width:100%;">Get Free Consultation</a>
            <a href="https://wa.me/919361080448" class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" style="width:100%;">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zM12.05 20.2c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.43c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c0 4.54-3.7 8.24-8.23 8.24z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>`;
      document.body.appendChild(drawer);
    }
  }

  // Mobile navigation drawer toggle
  function initMobileNav() {
    const menuBtn = document.querySelector('.menu-btn');
    const drawer = document.querySelector('.mobile-drawer');
    if (!menuBtn || !drawer) return;

    function toggleMenu(forceClose) {
      const isOpen = forceClose === true ? false : !menuBtn.classList.contains('active');
      menuBtn.classList.toggle('active', isOpen);
      drawer.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking links inside drawer
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu(true);
      });
    });

    // Close when clicking outside drawer content
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) {
        toggleMenu(true);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        toggleMenu(true);
      }
    });
  }

  // FAQ Accordion
  function initFaqAccordion() {
    document.querySelectorAll('.faq-question, .faq-q').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        // Don't double toggle if onclick attribute exists
        const item = btn.closest('.faq-card') || btn.closest('.faq-item');
        if (!item) return;

        const isOpen = item.classList.contains('open');

        const parent = item.parentElement;
        if (parent && parent.dataset.accordionMode === 'single') {
          parent.querySelectorAll('.faq-card.open, .faq-item.open').forEach(function (openItem) {
            if (openItem !== item) openItem.classList.remove('open');
          });
        }

        item.classList.toggle('open', !isOpen);
      });
    });
  }
  /* ---------------- WORK MOSAIC (real photo when available, gradient fallback) ---------------- */
// Add a real project screenshot to assets/images/ with these filenames to
// replace a gradient tile. If the file is missing, that tile keeps its
// gradient + tag automatically — never an empty or broken image.
const mosaicItems = [
  { tag:"Real Estate", image:"assets/images/real-estate.jpg", grad:"linear-gradient(160deg,#0F2A44,#1C4A5C)" },
  { tag:"Education", image:"assets/images/education.jpg", grad:"linear-gradient(160deg,#0B2540,#3A6E7A)" },
  { tag:"Travel", image:"assets/images/travel.jpg", grad:"linear-gradient(160deg,#0E2038,#1F5C6B)" },
  { tag:"E-Commerce", image:"assets/images/ecommerce.jpg", grad:"linear-gradient(160deg,#0A0F1C,#25324A)" },
  { tag:"Healthcare", image:"assets/images/healthcare.jpg", grad:"linear-gradient(160deg,#122A3D,#1D5A52)" },
  { tag:"Food & Beverage", image:"assets/images/food.jpg", grad:"linear-gradient(160deg,#241417,#5C2A2A)" },
  { tag:"SaaS", image:"assets/images/saas.jpg", grad:"linear-gradient(160deg,#0D1B2E,#2E4C6B)" },
  { tag:"E-Commerce", image:"assets/images/ecommerce-2.jpg", grad:"linear-gradient(160deg,#1B1420,#4A2E4E)" },
];
function tileHTML(m){
  return `<div class="mosaic-tile"><img class="bg" src="${m.image}" alt="${m.tag} website project" loading="lazy" onerror="this.outerHTML='<div class=&quot;bg&quot; style=&quot;background:${m.grad}&quot;></div>'"><div class="fade"></div><span class="cap">${m.tag}</span></div>`;
}
// Each row gets a different slice of items, duplicated twice so the
// translateX(-50%) loop point lines up seamlessly with no visible seam.
const rows = [
  { id:'mosaic-row-1', items:[mosaicItems[0], mosaicItems[1], mosaicItems[2], mosaicItems[3]] },
  { id:'mosaic-row-2', items:[mosaicItems[4], mosaicItems[5], mosaicItems[6], mosaicItems[7]] },
  { id:'mosaic-row-3', items:[mosaicItems[2], mosaicItems[7], mosaicItems[0], mosaicItems[5]] },
];
rows.forEach(row => {
  const doubled = row.items.concat(row.items);
  document.getElementById(row.id).innerHTML = doubled.map(tileHTML).join('');
});


  // Scroll reveals
  function initScrollReveals() {
    const targets = [
      '.hero-grid > div > *',
      '.subhero .wrap > *',
      '.editorial-grid > *',
      '.services-showcase-grid > *',
      '.trust-pillars > *',
      '.whitelabel-banner > *',
      '.portfolio-grid > *',
      '.process-timeline > *',
      '.quality-grid > *',
      '.faq-container > *',
      '.final-cta-inner > *',
      '.fgrid > *',
      '.svc-list > *',
      '.value-grid > *',
      '.about-split > *',
      '.contact-grid > *',
      '.sec-head'
    ];

    targets.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (Math.min(i, 6) * 0.06) + 's';
      });
    });

    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('in-view');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  // Number count-up animation for stat numbers
  function initCounters() {
    if (prefersReducedMotion) return;

    const statElements = document.querySelectorAll('.stat b, .dark-stat-item b');
    if (!statElements.length) return;

    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const raw = el.textContent.trim();
          const match = raw.match(/^(\d+)(.*)$/);
          if (!match) return;

          const target = parseInt(match[1], 10);
          const suffix = match[2];
          const duration = 1200;
          const startTime = performance.now();

          function update(now) {
            const progress = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target + suffix;
            }
          }

          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    statElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

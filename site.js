/* ---------------- SITE-WIDE ANIMATIONS ---------------- */
(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto-tag common repeating groups so they fade/slide in with a stagger,
  // either on page load (above the fold) or on scroll (below the fold).
  const groups = [
    '.hero-grid > div > *',
    '.subhero .wrap > *',
    '.services-grid > *',
    '.svc-list > *',
    '.value-grid > *',
    '.why-grid > *',
    '.badge-bar > *',
    '.pgrid > *',
    '.job-list > *',
    '.faq-list > *',
    '.process-steps > *',
    '.stats > *',
    '.fgrid > *',
    '.about-split > *',
    '.contact-grid > *',
    '.svc-cat-head',
    '.sec-head',
    '.cta-inner > *',
    '.portfolio-filters',
    '.faq-cats',
  ];
  groups.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i, 6) * 0.07) + 's';
    });
  });

  if (reduceMotion){
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // Header gains a soft shadow once the page scrolls
  const hdr = document.querySelector('header');
  if (hdr){
    const onScroll = () => {
      if (window.scrollY > 12) hdr.classList.add('hdr-scrolled');
      else hdr.classList.remove('hdr-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }

  // Count-up animation for the stats bar (100+, 50+, 98%, 24/7, etc.)
  if (!reduceMotion){
    document.querySelectorAll('.stat b').forEach(el => {
      const raw = el.textContent.trim();
      const match = raw.match(/^(\d+)(.*)$/);
      if (!match) return;
      const target = parseInt(match[1], 10);
      const suffix = match[2];
      let started = false;
      const statIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !started){
            started = true;
            const duration = 1100;
            const startTime = performance.now();
            function tick(now){
              const p = Math.min(1, (now - startTime) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(target * eased) + suffix;
              if (p < 1) requestAnimationFrame(tick);
              else el.textContent = target + suffix;
            }
            requestAnimationFrame(tick);
            statIo.unobserve(entry.target);
          }
        });
      }, { threshold:0.4 });
      statIo.observe(el);
    });
  }
})();

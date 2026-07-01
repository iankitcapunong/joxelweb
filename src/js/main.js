/* The Joxel Group — interactions */
(function () {
  'use strict';
  const doc = document;
  const body = doc.body;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader (always dismisses; hard fallback) ---------- */
  const SHOT = /(?:\?|&)shot/.test(window.location.search);
  (function () {
    const pl = doc.querySelector('.preloader');
    if (!pl) return;
    if (SHOT) { pl.remove(); return; }
    let done = false;
    const hide = () => { if (done) return; done = true; pl.classList.add('done'); };
    window.addEventListener('load', () => setTimeout(hide, 350));
    // fallback so the screen never stays if load stalls
    setTimeout(hide, 1400);
    if (doc.readyState === 'complete') setTimeout(hide, 350);
  })();

  /* ---------- Header scroll state + progress ---------- */
  const header = doc.querySelector('.site-header');
  const progress = doc.querySelector('.scroll-progress');
  const toTop = doc.querySelector('.to-top');
  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 12);
    if (progress) {
      const h = doc.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------- Mobile drawer ---------- */
  const toggle = doc.querySelector('.nav-toggle');
  const closeBtn = doc.querySelector('.drawer-close');
  const backdrop = doc.querySelector('.drawer-backdrop');
  function closeMenu() { body.classList.remove('menu-open'); if (toggle) toggle.setAttribute('aria-expanded', 'false'); }
  function openMenu() { body.classList.add('menu-open'); if (toggle) toggle.setAttribute('aria-expanded', 'true'); }
  if (toggle) toggle.addEventListener('click', () => body.classList.contains('menu-open') ? closeMenu() : openMenu());
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  doc.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* Mobile accordion groups */
  doc.querySelectorAll('.m-top').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.m-group');
      const isOpen = group.classList.contains('open');
      doc.querySelectorAll('.m-group.open').forEach(g => { if (g !== group) g.classList.remove('open'); });
      group.classList.toggle('open', !isOpen);
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = doc.querySelectorAll('[data-reveal]');
  if (SHOT || reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- Subtle parallax on hero visual ---------- */
  if (!reduce) {
    const par = doc.querySelectorAll('[data-parallax]');
    if (par.length) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        par.forEach(el => {
          const speed = parseFloat(el.getAttribute('data-parallax')) || 0.08;
          el.style.transform = 'translateY(' + (y * speed) + 'px)';
        });
      }, { passive: true });
    }
  }

  /* ---------- Count-up stats ---------- */
  const stats = doc.querySelectorAll('[data-count]');
  if (SHOT || reduce) {
    stats.forEach(el => { el.textContent = Math.round(parseFloat(el.getAttribute('data-count'))) + (el.getAttribute('data-suffix') || ''); });
  } else if (stats.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0; const dur = 1400; const t0 = performance.now();
        function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        so.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach(s => so.observe(s));
  }

  /* ---------- Contact form (compose mailto, no backend) ---------- */
  const cform = doc.getElementById('joxelContactForm');
  if (cform) {
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      const fd = new FormData(cform);
      const get = n => (fd.get(n) || '').toString().trim();
      const sources = fd.getAll('source').join(', ');
      const first = get('first'), last = get('last');
      const note = doc.getElementById('formNote');
      if (!first || !last || !get('organization') || !get('request')) {
        if (note) { note.style.display = 'block'; note.style.color = 'var(--bronze)'; note.textContent = 'Please complete the required fields marked with an asterisk.'; }
        return;
      }
      const body = [
        'Name: ' + first + ' ' + last,
        'Organization: ' + get('organization'),
        'Preferred Method of Contact: ' + get('preferred'),
        'Email: ' + get('email'),
        'Phone Number: ' + get('phone'),
        'Where did you hear about us?: ' + sources,
        '',
        'Request:',
        get('request'),
      ].join('\n');
      const subject = 'Website Inquiry from ' + first + ' ' + last;
      window.location.href = 'mailto:info@thejoxelgroup.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (note) { note.style.display = 'block'; note.style.color = 'var(--sage-deep)'; note.textContent = 'Thank you! Your email client will open to send your message.'; }
    });
  }
})();

/**
 * BARBERÍAS MINERVA — script.js
 * Comportamiento: loader, nav scroll, reveal on scroll,
 * mobile menu, sticky WA, back-to-top, microinteracciones.
 * Sin dependencias externas. Vanilla JS moderno.
 */

/* ── HELPERS ────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── 1. LOADER ──────────────────────────────────────── */
(function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  // Mínimo 1.6s para que se vea la animación, máximo cuando carga la página
  const minDelay = 1600;
  const start = Date.now();

  function hideLoader() {
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, minDelay - elapsed);

    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');

      loader.addEventListener('transitionend', () => {
        loader.remove();
        // Disparar reveals iniciales después del loader
        revealOnScreen();
      }, { once: true });
    }, remaining);
  }

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader, { once: true });
  }
})();

/* ── 2. NAVEGACIÓN — scroll state & smooth ──────────── */
(function initNav() {
  const header = $('#header');
  const toggle = $('#navToggle');
  const menu   = $('#navMenu');
  if (!header) return;

  // Scroll state
  let ticking = false;
  function updateNav() {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  updateNav();

  // Mobile toggle
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Cerrar al hacer clic en link
    $$('.nav-link', menu).forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
      });
    });

    // Cerrar con ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    // Cerrar al clicar fuera
    document.addEventListener('click', e => {
      if (menu.classList.contains('open') &&
          !menu.contains(e.target) &&
          !toggle.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link on scroll
  const sections = $$('section[id], main > section[id]');
  const navLinks = $$('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { threshold: 0.3, rootMargin: `-${header.offsetHeight}px 0px 0px 0px` });

  sections.forEach(sec => sectionObserver.observe(sec));
})();

/* ── 3. REVEAL ON SCROLL ────────────────────────────── */
function revealOnScreen() {
  const reveals = $$('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// Se llama también inmediatamente en caso de que el loader ya esté oculto
if (!document.body.classList.contains('loading')) {
  revealOnScreen();
}

/* ── 4. STICKY WHATSAPP ─────────────────────────────── */
(function initWaSticky() {
  const btn = $('#waSticky');
  if (!btn) return;

  let visible = false;

  function updateWa() {
    const show = window.scrollY > 400;
    if (show === visible) return;
    visible = show;
    btn.classList.toggle('visible', show);
  }

  window.addEventListener('scroll', updateWa, { passive: true });
  updateWa();
})();

/* ── 5. BACK TO TOP ─────────────────────────────────── */
(function initBackTop() {
  const btn = $('#backTop');
  if (!btn) return;

  let visible = false;

  function updateBtn() {
    const show = window.scrollY > 500;
    if (show === visible) return;
    visible = show;
    btn.classList.toggle('visible', show);
  }

  window.addEventListener('scroll', updateBtn, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  updateBtn();
})();

/* ── 6. SMOOTH SCROLL para anclas internas ──────────── */
(function initSmoothScroll() {
  const header = $('#header');
  const navH = header ? header.offsetHeight : 72;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── 7. PARALLAX SUTIL en hero ──────────────────────── */
(function initParallax() {
  // Solo en desktop y si no hay preferencia de movimiento reducido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 900) return;

  const emblem = $('.hero-emblem');
  const particles = $$('.particle');
  if (!emblem) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      emblem.style.transform = `translateY(${sy * 0.06}px)`;
      particles.forEach((p, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        p.style.transform = `translateY(${sy * 0.03 * dir}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

/* ── 8. HOVER CARDS — tilt 3D sutil ────────────────── */
(function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  const cards = $$('.service-card, .exp-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── 9. COUNTER ANIMATION en stats del hero ─────────── */
(function initCounters() {
  const statsBlock = $('.hero-stats');
  if (!statsBlock) return;

  const observed = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observed.unobserve(entry.target);

      $$('.stat-val', entry.target).forEach(el => {
        const raw = el.textContent.trim();
        const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
        const suffix = raw.replace(/[0-9.]/g, '');
        if (isNaN(num)) return;

        let start = 0;
        const dur = 1200;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3); // ease out cubic
          el.textContent = (Math.round(num * ease * 10) / 10) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      });
    });
  }, { threshold: 0.5 });

  observed.observe(statsBlock);
})();

/* ── 10. PRELOAD WhatsApp link on hover ─────────────── */
(function prefetchWa() {
  const waLinks = $$('a[href*="wa.me"]');
  waLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      // Prefetch hint para el primer hover
      if (!link.dataset.prefetched) {
        link.dataset.prefetched = true;
      }
    }, { once: true });
  });
})();

/* ── 11. INTERSECTION para animación de la barra del loader ─ */
// Asegurar que si el loader ya removió, los reveals se activen
document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('loading')) {
    setTimeout(revealOnScreen, 100);
  }
});

/* ── 12. LOG de carga (desarrollo) ─────────────────── */
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  if (perfData) {
    // console.log(`⚡ Minerva cargado en ${Math.round(perfData.loadEventEnd)}ms`);
  }
});

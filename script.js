/* ═══════════════════════════════════════
   SAGUN SIGDEL — PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════ */

'use strict';

/* ─── 1. PRELOADER ─── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hide');
    document.body.classList.add('loaded');
  }, 900);
});

/* ─── 2. NAVBAR ─── */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link');

// Scroll → sticky bg
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateScrollTopBtn();
  updateActiveLink();
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  allNavLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ─── 3. TYPING ANIMATION ─── */
const typedEl = document.getElementById('typed-text');
const roles   = [
  'elegant UIs.',
  'AI solutions.',
  'full-stack apps.',
  'accessible tools.',
  'the future.',
];
let roleIdx   = 0;
let charIdx   = 0;
let deleting  = false;
let typingTimeout;

function typeRole() {
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      typingTimeout = setTimeout(typeRole, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
  }

  typingTimeout = setTimeout(typeRole, deleting ? 55 : 90);
}

// Start typing after hero animates in
setTimeout(typeRole, 1100);

/* ─── 4. SCROLL-TO-TOP BUTTON ─── */
const scrollTopBtn = document.getElementById('scroll-top');

function updateScrollTopBtn() {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── 5. INTERSECTION OBSERVER — SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Skill bars: trigger fill when parent is revealed
      const bars = entry.target.querySelectorAll('.bar-fill');
      bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

/* ─── 6. PROJECT FILTER ─── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.category === filter;

      if (match) {
        card.classList.remove('hidden');
        // Re-trigger stagger animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          }, i * 60);
        });
      } else {
        card.classList.add('hidden');
        card.style.opacity   = '';
        card.style.transform = '';
        card.style.transition = '';
      }
    });
  });
});

/* ─── 7. CONTACT FORM ─── */
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending…</span>';

    // Simulated send delay
    setTimeout(() => {
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = `<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1200);
  });
}

/* ─── 8. PARALLAX ORB ─── */
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-bg-orb');
  const cx   = window.innerWidth  / 2;
  const cy   = window.innerHeight / 2;
  const dx   = (e.clientX - cx) / cx;
  const dy   = (e.clientY - cy) / cy;

  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 12;
    orb.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
}, { passive: true });

/* ─── 9. SMOOTH BUTTON CLICK ─── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('pointerdown', () => {
    btn.style.transform = 'scale(0.97)';
  });
  btn.addEventListener('pointerup', () => {
    btn.style.transform = '';
  });
  btn.addEventListener('pointerleave', () => {
    btn.style.transform = '';
  });
});
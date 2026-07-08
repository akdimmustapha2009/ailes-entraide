/* ============================================================
   AILES ENTRAIDE – main.js
   ============================================================ */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark" style="color:#fff;font-size:1.4rem"></i>'
    : '<span></span><span></span><span></span>';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
  });
});

// --- Counter animation ---
function animateCounter(el) {
  const target   = +el.dataset.target;
  const duration = 2000;
  const step     = target / (duration / 16);
  let   current  = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}

const counters = document.querySelectorAll('.stat-number, .impact-number');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// --- Back to top ---
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Contact form ---
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Message envoyé !';
  btn.style.background = 'linear-gradient(135deg, #1A6B4A, #2A8A60)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
});

// --- Don : sélection montant ---
document.querySelectorAll('.don-amount-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.don-amount-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const amount = btn.dataset.amount;
    const input = document.getElementById('donMontant');
    if (input) input.value = amount === 'libre' ? '' : amount;
    if (amount === 'libre' && input) input.focus();
  });
});

// ============================================================
//  SCROLL ANIMATIONS
// ============================================================

// Définit les variantes d'animation disponibles
const animVariants = {
  'fade-up':    { from: 'opacity:0;transform:translateY(40px)',  to: 'opacity:1;transform:translateY(0)' },
  'fade-down':  { from: 'opacity:0;transform:translateY(-40px)', to: 'opacity:1;transform:translateY(0)' },
  'fade-left':  { from: 'opacity:0;transform:translateX(-50px)', to: 'opacity:1;transform:translateX(0)' },
  'fade-right': { from: 'opacity:0;transform:translateX(50px)',  to: 'opacity:1;transform:translateX(0)' },
  'zoom-in':    { from: 'opacity:0;transform:scale(0.85)',        to: 'opacity:1;transform:scale(1)' },
  'flip-up':    { from: 'opacity:0;transform:rotateX(20deg) translateY(30px)', to: 'opacity:1;transform:rotateX(0) translateY(0)' },
};

function applyFrom(el, variant) {
  variant.from.split(';').forEach(rule => {
    const [prop, val] = rule.split(':');
    el.style[prop.trim().replace(/-([a-z])/g, (_, l) => l.toUpperCase())] = val.trim();
  });
}
function applyTo(el, variant) {
  variant.to.split(';').forEach(rule => {
    const [prop, val] = rule.split(':');
    el.style[prop.trim().replace(/-([a-z])/g, (_, l) => l.toUpperCase())] = val.trim();
  });
}

// Éléments à animer et leur variante
const animTargets = [
  // Sections entières (titre + tag)
  { sel: '.section-header',        anim: 'fade-up',    delay: 0 },

  // À propos
  { sel: '.about-visual',          anim: 'fade-left',  delay: 0 },
  { sel: '.about-text',            anim: 'fade-right', delay: 100 },
  { sel: '.value-item',            anim: 'fade-up',    delay: 80, stagger: true },

  // Équipe
  { sel: '.team-card',             anim: 'zoom-in',    delay: 100, stagger: true },

  // Mission cards
  { sel: '.mission-card',          anim: 'fade-up',    delay: 80,  stagger: true },

  // Nos actions / programmes
  { sel: '.prog-block',            anim: 'fade-up',    delay: 100, stagger: true },
  { sel: '.gallery-grid',          anim: 'zoom-in',    delay: 0 },
  { sel: '.prog-cta',              anim: 'fade-up',    delay: 0 },

  // Impact
  { sel: '.impact-card',           anim: 'zoom-in',    delay: 80,  stagger: true },

  // Podcast
  { sel: '.pod-episode',           anim: 'fade-up',    delay: 70,  stagger: true },
  { sel: '.pod-platform-card',     anim: 'zoom-in',    delay: 80,  stagger: true },

  // Soutenir
  { sel: '.support-card',          anim: 'fade-up',    delay: 80,  stagger: true },

  // Don
  { sel: '.don-form-wrap',         anim: 'fade-up',    delay: 0 },
  { sel: '.don-autre-card',        anim: 'fade-up',    delay: 100, stagger: true },
  { sel: '.don-sadaqa',            anim: 'zoom-in',    delay: 0 },

  // Vidéos
  { sel: '.vid-featured',          anim: 'fade-up',    delay: 0 },
  { sel: '.vid-card',              anim: 'zoom-in',    delay: 80,  stagger: true },
  { sel: '.vid-cta',               anim: 'fade-up',    delay: 0 },

  // Contact
  { sel: '.contact-info',          anim: 'fade-left',  delay: 0 },
  { sel: '.contact-form-wrap',     anim: 'fade-right', delay: 100 },

  // Réseaux sociaux
  { sel: '.social-card',           anim: 'zoom-in',    delay: 80,  stagger: true },
];

const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.revealed) {
      entry.target.dataset.revealed = 'true';
      const delay = +entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.style.transition = 'opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1)';
        applyTo(entry.target, animVariants[entry.target.dataset.anim || 'fade-up']);
      }, delay);
    }
  });
}, { threshold: 0.12 });

animTargets.forEach(({ sel, anim, delay, stagger }) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.dataset.anim  = anim;
    el.dataset.delay = stagger ? delay * i : delay;
    applyFrom(el, animVariants[anim]);
    scrollObserver.observe(el);
  });
});

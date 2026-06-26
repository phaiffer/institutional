// ── NAV: scroll effect ───────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── HERO CANVAS: partículas conectadas ───────────────────
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 55;
const CONNECT_DIST = 140;
const BRAND_BLUE = '#1a6fd4';
const ACCENT = '#2e8ff5';

function resize() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function makeParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5,
  };
}

function initParticles() {
  particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
}

function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // update positions
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  // draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECT_DIST) {
        const alpha = (1 - dist / CONNECT_DIST) * 0.35;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(26,111,212,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // draw dots
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = ACCENT;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(drawFrame);
}

window.addEventListener('resize', () => { resize(); initParticles(); }, { passive: true });
resize();
initParticles();
drawFrame();

// ── SCROLL REVEAL ───────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── FORM SUBMIT ─────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome    = document.getElementById('nome').value;
  const email   = document.getElementById('email').value;
  const assunto = document.getElementById('assunto').value || 'Contato via site';
  const msg     = document.getElementById('mensagem').value;
  window.location.href = `mailto:willian.phaifferc@outlook.com`
    + `?subject=${encodeURIComponent(assunto)}`
    + `&body=${encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\n${msg}`)}`;
});
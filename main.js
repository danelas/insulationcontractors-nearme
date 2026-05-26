// === Insulation Contractors Near Me — interactions ===

// Footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// Inject the gradient def for the HUD ring (kept out of the template HTML for clarity)
(() => {
  const ring = document.querySelector('.ring svg');
  if (!ring) return;
  const ns = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(ns, 'defs');
  const lg = document.createElementNS(ns, 'linearGradient');
  lg.setAttribute('id', 'ringGrad');
  lg.setAttribute('x1', '0'); lg.setAttribute('y1', '0');
  lg.setAttribute('x2', '120'); lg.setAttribute('y2', '120');
  lg.setAttribute('gradientUnits', 'userSpaceOnUse');
  const s1 = document.createElementNS(ns, 'stop');
  s1.setAttribute('offset', '0'); s1.setAttribute('stop-color', '#7cf6ff');
  const s2 = document.createElementNS(ns, 'stop');
  s2.setAttribute('offset', '1'); s2.setAttribute('stop-color', '#ffb547');
  lg.appendChild(s1); lg.appendChild(s2);
  defs.appendChild(lg);
  ring.prepend(defs);
  const fg = ring.querySelector('.ring-fg');
  if (fg) fg.setAttribute('stroke', 'url(#ringGrad)');
})();

// IntersectionObserver reveal-on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Card pointer-aware glow
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// Animated number counters for the stats band
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  if (!Number.isFinite(target)) return;
  const dur = 1400;
  const t0 = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      animateCount(e.target);
      countIO.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));

// Toast helper
const toast = (msg) => {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 3800);
};

// Quote form — friendly client-side handler (no backend yet)
const form = document.getElementById('quote');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const zip = form.zip.value.trim();
  const service = form.service.value;
  if (!/^\d{5}$/.test(zip)) {
    form.zip.focus();
    toast('Please enter a valid 5-digit ZIP.');
    return;
  }
  if (!service) {
    form.service.focus();
    toast('Pick a service so we can match you.');
    return;
  }
  toast(`Matching you with insulation pros in ${zip}…`);
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span>Searching…</span>';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = original;
    toast('3 contractors near you — check your phone shortly.');
  }, 1600);
});

// Smooth scroll for in-page anchors (CSS handles modern browsers; this adds focus management)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const tgt = document.querySelector(id);
    if (!tgt) return;
    e.preventDefault();
    tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    tgt.setAttribute('tabindex', '-1');
    tgt.focus({ preventScroll: true });
  });
});

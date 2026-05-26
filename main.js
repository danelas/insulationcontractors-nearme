// === Insulation Contractors Near Me — Nationwide ===

// Footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// Offer-end date = "this Sunday"
(() => {
  const el = document.getElementById('offerDate');
  if (!el) return;
  const d = new Date();
  const daysUntilSunday = (7 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + daysUntilSunday);
  el.textContent = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
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

// Toast helper
const toast = (msg, ms = 3800) => {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), ms);
};

// Phone number formatter — formats as the user types
const phone = document.getElementById('phone');
phone?.addEventListener('input', (e) => {
  const d = e.target.value.replace(/\D/g, '').slice(0, 10);
  let out = d;
  if (d.length > 6) out = `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  else if (d.length > 3) out = `(${d.slice(0,3)}) ${d.slice(3)}`;
  else if (d.length > 0) out = `(${d}`;
  e.target.value = out;
});

// Lead form submit (replace endpoint with your CRM / Formspree / Make.com webhook)
const form = document.getElementById('leadForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  if (!/^\d{5}$/.test(data.zip)) { form.zip.focus(); toast('Please enter a valid 5-digit ZIP.'); return; }
  if (!data.service) { form.service.focus(); toast('Pick a service so we can match you.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { form.email.focus(); toast('Please enter a valid email.'); return; }
  const phoneDigits = (data.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10) { form.phone.focus(); toast('Please enter a valid phone number.'); return; }

  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span>Sending…</span>';

  // TODO: wire to your endpoint — Formspree, Make.com, HubSpot, Twilio Studio, etc.
  // Example:
  // await fetch('https://formspree.io/f/XXXX', { method:'POST', headers:{Accept:'application/json'}, body: new FormData(form) });
  await new Promise((r) => setTimeout(r, 1200));

  btn.disabled = false;
  btn.innerHTML = '<span>✓ Sent — we\'ll call you in 30 minutes →</span>';
  toast(`Thanks ${data.fname}! A local insulation pro in ${data.zip} will call you within 30 minutes.`, 5000);
  setTimeout(() => { btn.innerHTML = original; form.reset(); }, 4500);
});

// === Live activity pop (social proof) ===
const livePopups = [
  { who: 'Marcus from Austin, TX', what: 'just booked a spray foam install', mins: 3, init: 'M' },
  { who: 'Sandra from Denver, CO', what: 'requested an attic insulation quote', mins: 8, init: 'S' },
  { who: 'Jose from Phoenix, AZ', what: 'scheduled a free thermal scan', mins: 14, init: 'J' },
  { who: 'Patricia from Chicago, IL', what: 'received a quote for soundproofing', mins: 21, init: 'P' },
  { who: 'Diego from Atlanta, GA', what: 'just booked attic insulation', mins: 28, init: 'D' },
  { who: 'Tatiana from Seattle, WA', what: 'requested an in-home estimate', mins: 35, init: 'T' },
  { who: 'Kevin from Boston, MA', what: 'started a whole-home spray foam job', mins: 42, init: 'K' },
  { who: 'Renee from Nashville, TN', what: 'booked insulation removal + reinstall', mins: 49, init: 'R' },
  { who: 'Aaron from Portland, OR', what: 'just booked a free assessment', mins: 56, init: 'A' },
  { who: 'Linda from Minneapolis, MN', what: 'requested commercial insulation', mins: 63, init: 'L' },
];
const popEl = document.getElementById('livePop');
let popIdx = 0;
const showLivePop = () => {
  if (!popEl) return;
  const p = livePopups[popIdx % livePopups.length];
  popIdx++;
  popEl.innerHTML = `
    <span class="av">${p.init}</span>
    <span><b>${p.who}</b> ${p.what}<small>${p.mins} minutes ago · Verified ✓</small></span>
  `;
  popEl.classList.add('show');
  setTimeout(() => popEl.classList.remove('show'), 6000);
};
setTimeout(showLivePop, 7000);
setInterval(showLivePop, 16000);

// === Savings calculator ===
const sqftEl = document.getElementById('sqft');
const billEl = document.getElementById('bill');
const sqftValEl = document.getElementById('sqftVal');
const billValEl = document.getElementById('billVal');
const msEl = document.getElementById('ms');
const ysEl = document.getElementById('ys');
const tsEl = document.getElementById('ts');
const pbEl = document.getElementById('pb');

const fmtMoney = (n) => '$' + Math.round(n).toLocaleString();
const setRangeBg = (el) => {
  const min = +el.min, max = +el.max, val = +el.value;
  el.style.setProperty('--p', `${((val - min) / (max - min)) * 100}%`);
};

const updateCalc = () => {
  if (!sqftEl || !billEl) return;
  setRangeBg(sqftEl); setRangeBg(billEl);
  const sqft = +sqftEl.value;
  const bill = +billEl.value;
  sqftValEl.textContent = sqft.toLocaleString();
  billValEl.textContent = bill.toLocaleString();

  // Avg 35% reduction post-upgrade; weight slightly by sq ft.
  const reduction = 0.32 + Math.min(0.10, sqft / 60000);
  const monthly = bill * reduction;
  const annual = monthly * 12;
  const tenYr = annual * 10;
  const cost = Math.max(1800, sqft * 1.85); // rough project cost
  const payback = cost / annual;

  msEl.textContent = fmtMoney(monthly);
  ysEl.textContent = fmtMoney(annual);
  tsEl.textContent = fmtMoney(tenYr);
  pbEl.textContent = payback.toFixed(1) + ' yrs';
};
sqftEl?.addEventListener('input', updateCalc);
billEl?.addEventListener('input', updateCalc);
updateCalc();

// Smooth scroll & focus management
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

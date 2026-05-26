# Insulation Contractors Near Me

A conversion-focused landing site for a **nationwide insulation contractor network** — matches homeowners and businesses with vetted local pros in any US ZIP. Pure static HTML/CSS/JS — no build step.

## Conversion features built in
- **Sticky top phone bar** + click-to-call (mobile sticky CTA at bottom too)
- **Above-the-fold lead form** with phone auto-formatter & inline validation
- **5-star social proof** + 4,820 review counter in hero
- **Limited-time offer banner** ($299 off, auto-updating deadline)
- **Pain points** — high bills, two-story heat, drafts, storm resilience
- **Live savings calculator** — sliders for home size + current bill → monthly / annual / 10-yr savings + payback
- **Live activity popups** — "Marcus from Austin, TX just booked…" (rotates through 10 metros)
- **Nationwide coverage grid** — top US metros + regional coverage breakdown
- **Real-style reviews** from cities across the country (Phoenix, Indianapolis, Asheville, Chicago, Denver, Portland)
- **Honest FAQ** — pricing, rebates (25C), warranty, safety, condos/HOAs
- **`Service` JSON-LD schema** with nationwide `areaServed`
- **Phone-first design** — every section has a "Call Now" or "Get Quote" CTA

## Stack
- HTML5 / modern CSS (grid, custom properties, backdrop-filter)
- ES2020 vanilla JS (~150 lines, no deps)
- Google Fonts: Plus Jakarta Sans + Inter

## Files
- `index.html` — single-page site
- `styles.css` — light, professional theme (navy + amber)
- `main.js` — form handling, calculator, social-proof loop, scroll reveals

## Wire up the lead form
In `main.js`, the form currently fakes a submit. Replace with your endpoint:

```js
await fetch('https://formspree.io/f/XXXXXX', {
  method: 'POST',
  headers: { Accept: 'application/json' },
  body: new FormData(form)
});
```

Recommended integrations:
- [Formspree](https://formspree.io) — simplest, $0 to start
- [Make.com](https://make.com) webhook → Twilio SMS + Google Sheet + Gmail
- [HubSpot Forms](https://hubspot.com) embed if you're running a CRM

## Customize for your business
1. Replace `1-800-555-0199` everywhere with your real number (search-and-replace).
2. Update the offer text in `index.html` → `#offer` section.
3. Drop real reviews + city names into the testimonials grid.
4. Brand colors live as CSS variables at the top of `styles.css` (`--navy`, `--amber`, `--green`).

## Deploy
Drop the folder on any static host — GitHub Pages, Netlify, Vercel, Cloudflare Pages.

### GitHub Pages
1. Push to `main`.
2. Settings → Pages → Source: `main` / root → Save.
3. Custom domain → point your DNS A/CNAME at GitHub's IPs.

## License
MIT.

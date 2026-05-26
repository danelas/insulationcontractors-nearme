# Insulation Contractors — Fort Lauderdale & Miami

A conversion-focused landing site for an insulation contractor targeting **Fort Lauderdale, Miami, and all of South Florida**. Pure static HTML/CSS/JS — no build step.

## Conversion features built in
- **Sticky top phone bar** + click-to-call (mobile sticky CTA at bottom too)
- **Above-the-fold lead form** with phone auto-formatter & inline validation
- **5-star social proof** + 487 review counter in hero
- **Limited-time offer banner** ($299 off, auto-updating deadline date)
- **Florida-specific pain points** — FPL bills, two-story heat, humidity, hurricane code
- **Live savings calculator** — sliders for home size + current AC bill → monthly / annual / 10-yr savings + payback
- **Live activity popups** — "Marcus from Fort Lauderdale just booked…" (social proof loop)
- **Service area grid** — all Broward + Miami-Dade cities
- **Real local reviews** with city names (Coral Springs, Doral, Miami Shores, Sunny Isles, Hollywood, Pembroke Pines)
- **Florida-specific FAQ** — FPL/Duke rebates, spray foam in humidity, HOA/condo COIs
- **`HVACBusiness` JSON-LD schema** with full NAP + areaServed list
- **Phone-first design** — every section has a "Call Now" or "Get Quote" CTA

## Stack
- HTML5 / modern CSS (grid, custom properties, backdrop-filter)
- ES2020 vanilla JS (~150 lines, no deps)
- Google Fonts: Plus Jakarta Sans + Inter

## Files
- `index.html` — single-page site
- `styles.css` — light, professional theme (navy + amber, FL-trustworthy palette)
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
1. Replace `(954) 555-0199` everywhere with your real number (search-and-replace).
2. Update license number (`CCC#1234567`) and address (`500 E Broward Blvd…`).
3. Swap the offer text in `index.html` → `#offer` section.
4. Drop real reviews + city names into the testimonials grid.
5. Brand colors live as CSS variables at the top of `styles.css` (`--navy`, `--amber`, `--green`).

## Deploy
Drop the folder on any static host — GitHub Pages, Netlify, Vercel, Cloudflare Pages.

### GitHub Pages
1. Push to `main`.
2. Settings → Pages → Source: `main` / root → Save.
3. Custom domain → point your DNS A/CNAME at GitHub's IPs.

## License
MIT.

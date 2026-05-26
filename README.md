# Insulation Contractors Near Me

A modern, futuristic landing site for a nationwide insulation contractor directory. Pure static HTML/CSS/JS — no build step, no dependencies.

## Stack
- Vanilla HTML5, CSS3 (custom properties, grid, backdrop-filter), ES2020 JS
- Google Fonts: Space Grotesk + Inter
- Inline SVG icons (no icon font / no external requests beyond fonts)

## Files
- `index.html` — single-page landing
- `styles.css` — futuristic dark theme: glassmorphism, animated orbs, grid backdrop, gradient accents
- `main.js` — scroll reveals, animated stats, card pointer-glow, quote-form handler

## Local preview
Just open `index.html` in a browser, or run any static server:

```bash
npx serve .
# or
python -m http.server 8000
```

## Deploy
Drop the folder on any static host — GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3 + CloudFront.

### GitHub Pages
1. Push to `main`.
2. Settings → Pages → Source: `main` / root → Save.

## Customization
- Brand colors live as CSS variables at the top of `styles.css` (`--cyan`, `--amber`, `--violet`).
- Quote form posts nowhere yet — wire `main.js`'s `form.addEventListener('submit', …)` to your CRM or lead API.

## License
MIT.

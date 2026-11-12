# Verlynk — Polish landing page

The Polish marketing site for Verlynk, an AI-agent platform for social media. The page presents the Content Agent, Inbox Agent, Brand Brain and client approvals, shows pricing, a mobile app section and an FAQ, and links visitors to signup on the main Verlynk service. The site is built with Astro as a fully static build with GSAP-driven motion and Lenis smooth scrolling.

## Quick start

```sh
npm install
npm run dev      # development server at http://localhost:4321
npm run build    # production build in dist/ (Astro build + JS/CSS minification)
npm run preview  # serve the production build locally
```

Always judge performance (Lighthouse) against `npm run preview` or the deployed site, never against the dev server — the dev server injects its own client code and serves unminified assets.

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page: hero, agent showcases with scroll-driven stages, services, process, mobile app, pricing, FAQ, contact CTA |
| `/polityka-prywatnosci/` | Privacy policy (20-section accordion) |
| `/regulamin/` | Terms of service (24-section accordion) |
| `/pliki-cookies/` | Cookie policy (10-section accordion) |
| `/zwroty-i-reklamacje/` | Returns and complaints (7-section accordion) |
| `404` | Custom Polish 404 page with a return button |

## Content management

Every text on the site lives in a single file: `src/content.json`. Components only render values from it — to change copy, a link, an image path or SEO texts, edit that file. Sections are keyed (`top`, `work`, `services`, `process`, `app`, `notes` for pricing, `faq`, `contact`, `approach`), and each legal page has its own block (`privacy`, `terms`, `cookies`, `returns`, `notfound`).

## SEO and AI discovery

- Per-page Polish titles, descriptions, canonicals (`https://verlynk.pl`), Open Graph and Twitter cards with a 1200×630 share image.
- schema.org JSON-LD on the homepage: Organization, WebSite, SoftwareApplication (with the three PLN plans) and a FAQPage generated automatically from the FAQ entries in `content.json`.
- `public/sitemap.xml` and `public/robots.txt` for crawlers.
- `public/llms.txt` and `public/ai-catalog.json` (also mirrored at `public/.well-known/ai-catalog.json`) for AI agents and registries. Keep the two catalog copies in sync when editing.

## Deployment

The build is fully static: deploy the contents of `dist/` to any static host or VPS (for example nginx). Notes for production:

- Serve over HTTPS on `verlynk.pl` so canonical and Open Graph URLs match.
- Point error handling at the custom page: nginx `error_page 404 /404.html;` (Apache: `ErrorDocument 404 /404.html`).
- Enable text compression (gzip or Brotli) for HTML, JS and CSS.
- The contact form section is intentionally disabled; primary CTAs link to `https://verlynk.com/signup`, and footer links lead to the main Verlynk service and documentation.

## Tech and behavior notes

- Astro with zero server runtime; the production build minifies the shipped JS and CSS via esbuild (`scripts/minify.mjs`), while sources stay readable.
- The main stylesheet is inlined into each page at build time; fonts (Geist and Geist Mono) are bundled locally as WOFF2 with no external font requests.
- Light/dark theme follows the visitor's device preference by default; the header toggle stores a manual choice that overrides it. The accent color is fixed.
- Motion runs on GSAP with ScrollTrigger and SplitText plus Lenis. Agent showcases present three scroll-driven stages per slide on desktop (pinned) and on mobile/tablet (scrubbed).

## Project structure

```
public/
  fonts/          Bundled Geist fonts
  img/            Logo, favicon, platform logos, app image, store badges, share preview
  site.css        Main stylesheet (inlined at build)
  site.js         Animation library bundle + site behavior
  sitemap.xml     Sitemap for verlynk.pl
  robots.txt      Crawler rules with sitemap reference
  llms.txt        Summary for AI crawlers
  ai-catalog.json AI resource catalog (mirror in .well-known/)
src/
  components/     Page sections (header, hero, agents, app, pricing, FAQ, footer, ...)
  layouts/
    Base.astro    HTML shell, SEO meta, theme bootstrap
  pages/          Routes listed above
  content.json    All site copy
scripts/
  minify.mjs      Post-build minification of dist assets
astro.config.mjs
package.json
```

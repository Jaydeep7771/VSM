# vSM Innovators — website

Marketing site for **vSM Innovators**, a luxury interior design studio in Punjab
serving Jalandhar, Ludhiana and Amritsar.

Single-page React application with real routes, built on a strict black / white /
gray design system.

## Stack

| Concern  | Choice                            |
| -------- | --------------------------------- |
| Build    | Vite 5                            |
| UI       | React 18 + TypeScript (strict)    |
| Styling  | Tailwind CSS v4 (`@theme` tokens) |
| Routing  | React Router 6                    |
| Fonts    | Inter (UI) + Newsreader (display) |
| Hosting  | Vercel                            |

## Getting started

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

The dev server runs at <http://localhost:5173>.

### Scripts

| Command           | Does                                        |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start the dev server with HMR               |
| `npm run build`   | Type-check, then build to `dist/`           |
| `npm run preview` | Serve the production build locally          |
| `npm run lint`    | Type-check only (no emit)                   |

## Project structure

```
.
├─ public/
│  ├─ hero/                 Hero photography (web-optimised JPEG)
│  └─ robots.txt
├─ src/
│  ├─ data/site.ts          All site copy — the single source of truth
│  ├─ lib/useReveal.ts      Scroll-reveal hook
│  ├─ components/
│  │  ├─ Primitives.tsx     Reveal, WordReveal, ImageSlot, buttons, headers
│  │  ├─ Header.tsx         Fixed header, nav, full-screen menu, scroll progress
│  │  ├─ Footer.tsx         Footer and closing CTA band
│  │  └─ WhatsAppButton.tsx Floating "Chat with us" action
│  ├─ pages/                One file per route
│  ├─ App.tsx               Routes, layout, scroll restoration
│  └─ index.css             Design tokens and component classes
├─ design-source/           Original single-file HTML design + source PNGs
├─ .github/workflows/ci.yml Type-check and build on push / PR
└─ vercel.json              SPA rewrites, caching, security headers
```

`design-source/` is reference material only — it is not part of the build.

## Design system

Black, white and gray only. Tokens are declared in `src/index.css` under
`@theme` and are available as Tailwind colors:

`ink` `ink-soft` `graphite` `slate` `ash` `silver` `line` `hairline` `mist`
`paper` `white`

Component classes: `.eyebrow` (uppercase micro-labels, `.eyebrow-rule` adds a
leading hairline), `.display` (large serif headings), `.serif-sm`, `.body-copy`,
`.lede`, `.btn` + variants, `.link-quiet`, `.rule`, `.shell` (page gutter).

Photography is desaturated to match the palette. To restore the original
warmth, change one variable in `src/index.css`:

```css
.photo-mono {
  --photo-saturate: 0; /* 0 = monochrome, 1 = full original color */
}
```

## Deploying to Vercel

The repository is zero-config: import it in Vercel and the Vite preset is
detected automatically. `vercel.json` supplies the rest.

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository.
3. Leave the framework preset (Vite), build command and output directory as
   detected. No environment variables are required.
4. Deploy.

`vercel.json` handles the parts a static host would otherwise get wrong:

- **SPA rewrites** — routes such as `/portfolio/haveli-lane-residence` are
  client-side only. Every non-asset path is rewritten to `/index.html`, so a
  direct visit or a page refresh does not 404.
- **Immutable caching** for hashed assets and hero imagery.
- **Security headers** — `nosniff`, `SAMEORIGIN`, a strict referrer policy and
  a restrictive permissions policy.

## Before launch

1. **Content** — replace the bracketed placeholders in `src/data/site.ts`
   (`[Founder Name]`, `[Studio address]`, phone, awards) and in the JSON-LD
   block in `index.html`.
2. **Photography** — `ImageSlot` renders a labelled placeholder wherever no
   `src` is supplied; pass one to render a real photo. Alt text is already
   written for every slot.
3. **Form** — `src/pages/Contact.tsx` currently shows a success state locally.
   Point `handleSubmit` at the studio's form endpoint or CRM.
4. **Journal** — entries link to `#`; wire them to real routes or a CMS.
5. **Domain** — add the custom domain in Vercel and update the canonical URL in
   the JSON-LD block and `public/robots.txt`.

# Local context — not committed

## Paths
- Portfolio repo: ~/projects/_public/portfolio/CoquardBalthazar.github.io  (adjust to your actual path)
- CREA repo: ~/projects/_public/portfolio/crea/

## Current status
- [x] phase 0 : adding claude context
- [~] phase 1 : migration scaffold — IN PROGRESS, see "Detailed context" below
- branch : refactor2026/phase1-migration-scafold
- broken : nothing currently broken; mobile menu / nav links / scroll-to-top are non-functional (expected, not yet ported)

## Detailed context (for next agent / after break)

### Where we are in Phase 1
Vite + React + TS scaffold is fully merged into the repo root (no more `vite-tmp/`).
`npm run dev` works and the site renders close to the original, section by section,
as React components.

### Repo state
- `package.json` rebuilt from the Vite `react-ts` template (React 19, Vite 8, TS ~6),
  `bootstrap` dependency dropped (was unused), `prettier` kept.
- `index.html` rebuilt: kept original `<head>` (title, meta description, favicon link,
  Google Fonts, Font Awesome CDN), now points to `/src/main.tsx`. `custom.css` is
  imported via `main.tsx`, not `<link>`.
- `assets/` moved to `public/assets/` (served at site root, so `/assets/...` paths work).
- `custom.css` copied to `src/custom.css`, imported in `src/main.tsx`.
- Old root `index.html` (414-line static version) is preserved at
  `old-index-reference.html` (gitignored-style scratch file at repo root, **delete
  once porting is fully done** — it's the source-of-truth reference for remaining
  raw markup/behavior).
- `script.js` (old vanilla JS) still exists at repo root, NOT imported anywhere —
  it's dead code now, kept only as a reference for porting interactive behavior.
  Delete once all its logic has been ported to React.

### Components created (all in `src/components/`, all wired into `src/App.tsx` in order)
`Header`, `Intro`, `AboutMe`, `Skills`, `Projects`, `Contact`, `Footer`, `ReturnToTop`.

All are plain presentational components (no state/hooks yet) ported from the old
`index.html` body. Conversions applied throughout: `class` → `className`,
`<!-- -->` → `{/* */}`, relative `assets/...` paths → `/assets/...`.

### Static links — DONE
Per the old `script.js`'s `openLink()`/CV-download logic, replaced JS-driven
`<button id="...">` / `<a id="...">` (no href, wired by `getElementById` + click
listener) with native `<a href="...">`:
- Intro.tsx: CV download → `<a href="/assets/Coquard-Balthazar-CV_de.pdf"
  download="Coquard-Balthazar-CV_de.pdf">` (replaces old `btn-download` JS logic)
- Intro.tsx + Contact.tsx: social icons (LinkedIn, GitHub, email) → real `<a href>`
  with `target="_blank" rel="noopener noreferrer"` for external links, `mailto:`
  for email (no target/rel needed for mailto)
- Projects.tsx: all 5 "View code" buttons → `<a href="https://github.com/..."
  target="_blank" rel="noopener noreferrer" className="btn btn-project-discover">`
  (URLs taken from `script.js`'s `openLink(...)` calls)
- Fixed a find-replace artifact bug: "classNamees" → "classes" in a Blackjack
  project description (was `class` → `className` over-replacing the word "classes").
- Fixed `ReturnToTop.tsx` image path `assets/...` → `/assets/...`.

### NOT YET DONE — remaining `script.js` behaviors to port (next steps, in order)
1. **Mobile menu (in progress when break started)** — `Header.tsx` needs
   `useState(false)` for `isMenuOpen`, hamburger icon `onClick` sets true, "CLOSE"
   button + each nav link `onClick` sets false. Replace old `.show`/`.hide` class
   toggling (lines 116–151 of `script.js`) with className derived from state, e.g.
   `className={`navbar-ctrl-items ${isMenuOpen ? 'show' : ''}`}`. User wanted to
   try writing this themselves; agent offered to write a reference version if
   user prefers — confirm which before proceeding.
2. **Return-to-top scroll behavior** (`script.js` lines 153–174) — needs
   `useState` + `useEffect` with a `window.addEventListener('scroll', ...)` to
   toggle a `.visible` class on `ReturnToTop.tsx` when `scrollY > 250`, plus
   `onClick` → `window.scrollTo({ top: 0, behavior: 'smooth' })`. Currently the
   button is permanently invisible (`#return-to-top` has `visibility: hidden` by
   default in `custom.css`, only `.visible` shows it).
3. **"Let's talk" navbar button** — old code: `openLinkSameWindow('btn-navbar',
   '#contact')`. Should become a plain `<a href="#contact">` (anchor link, same
   tab) — same "native HTML over JS" pattern as the other links. Currently still a
   `<button id="btn-navbar">` with no behavior.
4. **Contact form submission** (`script.js` lines 53–66) — builds a `mailto:` link
   from form fields on submit. This will likely be superseded by Phase 6
   (Formspree/EmailJS), so probably skip porting this as-is — flag to user when
   Phase 6 comes up rather than reimplementing the mailto approach now.

### After all script.js logic is ported
- Delete `script.js` and `old-index-reference.html` from repo root.
- Clean up `public/assets/Website Portfolio - Miro_files/` — leftover saved-webpage
  junk (~50 files: `.Download`, `Zone.Identifier` files, an accidentally-saved Miro
  board dump). Not referenced anywhere, safe to delete. User agreed to do this as
  an end-of-phase-1 cleanup task.
- Verify `npm run build` works and `vite.config.ts` has correct `base` for GH Pages
  (not yet configured/checked).
- Add `.github/workflows/deploy.yml` for `vite build` → `dist/` → `gh-pages` branch
  (not started).
- Final visual diff check against the live site at coquardbalthazar.github.io.

### Working style reminders for this user (in addition to project CLAUDE.md)
- User is writing most components themselves now and asking for review — let them
  drive, review + correct rather than rewrite wholesale.
- User wants conceptual explanations (ports, Vite public/ vs src/, React events,
  target="_blank"/rel, dependencies vs devDependencies, etc.) interleaved with the
  practical steps — keep giving these, calibrated to "strong programmer, new to
  JS/web ecosystem."
- Decided: CSS Modules / per-component CSS split is deferred to a follow-up after
  Phase 1 ships (tracked, not forgotten) — `custom.css` stays global for now.

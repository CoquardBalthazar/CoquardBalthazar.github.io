# Local context — not committed

## Paths

- Portfolio repo: ~/projects/\_public/portfolio/CoquardBalthazar.github.io (adjust to your actual path)
- CREA repo: ~/projects/\_public/portfolio/crea/

## Current status

- [x] phase 0 : adding claude context
- [x] phase 1 : migration scaffold — DONE, deployed via GitHub Actions to coquardbalthazar.github.io
- [ ] phase 2 : data-driven content — NOT STARTED
- branch : refactor2026/phase2-data-driven-content
- broken : nothing currently broken

## Phase 1 — summary (done)

- Vite + React + TS scaffold merged into repo root, `npm run dev` and `npm run build` both work.
- Components: `Header`, `Intro`, `AboutMe`, `Skills`, `Projects`, `Contact`, `Footer`, `ReturnToTop`
  — all wired into `src/App.tsx`.
- Mobile menu: `Header.tsx` uses `useState(isMenuOpen)`, toggled by hamburger, closed by
  CLOSE/nav links/Let's talk.
- Return-to-top: `ReturnToTop.tsx` uses `useState` + `useEffect` (scroll listener with cleanup)
  to toggle `.visible`, `onClick` does `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- "Let's talk" → `<a href="#contact">`.
- Contact form: fixed TS build error (`textarea rows="5"` → `rows={5}`, removed invalid
  `type="message"`), and updated `custom.css` selectors from `textarea[type='message']`
  to `#message` (the old attribute-selector hack broke when the invalid attribute was removed).
  `.input-message` is `min-height: 15rem`, `#message` is `height: 15rem` — textarea can grow
  via resize and push the submit button down.
- Cleanup done: deleted `script.js`, `old-index-reference.html`, `old-custom-navbar.css`,
  `vite-tmp/`, `public/assets/Website Portfolio - Miro_files/`, and unused
  `public/assets/other/*` design references. Added `_scratch/` to `.gitignore` for
  future local-only scratch files.
- Tooling: added `npm run format` (prettier --write .), set up VSCode format-on-save
  (`.vscode/settings.json`, local-only — gitignored).
- Deploy: `.github/workflows/deploy.yml` using official `actions/deploy-pages` flow
  (triggers on push to `main`, repo Settings → Pages → Source = "GitHub Actions").
  Verified live and working.

## Phase 2 — next up (data-driven content)

Per `PLAN.md`:

- `data/projects.json` (schema in PLAN.md section 5)
- `data/hackathons.json` (schema in PLAN.md section 5 — user populates details)
- `<ProjectCard>` component consuming `projects.json`
- `<HackathonCard>` component consuming `hackathons.json`
- Filter chips (`All / C++ / Java / Python / JavaScript / Power Apps / Hackathon`) via `useState`
- Wire filter chips to project category

## Working style reminders for this user (in addition to project CLAUDE.md)

- User is writing most components themselves now and asking for review — let them
  drive, review + correct rather than rewrite wholesale.
- User wants conceptual explanations (React hooks, JSX/TS quirks, JS syntax like
  template literals/ternaries/destructuring, npm/CI concepts) interleaved with the
  practical steps — keep giving these, calibrated to "strong programmer, new to
  JS/web ecosystem." Go deep when asked "explain this line in detail" — line-by-line,
  with Python analogies where useful.
- Decided: CSS Modules / per-component CSS split is deferred to a follow-up after
  Phase 1 shipped (tracked, not forgotten) — `custom.css` stays global for now.

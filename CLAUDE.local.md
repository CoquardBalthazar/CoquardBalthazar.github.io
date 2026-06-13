# Local context — not committed

## Paths

- Portfolio repo: ~/projects/\_public/portfolio/CoquardBalthazar.github.io (adjust to your actual path)
- CREA repo: ~/projects/\_public/portfolio/crea/

## Current status

- [x] phase 0 : adding claude context
- [x] phase 1 : migration scaffold — DONE, deployed via GitHub Actions to coquardbalthazar.github.io
- [ ] phase 2 : data-driven content — IN PROGRESS, `data/*.json` filled in (projects, skills,
      hackathons), `<ProjectCard>` + filter chips still to do
- branch : refactor2026/phase2-data-driven-content
- broken : nothing currently broken

Note: phases 3–6 were reordered on 2026-06-13 (see `PLAN.md`):
phase 3 = update content + new structure, phase 4 = mobile responsiveness,
phase 5 = Three.js demo (placed between AboutMe and Projects), phase 6 = EmailJS contact form.

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

## Phase 2 — in progress (data-driven content)

Per `PLAN.md` (updated 2026-06-13):

- [x] `data/projects.json`, `data/skills.json`, `data/hackathons.json` filled in and reviewed —
  includes the 2 C++ projects + LMU_BiP Pong (originally slated for Phase 3, pulled forward),
  and a corrected `website-portfolio` entry (was duplicating CREA's description/code).
- Next immediate step: `<ProjectCard>` component consuming `projects.json` — **new design**, see below
- Filter chips (`All / C++ / Java / Python / JavaScript / Power Apps / Hackathon`) via `useState`,
  wired to `projects.json`'s `category` field
- `<HackathonCard>` + skills tile grid: data file ready in Phase 2, component build is Phase 3

### Card & layout direction (decided 2026-06-10)

Inspired by wallofportfolios.in/portfolios/val-nogues. Moving away from the old
`card-left-*`/`card-right-*` paired-column layout to **one card per project**:

- Single div per project, background = `theme` color (primary/secondary/tertiary)
- Inside: left half = category badge + title, right half = description/tags/View code/Demo button
- `PeekCard` prototype (`src/components/PeekCard.tsx` + the `.peek-*` CSS block at the end of
  `custom.css`) was a mobile flip/peek-drawer experiment, tested via 3 hardcoded cards in
  `Projects.tsx` — **superseded**, remove both when the real `<ProjectCard>` is built.

### Phase 4 direction (decided 2026-06-10, renumbered 2026-06-13, for later)

Mobile/tablet gets a different nav architecture, not just breakpoints:

- `useIsMobile()` hook (matchMedia, same shape as `ReturnToTop`'s scroll listener)
- Mobile/tablet shell: `Header`+`Intro` stay visible, horizontal tab bar below switches between
  `AboutMe / Skills / Projects / Hackathons / Contact` (conditional render via `useState`)
- `<ProjectCard>` on mobile/tablet: `position: sticky` so each card stacks over the previous one
  on scroll — pure CSS, no JS needed
- "Let's talk" anchor link switches tabs on mobile instead of scrolling

### Phase 5 direction (decided 2026-06-13)

Three.js demo placed as its own section directly between AboutMe and Projects:
`<AboutMe> → <ThreeDemo> → <Projects>`.

### Schema notes (2026-06-10, skills.json updated 2026-06-13)

`projects.json` schema: `category` stays a single string (drives filter chips, one project = one
chip), `tags` is the array for the full tech list. Added `year`, `wip`/`live` as booleans,
`screenshot`. Full schema in PLAN.md section 5.

`skills.json` schema expanded beyond the original plan: now `{ id, label, tier, category, icon }`
— `category` ∈ `languages | frameworks | devops`, `tier` ∈
`production | proficient | comfortable | learning`. Full schema in PLAN.md section 5.

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

# Local context — not committed

## Paths

- Portfolio repo: ~/projects/\_public/portfolio/CoquardBalthazar.github.io (adjust to your actual path)
- CREA repo: ~/projects/\_public/portfolio/crea/

## Current status

- [x] phase 0 : adding claude context
- [x] phase 1 : migration scaffold — DONE, deployed via GitHub Actions to coquardbalthazar.github.io
- [~] phase 2 : data-driven content — mostly done (see below). Phase 3 content (Experience
      section, Hackathons/Projects/Games split, Work tabs) started early and is now
      interleaved with the remaining Phase 2 styling pass.
- branch : refactor2026/phase2-data-driven-content
- broken : nothing currently broken
- in progress : styling pass, top-to-bottom through `App.tsx`. Header done. Next up:
  extract `NAV_LINKS` data array in `Header.tsx` (decided, not yet built), then `Intro`.

Note: phases 3–6 were reordered on 2026-06-13 (see `PLAN.md`):
phase 3 = update content + new structure, phase 4 = mobile responsiveness,
phase 5 = Three.js demo (placed between AboutMe and Projects), phase 6 = EmailJS contact form.

## Build order & working agreements (decided this session)

- **Order**: data layer first → `Button` component → style every section top-to-bottom
  (split that section's CSS out of `custom.css` into `ComponentName.css` as we go).
- **CSS migration**: incremental, not big-bang. Only split a component's CSS out of
  `custom.css` when we actually touch/style that component. `custom.css` keeps design
  tokens (`:root` vars), resets, typography, and genuinely shared classes
  (`.project-tag`, `.highlight-box-shadow`, `.font-light`/`.font-dark`).
  Rule of thumb: **new styles → new component CSS file, reused styles → stay in
  `custom.css`**.
- **Games split**: the 4 "clear games" moved from `projects.json` to `games.json`:
  `pig-game`, `guess-my-number`, `blackjack`, `lmu-bip-pong`. `cpp-boardgame` and
  `cpp-vending-machine` stayed in `projects.json` (OOP exercises, not games).
- **Filter chips**: deferred — "no chips for now". Work section will use tabs
  (Hackathons / Projects / Games) instead, with Projects pre-selected. Category-level
  filtering inside a tab is a separate future step (alternatives + logic already
  discussed: derived single-select filter via `.filter()` is the recommended approach
  when we get there — avoid storing the filtered list in state).
- **Component split heuristic**: don't extract a wrapper component just for
  "organization" — only split when there's a real reuse or content-separation reason.
  (Decided against a separate `Navbar` component since `Header` *is* the navbar; instead
  extracting `NAV_LINKS` as a data array for reuse by the future Phase-4 mobile tab bar.)

## Phase 1 — summary (done)

- Vite + React + TS scaffold merged into repo root, `npm run dev` and `npm run build` both work.
- Components: `Header`, `Intro`, `AboutMe`, `Skills`, `Projects`, `Contact`, `Footer`, `ReturnToTop`
  — all wired into `src/App.tsx`.
- Mobile menu: `Header.tsx` uses `useState(isMenuOpen)`, toggled by hamburger, closed by
  CLOSE/nav links/Let's talk.
- Return-to-top: `ReturnToTop.tsx` uses `useState` + `useEffect` (scroll listener with cleanup)
  to toggle `.visible`, `onClick` does `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- Contact form: fixed TS build error (`textarea rows="5"` → `rows={5}`, removed invalid
  `type="message"`), and updated `custom.css` selectors from `textarea[type='message']`
  to `#message`. `.input-message` is `min-height: 15rem`, `#message` is `height: 15rem`.
- Cleanup done: deleted `script.js`, `old-index-reference.html`, `old-custom-navbar.css`,
  `vite-tmp/`, unused design references. Added `_scratch/` to `.gitignore`.
- Tooling: `npm run format` (prettier --write .), VSCode format-on-save (local-only).
- Deploy: `.github/workflows/deploy.yml` via `actions/deploy-pages`, verified live.

## Phase 2 — completed this session

- [x] **Data layer** — `src/data/type.ts` now has `Project`, `Hackathon`, `Skill`, `Game`,
  `Experience`, `ButtonConfig`, all with a `visible: boolean` field.
- [x] **`projects.json`** (7 entries) — games removed, `visible: true` added to all.
- [x] **`games.json`** (new, 4 entries) — `pig-game`, `guess-my-number`, `blackjack`,
  `lmu-bip-pong`. `Game` interface is a deliberate **exact mirror of `Project`**
  (including `wip`/`featured`, even if unused for games right now) — kept for future
  flexibility per user request, not because games currently need those fields.
- [x] **`skills.json`** (24 entries) — recategorized into 6 buckets, each skill now has
  **two category fields**:
  - `category`: stable kebab-case identifier (`languages`, `frameworks-libraries`,
    `databases`, `devops-infrastructure`, `data-ml`, `tools-workflow`) — matches the
    `Skill.category` union type, used for grouping/keys.
  - `categoryLabel`: human display string (`"Languages"`, `"Frameworks & Libraries"`,
    `"Databases"`, `"Infra & DevOps"`, `"Data & ML"`, `"Tools & Workflow"`).
  This `category`/`categoryLabel` pattern (stable id + display label) is reusable if
  other JSON files need the same split later.
- [x] **`experience.json`** (new) — 2 entries (TUM M.Sc. + MEAG), `Experience` interface:
  `id, title, company, role, location, period, description: string[], tags, theme,
  current, visible`. **MEAG bullets were filled in by the user with real detail** —
  don't treat as placeholder anymore.
- [x] **`buttons.json`** (new) — 4 `ButtonConfig` entries: `lets-talk` (secondary),
  `download-cv` (secondary), `contact` (tertiary, `href: null` — EmailJS submit, not a
  link), `view-code` (quaternary, `href: null` — per-project URL passed at call site).
  All have a `download: string | null` field (HTML `download` attribute).
- [x] **`ProjectCard.tsx` / `ProjectCard.css`** — two-panel staggered card layout (see
  "Card & layout direction" below — **this superseded the 2026-06-10 single-background
  direction**).
- [x] **`Projects.tsx`** — wired via `.filter(p => p.visible).map(...)` over
  `projects.json`, renders `<ProjectCard>`. Wrapper class renamed `.project-cards` →
  `.project-list` (old fixed-size grid CSS was dead/conflicting); new `Projects.css`.
- [x] **`Experience.tsx` / `ExperienceCard.tsx`** (new) — same `.filter(visible).map()`
  pattern, reuses `.project-tag` for tag pills, no dedicated CSS yet (styling pending,
  see punch list).
- [x] **`Button.tsx` / `Button.css`** (new) — config-object-driven, polymorphic
  (`<a>` if `href` resolved, `<button>` if not). Usage:
  `<Button config={configObj} href={optionalOverride} onClick={...} className={...} />`.
  `href` prop overrides `config.href` (used for `view-code`, where each project supplies
  its own URL). `.btn-primary`/`.btn-secondary` moved here from `custom.css`;
  `.btn-tertiary`/`.btn-quaternary` added (`.btn-quaternary` = old `.btn-project-discover`
  look). All still first-pass/placeholder-ish, to be tuned visually.
- [x] **`Header.tsx` / `Header.css`** — all navbar styles (incl. mobile media query)
  moved out of `custom.css`. Nav fixed: "Experience" link now points to `#experience`
  (was `#skills`); "Let's talk" now renders via `<Button config={letsTalk} ...>`.
  Final nav order: About me · Experience · Projects · Let's talk.
- [x] `tsconfig.app.json` — added `resolveJsonModule: true` (needed for `import x from
  '*.json'`).

### `Skill.category` mismatch — RESOLVED

Earlier concern about `skills.json` categories not matching the `Skill.category` union
is now fixed by the `category`/`categoryLabel` split above. `Skills.tsx` can safely do
`skills as Skill[]` once built.

## Open / pending work (large punch list from latest planning round)

Not yet started — in rough dependency order:

1. **`NAV_LINKS` extraction** in `Header.tsx` — data array + `.map()` for the 4 nav
   links, decided this session, not yet built. Do this before moving to `Intro`.
2. **Intro section** — styling pass + CSS split (next section top-to-bottom).
3. **AboutMe** — fix flexible height: currently has good top padding but not enough
   bottom padding; height should follow content, not be fixed.
4. **Experience section CSS** — prefill `ExperienceCard.css`/`Experience.css` per the
   timeline design the user sketched (vertical line with colored dots per entry,
   company name + role + period on the left, description bullets on the right). Full
   visual design is a later pass — for now just get padding/structure right.
5. **Skills redesign** — `SkillCard` component:
   - Card title = the **category** (one card per `categoryLabel`).
   - Card body = list of skills (`title`) in that category, **capped to however many
     fit the card** (take first N).
   - Carousel: arrow buttons on each side to page between category cards.
   - Arrows = image-based, same pattern as `ReturnToTop` (custom SVG asset + hover
     state), not text/unicode arrows.
   - Old skills markup to reuse as inspiration only (the `<span className="skill tag">
     &lt;h3&gt;</span>` / horizontal-band structure from the previous version) — not a
     hard requirement, just shows prior visual intent (code-tag bracket motif).
6. **Work section split** — currently `Projects.tsx`/`#projects`. Needs to become a
   tabbed section: **Hackathons / Projects / Games**, with **Projects pre-selected**.
   - `TabBar` component: dumb/controlled, renders `[ Label ]` bracket-style buttons,
     parent (`Work`?) owns `useState` for active tab and conditionally renders
     `<Hackathons>` / `<Projects>` / `<Games>`.
   - Need new `GameCard.tsx` (mirrors `ProjectCard`, `Game` type already defined)
     consuming `games.json`.
   - Need `HackathonCard.tsx` (data ready since Phase 2, component not built).
   - **Open question**: section anchor id — nav currently links to `#projects`: decide
     whether the tabbed wrapper section keeps `id="projects"` or becomes `id="work"`
     (would need a `Header.tsx` nav update either way).
   - Tab bar visual reference: bracket-style `[ Hackathons ] [ Projects ] [ Games ]`,
     active tab bold/colored (pink in reference screenshot).
7. **Contact section** — wire `contact` button (`buttons.json`, `href: null`) to
   EmailJS submit handler.
8. **`download-cv` button** — `href` is still the placeholder `/assets/cv.pdf`; actual
   file is `CVs_20260606_InDesign_EN_SE_WorkingStudent.pdf` (used as the `download`
   filename already). Need to confirm the real PDF lives in `public/assets/` and update
   `buttons.json`'s `href` to match.

## Card & layout direction (SUPERSEDED 2026-06-10 decision — current as of this session)

The 2026-06-10 "single div, background = theme color, left = badge+title, right =
description/actions" direction was **replaced** by a two-panel staggered layout, built
in `ProjectCard.css`:

- `.project-card` = flex row, two children (`.project-card-left`, `.project-card-right`),
  each `flex: 1`.
- Left panel = light/cream tint (`--{theme}-10`), category badge (top-left,
  `.card-category.highlight-box-shadow.{theme}`, font-size reduced from the old
  absolutely-positioned 2.5rem to 1.4rem) + large title.
- Right panel = accent color (`--{theme}` or `--{theme}-60` for primary), shifted down
  via `margin-top: 3rem` for the staggered effect. Contains description, `.project-tags`
  (reuses `.project-tag` — dark pill, light text), and `.project-card-actions`
  (View code / demo buttons, both repositioned from absolute → static).
- `PeekCard` prototype (mobile flip/peek-drawer) already removed — not relevant.
- `btn-play` → `btn-demo` rename (done 2026-06-14) still applies — the pixel-art "PLAY"
  button asset is `public/assets/btn-demo.svg`/`btn-demo-hover.svg`. Likely reused for
  the Games tab's demo links.

## Phase 4 direction (decided 2026-06-10, renumbered 2026-06-13, for later)

Mobile/tablet gets a different nav architecture, not just breakpoints:

- `useIsMobile()` hook (matchMedia, same shape as `ReturnToTop`'s scroll listener)
- Mobile/tablet shell: `Header`+`Intro` stay visible, horizontal tab bar below switches
  between sections (conditional render via `useState`) — **the `NAV_LINKS` array from
  item 1 above is intended to drive this tab bar too**, avoiding duplicating the link
  list.
- `<ProjectCard>` on mobile/tablet: `position: sticky` so each card stacks over the
  previous one on scroll — pure CSS, no JS needed.
- "Let's talk" anchor link switches tabs on mobile instead of scrolling.

## Phase 5 direction (decided 2026-06-13)

Three.js demo placed as its own section directly between AboutMe and Projects:
`<AboutMe> → <ThreeDemo> → <Projects>`.

## Schema notes (carried over, still relevant)

`hackathons.json` schema (expanded beyond PLAN.md section 5, which still has the old
`name`/`stack`/`link` shape): `{ id, title, year, date, project, theme, description,
tags, teamSize, role, result, live, code, demo, screenshot, visible }`. `theme` and
`tags` added for consistency with `projects.json` so `<HackathonCard>` can reuse the
same styling/tag-list pattern. **PLAN.md section 5 still needs updating** to match
current `projects.json`/`skills.json`/`hackathons.json`/`games.json`/`experience.json`
schemas — not yet done.

## Working style reminders for this user (in addition to project CLAUDE.md)

- User is writing most components themselves now and asking for review — let them
  drive, review + correct rather than rewrite wholesale.
- User wants conceptual explanations (React hooks, JSX/TS quirks, JS syntax like
  template literals/ternaries/destructuring, npm/CI concepts) interleaved with the
  practical steps — keep giving these, calibrated to "strong programmer, new to
  JS/web ecosystem." Go deep when asked "explain this line in detail" — line-by-line,
  with Python analogies where useful.
- When the user drops a **large multi-part request** (several features at once), don't
  start building immediately — use `AskUserQuestion` to lock build order + the
  ambiguous decisions first (worked well this session: order, games split, filter
  approach, CSS migration style all decided in one round-trip before any code).
- CSS: per-component CSS files, incremental migration (see "Build order & working
  agreements" above) — the earlier "deferred to a follow-up" note is now superseded,
  migration is actively in progress.

# Local context — not committed

## Paths

- Portfolio repo: ~/projects/\_public/portfolio/CoquardBalthazar.github.io (adjust to your actual path)
- CREA repo: ~/projects/\_public/portfolio/crea/

## Current status

- [x] phase 0 : adding claude context
- [x] phase 1 : migration scaffold — DONE, deployed via GitHub Actions to coquardbalthazar.github.io
- [x] phase 2 : data-driven content — DONE, merged into `dev`.
- [~] phase 3 : up-to-down rebuild (content + new structure + styling pass, interleaved).
- branch : refactor2026/phase3-up-to-down-rebuild (created off `dev` after merging
  `refactor2026/phase2-data-driven-content`)
- broken : nothing currently broken
- in progress : styling pass, top-to-bottom through `App.tsx`. Header + Intro + AboutMe + Skills + Experience
  all done. Next up: **Projects section** (rebuild ProjectCard + Projects styling pass, mobile overflow fix).

### Skills section — DONE (2026-06-16)
- `SkillCard.tsx` + `SkillCard.css`: one card per category, bracket motif (`<h3>`/`</h3>`),
  inline-code skill tags (`< Python >`), colored circle icon, theme cycling tertiary→secondary→primary.
- `Skills.tsx`: carousel with `useVisibleCount()` hook — 3 visible desktop, 2 tablet, 1 mobile.
  Track width + transform computed in JS inline style via `--num-cards` CSS custom property.
  `useEffect` clamps `activeIndex` when breakpoint changes.
- `Skills.css`: split background (light 56% top / dark bottom), `position: relative` for title anchor,
  arrow buttons dark-filled with light SVG chevrons.
- Category order: Languages → Data & ML → Infra & DevOps → Tools & Workflow → Frameworks & Libs → Databases.

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
  (Decided against a separate `Navbar` component since `Header` _is_ the navbar.)
- **`NAV_LINKS` extraction — DROPPED (2026-06-15)**: previously planned data-array
  extraction for the 4 nav links is no longer wanted; navbar markup stays inline in
  `Header.tsx` as-is. If the Phase-4 mobile tab bar needs a shared link list later,
  revisit then — don't pre-extract.

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
  - `categoryLabel`: human display string (`"Languages"`, `"Frameworks & Libs"`,
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

1. ~~`NAV_LINKS` extraction~~ — DROPPED, see Build order & working agreements above.
2. **Intro section** — DONE. `Intro.css` split from `custom.css`. Mobile centering fixed.
   Tablet breakpoint done: `padding-left: 15vw` (was fixed `30rem`), forms `35%` (was
   `50%`), `#h1-subtitle` changed to `max-width: 45rem; width: 100%`. Mobile paragraph
   bottom margin increased to `8rem` (user-adjusted from `6rem`).
3. **AboutMe** — DONE. Migrated to `AboutMe.css`. New classnames: `about-me-section`,
   `about-me-body`, `about-me-heading`. Generic classes (`div-bg-light`, `container`,
   `content-width`, unused `.about-me`) removed from `custom.css`. Text centered.
   Desktop height `45rem`, body padding `10rem 0`. Mobile: auto height, 75% width.
4. **ProjectCard mobile overflow** — at <470px viewport, `.project-card-right` extends
   to ~488px (scrollWidth 512px vs 400px viewport), causing horizontal scroll that makes
   the mobile menu look like it has a right-side gap. Root cause diagnosed via Playwright
   (2026-06-16): some child of `.project-card-right` has a min-content width > ~190px
   forcing the flex panel wider than its allocated space. Fix deferred — tackle when
   styling the Work/Projects section.
5. **Experience section CSS** — prefill `ExperienceCard.css`/`Experience.css` per the
   timeline design the user sketched (vertical line with colored dots per entry,
   company name + role + period on the left, description bullets on the right). Full
   visual design is a later pass — for now just get padding/structure right.
6. **Skills redesign** — `SkillCard` component:
   - Card title = the **category** (one card per `categoryLabel`).
   - Card body = list of skills (`title`) in that category, **capped to however many
     fit the card** (take first N).
   - Carousel: arrow buttons on each side to page between category cards.
   - Arrows = image-based, same pattern as `ReturnToTop` (custom SVG asset + hover
     state), not text/unicode arrows.
   - Old skills markup to reuse as inspiration only (the `<span className="skill tag">
&lt;h3&gt;</span>` / horizontal-band structure from the previous version) — not a
     hard requirement, just shows prior visual intent (code-tag bracket motif).
7. **Work section split** — currently `Projects.tsx`/`#projects`. Needs to become a
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
8. **Contact section** — wire `contact` button (`buttons.json`, `href: null`) to
   EmailJS submit handler.
9. **`download-cv` button** — `href` is still the placeholder `/assets/cv.pdf`; actual
   file is `CVs_20260606_InDesign_EN_SE_WorkingStudent.pdf` (used as the `download`
   filename already). Need to confirm the real PDF lives in `public/assets/` and update
   `buttons.json`'s `href` to match.

## Responsive design pass — Header + Intro (started 2026-06-15)

Breakpoint convention adopted (Tailwind-style, decided this session):

- **Mobile**: 0–767px (default, no media query prefix needed for desktop-first CSS)
- **Tablet / rotated**: 768–1023px (`md:`)
- **Desktop**: 1024px+ (`lg:`, i.e. the existing un-prefixed/default styles)

Existing `@media (max-width: 431px)` queries in `Header.css`, `Intro.css`, and
`custom.css` were updated to `max-width: 767px` to match.

### Done

- **Mobile centering fix (`Intro.css`)**: `.introduction.content` was `display: flex`
  with no `flex-direction` (defaults to row) plus a stray `align-self: flex-end` — so
  on mobile the h1/subtitle/social-icons/CV-button sat side-by-side, pushed right,
  instead of stacking centered. Fixed to `flex-direction: column; align-items: center`.
- **Mobile centering fix (`Header.css`)**: `.navbar-ctrl-brand` gets
  `justify-content: center` (centers the `<Balthazar Coquard/>` logo within its box),
  `.menu-icon` gets `align-items: center` (centers the 3 hamburger bars).
- **Mobile menu full-width (`Header.css`)**: `.navbar-ctrl-items` (open mobile menu)
  changed from `left: 50%; width: 100%; transform: translate(-50%,-50%)` to
  `left: 0; width: 100vw; transform: translateY(-50%)` for guaranteed full-viewport width.
- **Right-edge "gap" on mobile — FIXED via `html { background-color: var(--dark) }`**
  (added in `custom.css`). Root cause: `body` had `background-color: var(--dark)` but
  `html` didn't, so the vertical scrollbar's track area showed the browser's default
  dark-grey canvas instead of the site's `--dark`, reading as a separate "gap" next to
  the page content. This was **not** a layout/width bug — don't re-chase it as one.
- **Button hover/active unification (`Button.css`)**: `.btn-primary` and
  `.btn-secondary` hover/active now match `.btn-quaternary`/`.btn-project-discover`:
  hover → `background: var(--primary-10); color: var(--dark); border-color: var(--dark)`,
  active → `background: var(--dark); color: var(--light)`. Replaces the old
  "transparent background on hover" look. `.btn-tertiary` not yet updated to match —
  possible follow-up if it reads as inconsistent once visible somewhere.

### Reverted — do NOT redo this combination

A first attempt at the tablet (768–1023px) breakpoint also fixed the invalid
`box-sizing: 'border-box'` (quoted string, line ~45 of `custom.css` — real bug,
makes everything `content-box` instead of `border-box`). **This broke the CV button
width and the Intro section height** (content overflowed into AboutMe) because the
whole site's rem-based widths/paddings were tuned assuming `content-box`. Both the
box-sizing fix and the tablet block were reverted. **If `box-sizing` is ever fixed
properly, it needs a full pass over rem-based widths/paddings/heights, not a drive-by
change.**

### Done (2026-06-16)

- **Tablet (768–1023px) for Intro**: `padding-left: 15vw` (was `30rem`), forms width
  `35%` (was `50%`), `#h1-subtitle` now `max-width: 45rem; width: 100%`. No box-sizing
  touched.

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

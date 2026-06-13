# Portfolio Rebuild — Plan

> Working document. Living plan for the rebuild of `coquardbalthazar.github.io`.
> Last updated: 2026-06-13.

---

## 1. Context & strategy

The portfolio is being rebuilt as the **first rung of a 3-project learning ladder** that shares stack across all three projects. The point is shared muscle memory, not isolated optimality.

| Project                                        | Role in the ladder                                                                                                                                           | Stack                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| **Portfolio** (this repo)                      | Sandbox. Learn the full Vite + React + GitHub Actions → GitHub Pages pipeline on a low-stakes project.                                                       | React + Vite + GH Actions   |
| **Bank tracker** (`.private-ofxToCSV.private`) | Step up. Same frontend stack + file parsing logic (OFX/TSV → CSV, 2 banks done).                                                                             | React + Vite + parser layer |
| **CREA**                                       | The main project. Full stack: React + Vite frontend, Node + Express backend, PostgreSQL, JWT auth, Docker + GH Actions CI/CD → Railway/Render. Not live yet. | Full-stack                  |

The portfolio also serves as the public-facing artifact for the Munich junior SE job search. Differentiators to surface: CREA as featured project (once live), hackathon 2nd place, an inline Three.js / WebXR demo as the start of an XR learning path.

---

## 2. Stack decision

- **Frontend:** React + Vite (match CREA exactly)
- **Language:** TBD — match what CREA uses (JS or TS)
- **Styling:** keep the existing `custom.css` design tokens (FiraCode + Exo 2 fonts, `##` headings, bracket motifs, the color palette). Port to CSS modules or plain CSS — no Tailwind rewrite, the identity is already strong.
- **Deploy:** GitHub Actions → GitHub Pages (mirrors the CREA Actions pipeline)
- **3D:** `@react-three/fiber` (React wrapper for Three.js) for the inline demo in Phase 4
- **Contact form:** Formspree or EmailJS (no backend possible on GH Pages)
- **Data:** project list and hackathon list driven by JSON files, not hard-coded JSX

---

## 3. Phased plan

Total estimate: **~13–19h**, realistic 4–6 evenings.

### Phase 1 — Migration scaffold (3–4h)

Goal: get a Vite + React project deployed via GitHub Actions, visually identical to the current site.

- [ ] `npm create vite@latest` (React, JS or TS matching CREA)
- [ ] Port `index.html` sections into components: `<Header>` `<Intro>` `<About>` `<Skills>` `<Projects>` `<Contact>` `<Footer>`
- [ ] Copy `custom.css` over, wire it up
- [ ] Configure `vite.config.js` with the correct `base` for GH Pages
- [ ] Add `.github/workflows/deploy.yml` for `vite build` → deploy `dist/` to `gh-pages` branch
- [ ] Verify the deployed site at `coquardbalthazar.github.io` looks identical to today

**Learning outcome:** full Vite → Actions → Pages loop, reusable for CREA.

### Phase 2 — Data-driven content (2–3h)

Goal: project, skills, and hackathon lists driven by JSON, not JSX edits.

- [x] `data/projects.json`, `data/skills.json`, `data/hackathons.json` (schemas below) — built together in one pass
- [ ] `<ProjectCard>` component consuming `projects.json` (new card design — see "Card & layout direction" below)
- [ ] Filter chips: `All / C++ / Java / Python / JavaScript / Power Apps / Hackathon` using `useState`
- [ ] Project category → filter chip wiring
- [ ] `<HackathonCard>` and skills tile grid: data file ready now, component build deferred to Phase 3

**Learning outcome:** React state, list rendering, filtering — directly reusable in CREA.

#### Card & layout direction (decided 2026-06-10)

Inspired by wallofportfolios.in/portfolios/val-nogues — moving away from the old split left/right
column layout (`card-left-*` / `card-right-*` paired by index) toward **one card per project**:

- Each `<ProjectCard>` is a single div, background = `theme` color (primary/secondary/tertiary).
- Inside: two halves —
  - **Left half:** category badge + title (from `category`, `title`, `theme`)
  - **Right half:** description, tags, "View code" button, "Play/Demo" button if `demo` is set
- A `PeekCard` prototype (mobile-only flip/peek-drawer interaction) was built and tested in
  `src/components/PeekCard.tsx` + `custom.css` — **superseded by this direction**, will be
  removed when the real `<ProjectCard>` lands.
- Filter chips operate on `category` (single string) — see schema notes below for why
  `category` stays a string while `tags` is an array.

### Phase 3 — Update content + new structure based on data (3–4h)

Goal: site content reflects 2026 reality, and the section layout reflects the new
data-driven sections (skills tile grid, hackathon timeline) rather than the old
3-card layout.

- [x] Add the 2 new C++ projects and the Java/Processing project to `projects.json`
  - `cpp_p1_vending_machine` — https://github.com/CoquardBalthazar/cpp_p1_vending_machine
  - `cpp_p2_boardgame` — https://github.com/CoquardBalthazar/cpp_p2_boardgame
  - `LMU_BiP` (Java/Processing Pong + 3 features) — https://github.com/CoquardBalthazar/LMU_BiP/tree/main
- [ ] Replace the 3 generic skill cards with a skills tile grid, grouped by
      `category` (languages / frameworks / devops) and `tier` (production / proficient /
      comfortable / learning) — see updated `skills.json` schema below
- [ ] Add hackathon timeline section (`<HackathonCard>`, data from `hackathons.json`)
- [ ] New section structure: confirm where Skills tile grid and Hackathon timeline sit
      relative to existing sections (About Me / Projects / Contact)
- [ ] Dynamic year in footer
- [ ] Wire up the "View code" buttons (currently have IDs but no `href`)
- [ ] Remove or ship the "COMING SOON" notes (multi-language, tablet responsiveness — stale since 2024)

### Phase 4 — Mobile/tablet responsiveness (2–3h, likely more given new nav)

Direction decided 2026-06-10: mobile/tablet gets a **different navigation architecture**, not just
breakpoint tweaks — same pattern as wallofportfolios.in/portfolios/val-nogues.

- [ ] `useIsMobile()` hook (`matchMedia` + `useState`/`useEffect`, same shape as `ReturnToTop`'s
      scroll listener) — picks mobile/tablet vs. desktop shell
- [ ] Mobile/tablet shell: `Header` + `Intro` stay fixed/visible while scrolling; below them, a
      horizontal tab bar (`AboutMe / Skills / Projects / Hackathons / Contact`)
- [ ] Tab click renders the corresponding section component (conditional render via
      `useState<activeTab>`) — section components themselves are unchanged from desktop
- [ ] Anchor links (e.g. "Let's talk" → `#contact`) switch the active tab on mobile instead of
      scrolling
- [ ] Within `<ProjectCard>` on mobile/tablet: `position: sticky` stacking effect — each card
      sticks to the top of the viewport as the next one scrolls over it (pure CSS, no JS;
      optional polish: per-card `top` offset for a stacked-deck look)
- [ ] Hamburger menu polish (desktop nav, separate from the mobile tab bar)
- [ ] Test on real device

### Phase 5 — Three.js inline demo (2–4h)

- [ ] Add `@react-three/fiber` and `three`
- [ ] One scene embedded as a section: rotating mesh or simple interactive geometry — even small reads as "exploring XR"
- [ ] Placement: new section **directly before Projects, right after About Me** (per
      2026-06-13 discussion) — `<AboutMe> → <ThreeDemo> → <Projects>`
- [ ] Treat as the start of the WebXR learning path, not the destination

**Learning outcome:** first contact with Three.js / r3f.

### Phase 6 — Contact form via EmailJS (1h)

- [ ] Sign up for EmailJS free tier
- [ ] Wire up the existing form to the endpoint
- [ ] Confirm a test message arrives

---

## 4. README update (separate, do first — ~30 min)

Quick win, ship before the site rebuild starts:

- [ ] Restructure into: header / tech stack tiers / featured projects / hackathons table / collapsible all-projects-by-language / contact
- [ ] Add C++ projects and the Java/Processing project
- [ ] Add hackathons section (placeholder rows until JSON is populated)
- [ ] Add CREA and bank tracker as featured projects
- [ ] Update "currently learning" to reflect 2026 reality (React, Node, PostgreSQL, Docker, Three.js)

---

## 5. Data schemas

### `data/projects.json` (updated 2026-06-10)

```json
[
  {
    "id": "unifin",
    "title": "",
    "category": "",
    "tags": [],
    "year": 2024,
    "theme": "secondary",
    "description": "",
    "wip": true,
    "live": true,
    "code": "https://github.com/CoquardBalthazar/...",
    "demo": null,
    "screenshot": null,
    "featured": false
  }
]
```

Notes:

- `category` (string) — single value, drives the **filter chips** (`All / C++ / Java / Python /
  JavaScript / Power Apps / Hackathon`). One project = one chip. Pick the primary language/tech
  for multi-tech projects.
- `tags` (array) — full tech list for the card's detail half, not used for filtering.
- `theme` — `"primary" | "secondary" | "tertiary"`, maps to existing CSS color tokens
  (`--primary-*`, `--secondary-*`, `--tertiary-*`).
- `wip` / `live` — booleans. Old data had a `wip` *string* (e.g. "Browser window with drop file
  function") — decide per-project whether that detail folds into `description` or needs its own
  field.
- `code` / `demo` / `screenshot` — `demo: null` hides the Play/Demo button; `screenshot: null` ⇒
  no preview image (e.g. CREA placeholder until live).

### `data/skills.json` (schema updated 2026-06-13)

```json
[
  {
    "id": "python",
    "label": "Python",
    "tier": "production",
    "category": "languages",
    "icon": null
  }
]
```

- `category` ∈ `"languages" | "frameworks" | "devops"` — groups the skills tile grid into
  sections.
- `tier` ∈ `"production" | "proficient" | "comfortable" | "learning"` — drives styling within
  each group (e.g. production = daily MEAG work, learning = actively picking up).
- `icon` — reserved for a future icon/logo per skill, `null` for now.

Supersedes the original 3-field (`id`/`label`/`tier` with `comfortable|learning|tools`) schema.

### `data/hackathons.json`

```json
[
  {
    "id": "hack-XXX",
    "name": "TBD",
    "date": "YYYY-MM",
    "project": "TBD",
    "stack": [],
    "teamSize": 0,
    "role": "TBD",
    "result": "2nd place",
    "link": null
  }
]
```

User will populate these later.

---

## 6. Known project inventory (as of 2026-06-04)

### Existing (already on the site)

- Guess my Number (JS) — https://coquardbalthazar.github.io/guessMyNumber-js/
- Pig Game (JS) — https://coquardbalthazar.github.io/pigGame-js/
- Tic Tac Toe (Python)
- Blackjack (Python, OOP)
- OFX/TSV → CSV converter (Python) — predecessor of bank tracker
- Internal Approval App (MS Power Apps)

### New to add

- **CREA** — accountability platform for small creator groups. React+Vite / Node+Express / PostgreSQL / JWT / Docker / GH Actions → Railway/Render. **Not live yet.**
- **Bank tracker** — evolution of the OFX/TSV converter. 2 bank converters done + some logic written. In progress.
- **C++ Vending Machine** — https://github.com/CoquardBalthazar/cpp_p1_vending_machine
- **C++ Board Game** — https://github.com/CoquardBalthazar/cpp_p2_boardgame
- **Java/Processing Pong + 3 features** (LMU course/personal) — https://github.com/CoquardBalthazar/LMU_BiP/tree/main

### Hackathons

2 done. Including at least one 2nd place. Details to be added to `hackathons.json` by user.

---

## 7. Open items / pending input

- [ ] **CREA language** — JS or TS? Determines what we set up in Phase 1.
- [ ] **Hackathon details** — names, dates, projects, links (will go in `hackathons.json`).
- [ ] **Featured project picks** — which 2–3 get the "look at this first" treatment? Suggest: CREA (when live) + the 2nd-place hackathon + one C++ project.
- [ ] **CREA preview asset** — once there's a screenshot or live URL, plug it in.

---

## 8. Sequencing — recommended next steps

1. **Done:** README update.
2. **Done:** Phase 1 (Vite + React + Actions scaffold). End-to-end pipeline working.
3. **Now:** Phase 2 (data-driven). Adding new projects becomes a JSON edit.
4. **Then:** Phase 3 (update content + new structure). Site reflects current reality, sections
   reorganized around the new data-driven content (skills grid, hackathon timeline).
5. **Then:** Phase 4 (mobile/tablet responsiveness). New nav architecture for small screens.
6. **Then in parallel with CREA work:** Phase 5 (Three.js demo), Phase 6 (EmailJS contact form).
   These don't block each other.

The goal is that by the time CREA is ready to ship, the portfolio is already running the same pipeline you'll use to deploy CREA — and CREA gets a polished featured card the day it goes live.

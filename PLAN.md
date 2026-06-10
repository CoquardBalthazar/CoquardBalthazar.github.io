# Portfolio Rebuild — Plan

> Working document. Living plan for the rebuild of `coquardbalthazar.github.io`.
> Last updated: 2026-06-04.

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

Goal: project and hackathon lists driven by JSON, not JSX edits.

- [ ] `data/projects.json` (schema below)
- [ ] `data/hackathons.json` (schema below — populated later by user)
- [ ] `<ProjectCard>` component consuming JSON
- [ ] `<HackathonCard>` component consuming JSON
- [ ] Filter chips: `All / C++ / Java / Python / JavaScript / Power Apps / Hackathon` using `useState`
- [ ] Project category → filter chip wiring

**Learning outcome:** React state, list rendering, filtering — directly reusable in CREA.

### Phase 3 — New content + skills section (3–4h)

- [ ] Replace the 3 generic skill cards with a skills tile grid
  - Comfortable: Python, JavaScript, HTML/CSS, C++
  - Learning: Java, React, Node, PostgreSQL, Docker, Three.js
  - Tools: Power Apps, Git, GitHub Actions
- [ ] Add the 2 new C++ projects and the Java/Processing project to `projects.json`
  - `cpp_p1_vending_machine` — https://github.com/CoquardBalthazar/cpp_p1_vending_machine
  - `cpp_p2_boardgame` — https://github.com/CoquardBalthazar/cpp_p2_boardgame
  - `LMU_BiP` (Java/Processing Pong + 3 features) — https://github.com/CoquardBalthazar/LMU_BiP/tree/main
- [ ] Add hackathon timeline section (data from `hackathons.json`)
- [ ] CREA placeholder card (becomes a real card with screenshot + link once CREA is live)
- [ ] Bank tracker card with current status
- [ ] Dynamic year in footer
- [ ] Wire up the "View code" buttons (currently have IDs but no `href`)
- [ ] Remove or ship the "COMING SOON" notes (multi-language, tablet responsiveness — stale since 2024)

### Phase 4 — Three.js inline demo (2–4h)

- [ ] Add `@react-three/fiber` and `three`
- [ ] One scene embedded as a section: rotating mesh or simple interactive geometry — even small reads as "exploring XR"
- [ ] Treat as the start of the WebXR learning path, not the destination

**Learning outcome:** first contact with Three.js / r3f.

### Phase 5 — Mobile responsiveness (2–3h)

- [ ] Breakpoint pass across all sections
- [ ] Hamburger menu polish
- [ ] Test on real device

### Phase 6 — Contact form working (1h)

- [ ] Sign up for Formspree or EmailJS free tier
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

### `data/projects.json`

```json
[
  {
    "id": "cpp-vending-machine",
    "title": "Vending Machine",
    "category": "C++",
    "tags": ["C++", "OOP", "course-project"],
    "description": "Course project demonstrating core C++ capability.",
    "repo": "https://github.com/CoquardBalthazar/cpp_p1_vending_machine",
    "live": null,
    "screenshot": null,
    "featured": false
  }
]
```

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

1. **Now:** README update (~30 min). Immediate visible improvement, no migration risk.
2. **Then:** Phase 1 (Vite + React + Actions scaffold). End-to-end pipeline working.
3. **Then:** Phase 2 (data-driven). Adding new projects becomes a JSON edit.
4. **Then:** Phase 3 (new content + skills). Site reflects current reality.
5. **Then in parallel with CREA work:** Phase 4 (Three.js), Phase 5 (mobile), Phase 6 (contact form). These don't block each other.

The goal is that by the time CREA is ready to ship, the portfolio is already running the same pipeline you'll use to deploy CREA — and CREA gets a polished featured card the day it goes live.

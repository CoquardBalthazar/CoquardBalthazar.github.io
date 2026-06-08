# Portfolio — coquardbalthazar.github.io

## What this project is
Personal developer portfolio. Being rebuilt as the **first rung of a 3-project learning ladder**:
Portfolio (this) → Bank Tracker → CREA (full-stack).
The point is shared muscle memory across the stack, not isolated optimality.

## Stack
- Frontend: React + Vite
- Language: Typescript (same as CREA)
- Styling: existing custom.css design tokens — FiraCode + Exo 2 fonts, bracket motifs, current color palette. No Tailwind.
- Deploy: GitHub Actions → GitHub Pages (dist/ to gh-pages branch)
- 3D (Phase 4): @react-three/fiber
- Contact form: Formspree or EmailJS (no backend on GH Pages)
- Data: projects.json + hackathons.json — project lists are never hard-coded in JSX

## How we work together on this project — READ BEFORE EVERY TASK

### Commands — I type these myself
Never run terminal commands on my behalf. Write the command, explain what it does in one line,
then stop and wait for me to run it and report back.
Exception: read-only inspection commands (ls, cat, find, grep) are fine when you need
to scan the project to answer a question.

### I am here to learn, not to watch you build.
- **Never build a full feature in one shot.** Break every task into the smallest meaningful step, then stop and wait.
- **Explain before you code.** One short paragraph on what we're about to do and why, then the code. Not the other way around.
- **One file or one concept at a time.** If a task touches multiple files, do them one by one.
- **Always stop and ask me to confirm** before moving to the next step.
- **If I'm about to copy-paste without understanding**, flag it and explain the piece I'm missinag first.

### Calibrate explanations to this
I'm strong in: Python, SQL, Git, Linux/WSL, data pipelines.
I'm new to: React, Vite, JSX, component thinking, GitHub Actions YAML, module bundlers.
→ Explain React/Vite/JS patterns as if I know programming well but am new to this ecosystem.
→ Don't over-explain Git or CLI stuff.

### Feedback style
Direct and blunt. If my code is wrong or my approach is bad, say so clearly. No padding.

## Current phase
See PLAN.md for the full phased plan. Always check which phase is active before starting a task.
Recommended order: README update → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6.

## Project structure (target, post-migration)
src/
  components/     # One file per component: Header, Intro, About, Skills, Projects, Contact, Footer
  data/           # projects.json, hackathons.json — source of truth for all project content
  assets/         # images, icons
.github/
  workflows/
    deploy.yml    # vite build → dist/ → gh-pages branch
CLAUDE.md
CLAUDE.local.md   # gitignored — local paths and personal notes
PLAN.md           # the phased build plan

## Key constraints
- No backend. Contact form must go through Formspree or EmailJS.
- Design tokens (fonts, colors, bracket motifs) must be preserved from custom.css — this identity is intentional.
- Project and hackathon lists always come from JSON files, never hard-coded JSX.
- CREA gets a placeholder card now; it becomes a real card with screenshot + link once CREA is live.

## Open questions (answer these before Phase 1)
- JS or TS? → must match whatever CREA uses.
- Hackathon details for hackathons.json?
- Which 2–3 projects get "featured" treatment?

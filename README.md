# Shaivi Sheth — Portfolio (Spatial / 3D Edition)

A bolder, interactive take on my portfolio — built **dependency-free** (no frameworks, no build step,
no CDN libraries), so it runs anywhere and even offline.

## What makes it unique
- **Interactive 3D skills sphere** — a real rotating tag cloud (Fibonacci-distributed, depth-scaled,
  depth-blurred). Auto-rotates and you can **drag to spin** it.
- **3D tilt cards** — skills, experience, projects and contact tiles respond to the cursor in perspective.
- **Animated particle network** background that links to your cursor (HTML canvas, vanilla JS).
- **Evidence-linked skills** — instead of arbitrary percentages, every *core* skill is tagged with
  where it was actually used (DBS Smart Search, the Stock Agent, SIA dashboards). Secondary skills sit
  in **Working** and **Exploring** tiers. Credible to engineers and doubles as proof of experience.
- **Filterable projects** — All / AI & Agents / Full-Stack / Data & ML.
- Outlined display typography, neon gradient system, glassmorphism, spinning 3D logo cube, typewriter
  role, marquee, scroll progress and reveal animations.
- Respects `prefers-reduced-motion` and falls back gracefully on touch devices.

## Structure
```
portfolio-3d/
├── index.html          # The 3D edition
├── css/styles.css
├── js/main.js          # Sphere, tilt, particles, typewriter, filters, nav
└── assets/
    ├── Shaivi_Sheth_Resume.pdf    # linked from the Résumé buttons
    └── Shaivi_Sheth_Resume.docx
```

## Run locally
```bash
cd portfolio-3d
python3 -m http.server 4322
# open http://localhost:4322
```

## Deploy (free)
Push to a GitHub repo and enable **GitHub Pages** (Settings → Pages → Deploy from a branch → `main` / root),
or drag the folder into **Netlify / Vercel**. It's fully static — no build command needed.

## Customise
- **Sphere skills** → edit the `skills` array near the top of `js/main.js`.
- **Skill tiers & evidence** → edit the `.core` / `.tier` lists in the Skills section of `index.html`.
- **Project categories** → edit each card's `data-cat` attribute (`ai`, `fullstack`, `ml`).
- **Colours** → tweak the `:root` tokens (`--cyan`, `--violet`, `--magenta`, `--grad`) in `css/styles.css`.

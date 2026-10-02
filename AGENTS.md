# AGENTS.md — Instructions, Change Log & Roadmap

For **AI agents** (and the human owner) working on this portfolio.
Read this first. Keep it updated after every work session.

---

## Project facts

- Owner: **Hemal Das** — full stack developer, Chattogram BD
- GitHub: `HemalDas666` · Email: dashemal08@gmail.com
- Stack: static HTML/CSS/JS (no build step, no frameworks, no npm)
- Hosting: **Netlify** (`https://hemalsportfolio.netlify.app/`) — auto-deploys
  whenever `main` is pushed to the GitHub repo `HemalDas666/My-Portfolio`
  (all paths are **relative** — keep them that way)
- Canonical base URL: `https://hemalsportfolio.netlify.app`
  (⚠️ update all `canonical`/`og:url`/JSON-LD/`sitemap.xml`/`robots.txt`
  occurrences if the domain ever changes)
- Local test: `python -m http.server 8000`
- JS syntax check: `node --check <file.js>`

## Rules for any agent

1. **Paths stay relative** (`about/index.html`, `../images/x.jpg`) — never `/absolute`.
2. **Comments:** max 3–4 header comments per file. No inline noise.
3. **Animations must stay lag-free:** only `transform`/`opacity`, rAF
   throttling, one IntersectionObserver per group. Never animate `width`
   in loops, never per-frame inline style writes.
4. **Realtime data only through `github-live.js`** — no hardcoded fake
   stars/forks/stats anywhere.
5. **Respect `prefers-reduced-motion`** (already handled in shared.css).
6. After edits: run `node --check` on changed JS + click through all 5
   pages on the local server.
7. Update the **Change Log** below and the **Roadmap** status.

---

## Change Log

### 2026-10-02 — SEO ranking pass (invisible, no UI changes)

- All 5 pages: titles/descriptions/keywords re-targeted for trending queries
  (`web developer`, `programmer`, `hire developer`, `Hemal Das`); added
  `robots` meta (`max-image-preview:large`), `og:locale`.
- JSON-LD upgraded on every page: Person (+`hasOccupation`,
  `knowsAbout` ×19, description, phone), WebSite (new name/description),
  BreadcrumbList (4 subpages), WebPage (home), **FAQPage** (contact —
  matches the 4 visible FAQs), **ItemList of 6 services with USD prices**
  (services — matches visible pricing).
- Canonical/OG/Twitter/JSON-LD/sitemap/robots all point to
  `https://hemalsportfolio.netlify.app` (Netlify deploy).
- Verified: JSON-LD parses ×5, sitemap XML valid, titles 52–60 chars,
  0 `github.io` leftovers.

### 2026-10-02 — Full live upgrade (major rewrite)

**Added**

| File | Purpose |
|---|---|
| `assets/js/core.js` | Loading screen (3–5s), nav, Dhaka clock, offline toast, SW registration, `hdReveal()` helper |
| `assets/js/github-live.js` | Realtime GitHub stats, repo cards, filters, 30-min cache, offline fallback |
| `assets/css/shared.css` | Preloader, offline banner, ticker, reveal styles, ultrawide rule, reduced-motion |
| `offline.html` | Self-contained cute offline page (no external assets) |
| `sw.js` | Service worker: offline caching + offline fallback page |
| `robots.txt`, `sitemap.xml` | SEO infrastructure |
| `ARCHITECTURE.md`, `AGENTS.md`, rewritten `README.md` | Docs |
| `.gitignore` | Git hygiene |

**Rewritten / updated**

- All 5 `index.html`: relative paths, fixed Projects nav bug (`href="/"` →
  real link), SEO titles/descriptions/OG/Twitter/canonical, JSON-LD
  Person+WebSite schema, preloader + offline markup, shared scripts,
  comment cleanup.
- `about/`: identity → Full Stack Developer; stats 3+ yrs / 22 repos
  (live) / 24h reply; 6 mastery badges; 7 skill bars (added TypeScript,
  React, Node/Express); typewriter words expanded (18 fullstack terms);
  removed fake Resume button + parallax.
- `projects/`: fully realtime — stats bar (repos/followers/languages/years
  from API), auto-generated repo cards from GitHub API with live preview
  images, working filters, noscript fallback; removed manual "Add Repo"
  form and all fake star/fork/commit numbers.
- `services/`: pricing → $49 Starter / $149 Business (Most Popular) /
  $399 Full Stack / $79 Python / $69 UI-UX / $199 API.
- `contact/`: fixed `tel:` link, removed dead CodePen/Dev.to links and
  fake privacy link, fixed budget option labels, removed dead `_next`
  redirect, added `enctype`, AJAX form kept.
- Root `script.js`: hero typing delayed to after preloader; removed
  mousemove parallax + duplicated nav code.
- All 5 `style.css`: 66 comment blocks removed, 3-line header added.

**Deleted**

- `type.py` (unrelated auto-typer) · `images/logo6.jpg` (unused) ·
  `projects/ss/` (empty) · all `.gitkeep` files ·
  `via.placeholder.com` fallbacks (dead service) · fake `href="#"` buttons ·
  duplicated nav/scroll code in every page script (now in `core.js`).

---

## Roadmap

### ✅ Done
- [x] Loading screen (3–5s, lag-free, all devices)
- [x] Offline page + service worker + live offline toast
- [x] Realtime GitHub stats, cards, filters
- [x] Full-Stack DEV identity, skills, typewriter
- [x] Reasonable USD pricing tiers
- [x] Responsive 320px → 2560px + reduced-motion support
- [x] Comment cleanup (3–4 per file)
- [x] SEO: titles, meta, JSON-LD, sitemap, robots, README
- [x] Structure/docs: ARCHITECTURE.md, AGENTS.md

### ▶ Next (do these)
- [ ] Push to `main` → Netlify auto-deploys (else Netlify UI →
      Deploys → Trigger deploy)
- [ ] **Verify live site** `https://hemalsportfolio.netlify.app` shows the
      new version (title: "Hemal Das | Full Stack Developer")
- [ ] Submit sitemap in Google Search Console
- [ ] Click FormSubmit activation link in your inbox (one-time)
- [ ] Add "Hemal Das" + portfolio link to GitHub profile bio
- [ ] First `git add -A && git commit`

### 🔮 Future ideas
- [ ] Real `resume.pdf` (re-add a download button on About)
- [ ] GitHub contribution heatmap section
- [ ] Blog / articles page (good for SEO)
- [ ] Merge per-page CSS into one `assets/css/` bundle (dedupe nav/footer rules)
- [ ] Dark/light theme toggle
- [ ] Analytics (Plausible/GA4)
- [ ] Custom domain

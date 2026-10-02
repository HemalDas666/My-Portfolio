# ARCHITECTURE — How This Website Works

Written for **Hemal Das** (no jargon). Read this and you'll understand your whole site.

---

## 1. What kind of website is this?

It is a **static website** — plain HTML, CSS and JavaScript files.
There is **no server you pay for** and no database to maintain. Any host
(GitHub Pages, Netlify, Vercel, or even a USB stick) can serve it.

"Backend" for this site = **free public services** it talks to:

| Service | What it does for you |
|---|---|
| **GitHub API** | Provides your live repos, stars, followers (realtime project cards) |
| **FormSubmit.co** | Delivers contact-form messages to your Gmail — no code needed |
| **Service Worker** (`sw.js`) | Remembers visited pages so the site works offline |
| **localStorage** | Caches GitHub data for 30 min so the API isn't spammed |
| **opengraph.githubassets.com** | Generates a live preview image for every repo card |

That's the entire "backend". Nothing to install, nothing to pay.

---

## 2. File map (what each file is for)

```
Portfolio -H/
├── index.html            Home page
├── about/index.html      About + skills + typewriter
├── projects/index.html   Live GitHub projects
├── services/index.html   Pricing & services
├── contact/index.html    Contact form + FAQ
│
├── style.css             Home page styles
├── about/style.css       About page styles        (one style file per page)
├── projects/style.css    …
├── services/style.css    …
├── contact/style.css     …
│
├── script.js             Home page behaviour      (one script file per page)
├── about/script.js       Typewriter + skill bars
├── projects/script.js    Entrance reveals
├── services/script.js    Card animations
├── contact/script.js     Form + FAQ accordion
│
├── assets/js/core.js         ⭐ SHARED: loading screen, nav, clock, offline
├── assets/js/github-live.js  ⭐ SHARED: all realtime GitHub logic
├── assets/css/shared.css     ⭐ SHARED: preloader, offline banner, reveals
│
├── offline.html          Cute "You're offline" page (served by sw.js)
├── sw.js                 Service worker (offline caching)
├── images/               logo1.jpg (favicon), logo2.jpg (nav logo)
├── robots.txt            Tells search engines what to crawl
├── sitemap.xml           List of all pages for Google
├── ARCHITECTURE.md       This file
├── AGENTS.md             Change log + roadmap + AI rules
└── README.md             Project summary
```

**Rule of thumb:** page-specific code lives inside the page folder;
anything all 5 pages need lives in `assets/`.

---

## 3. Page flow

```
Browser opens a page
        │
        ├─► head: SEO meta + JSON-LD + shared.css + preloader guard
        │
        ├─► body: preloader (3–5s) covers the screen
        │
        ├─► core.js loads first ……… preloader hides, nav works,
        │                             clock ticks, offline banner armed,
        │                             service worker registers
        │
        ├─► github-live.js loads …… fetches GitHub (or cached/fallback),
        │                             fills stats + project cards if present
        │
        └─► script.js loads ………… page-specific animations only
```

Navigation: every page has the same 5-link nav (relative paths), so the
site works from `file://`, localhost or any hosted folder.

---

## 4. Realtime data flow (projects page)

```
github-live.js
   │
   ├─ localStorage cache fresh (< 30 min)? ──► render instantly
   │
   └─ no ──► fetch api.github.com/users/HemalDas666
                 └─► fetch .../repos?sort=pushed
                       ├─ success: cache it, render live cards + stats
                       └─ fail (offline/rate limit):
                             └─ render built-in FALLBACK list (real data,
                                captured once — site never looks broken)
```

Card images come from GitHub's own preview generator, so **no screenshot
files are needed** — they always match the real repository.

**Edit what shows up:** open `assets/js/github-live.js` and change
`EXCLUDE_REPOS` (names hidden from the site) or `SHOW_FORKS`.

---

## 5. Offline behaviour

1. `core.js` registers `sw.js` (https/localhost only).
2. `sw.js` caches every page/asset you visit (`hd-portfolio-v1` cache).
3. Internet dies:
   - a **toast** drops from the top ("You're offline — live data paused"),
   - already-visited pages still open from cache,
   - never-visited pages show `offline.html` (sleeping Wi-Fi cloud).
4. Internet returns → toast disappears, GitHub data refreshes.

> Cache name bump: when you deploy big changes, change `CACHE_NAME` in
> `sw.js` (e.g. `hd-portfolio-v2`) so visitors get fresh files.

---

## 6. Contact form flow

```
Visitor submits form
   └─► contact/script.js catches it (no page reload)
         └─► POST to formsubmit.co/dashemal08@gmail.com
               ├─ success: green "Message sent!" message
               └─ error:   red message + "email me directly" hint
```

First submission ever: FormSubmit emails you a one-time activation link —
click it once and all future messages arrive automatically.

---

## 7. How to change common things

| You want to… | Edit this |
|---|---|
| Change prices | `services/index.html` → search `$49` |
| Change typewriter words | `about/script.js` → `words` array |
| Hide a repo from the site | `assets/js/github-live.js` → `EXCLUDE_REPOS` |
| Change loading screen text | every `index.html` → `.preloader-sub` |
| Change site colors | `assets/css/shared.css` → `:root` variables + each page's gradient |
| Change contact email | `contact/index.html` (form action) + `core.js`? no — search `formsubmit` |
| Update skills/percentages | `about/index.html` → `.skill-item` blocks |

---

## 8. SEO: how you rank for "Hemal Das"

- **Titles** start with the name on every page.
- **JSON-LD schema** teaches Google: *"Hemal Das = full stack developer,
  Chattogram BD, github.com/HemalDas666"* (sameAs links connect your profiles).
- **sitemap.xml + robots.txt** help Google discover every page.
- **Unique meta descriptions** per page (no duplicate content signals).

After deploying: submit your sitemap in **Google Search Console** and put
"Hemal Das" in your GitHub profile bio — both push the name up fast.

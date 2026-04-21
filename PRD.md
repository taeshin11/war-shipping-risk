# War Shipping Risk — PRD

> Short Title: Maritime security monitor — war-related shipping attacks, mine threats, and restricted zones
> Last Updated: 2026-04-14

---

## Overview

War Shipping Risk monitors the impact of armed conflict on commercial maritime shipping. The site tracks attacks on merchant vessels, mine hazards, piracy incidents linked to conflict actors, and officially declared restricted maritime zones. Key focus areas are the Red Sea / Bab-el-Mandeb (Houthi drone and missile attacks), the Black Sea (mine drift, Ukrainian-Russian naval activity), and the Strait of Hormuz (Iran-related tension).

Each incident is logged with date, location, vessel name (if public), attack type, outcome, and source links. Maritime routes are given an overall risk rating. The site serves shipping companies, maritime insurers, freight traders, and researchers who need a structured, up-to-date picture of conflict-driven maritime risk.

**Live URL:** https://war-shipping-risk.vercel.app

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| Shipping company operations staff | No free, consolidated source for conflict-related vessel incidents | Structured incident log filterable by route and incident type |
| Marine insurance underwriters | Risk assessment requires historical incident data by route | Route-level risk ratings + incident history per route |
| Freight / commodity traders | Shipping disruptions affect cargo prices; hard to track cause | Incident timeline linked to route and cargo type affected |
| Journalists / maritime analysts | Scattered incident reports across multiple agencies | Single JSON-backed database with source attribution |
| Students / researchers | Maritime conflict data is paywalled or highly technical | Free, structured, accessible site in 8 languages |
| General public | Red Sea shipping news hard to contextualise | Plain-language summaries on each incident and route |

---

## Tech Stack

- Framework: Next.js 15 (App Router, SSG)
- Styling: Tailwind CSS
- i18n: next-intl (8 languages: en / ko / ja / zh / es / fr / de / pt)
- Data: JSON files in /public/data/ (incidents.json, routes.json)
- Ads: Adsterra + Google AdSense ca-pub-7098271335538021
- Deployment: Vercel free tier
- Repo: GitHub (public)
- Map: Static SVG map of key maritime zones, or Leaflet (dynamic import, client-only)

---

## Pages & Routes

```
app/
├── [locale]/
│   ├── layout.tsx              # Locale provider, nav, footer, ad slots
│   ├── page.tsx                # Home: global risk dashboard, recent incidents, route status
│   ├── incidents/
│   │   └── page.tsx            # Full incident log with filters
│   ├── routes/
│   │   └── [slug]/
│   │       └── page.tsx        # Per-route page: risk level, incidents, background
│   └── [incidentSlug]/
│       └── page.tsx            # Individual incident detail page
├── api/
│   ├── incidents/
│   │   └── route.ts            # GET /api/incidents — filter by route, type, conflict
│   └── routes/
│       └── route.ts            # GET /api/routes — route risk summaries
└── layout.tsx                  # Root layout (fonts, AdSense script)
```

### Page Descriptions

**Home Dashboard (`/[locale]/`)**
- Global risk header: current overall maritime risk level (aggregated)
- Route status cards: one card per monitored route (Red Sea, Black Sea, Hormuz, Gulf of Aden) with risk badge and one-line status
- Recent incidents feed: 8 most recent incidents, each with: date, route badge, type badge, vessel name, headline, severity
- "Total incidents tracked" stat counter
- Map or SVG: visual overview of affected maritime zones
- Adsterra leaderboard ad below fold

**Incidents Page (`/[locale]/incidents/`)**
- Complete incident log, reverse-chronological
- Filter controls: by route, by incident type (missile/drone attack, mine, piracy, seizure, restricted zone declaration), by conflict, by date range
- Each row: date, route badge, type badge, vessel name (if known), flag, cargo type, headline, outcome badge, source link
- Pagination (25 per page)

**Route Detail Pages (`/[locale]/routes/[slug]/`)**
- SSG from routes.json slugs
- Route name, map region, current risk level (full detail)
- Background section: why this route is affected, which conflicts drive risk
- Active restrictions: officially declared restricted/hazard zones
- Incident history: all incidents.json entries for this route
- Traffic volume affected: estimated shipping volume through this route (mb/d, TEU/month)
- Incident severity chart (static, rendered from route incident counts)

**Incident Detail Pages (`/[locale]/[incidentSlug]/`)**
- SSG from incidents.json slugs
- Full incident details: vessel name, flag state, cargo type, attack type, weapons used, outcome
- Date and time (UTC where known)
- Location description and coordinates
- Conflict actor responsible (or suspected)
- Impact: crew status, vessel status, cargo status
- Source links (2+)
- Related incidents (same route, same attacker)

**API Routes**
- `GET /api/incidents` — full incidents array; supports `?route=`, `?type=`, `?conflict=`, `?limit=`
- `GET /api/routes` — routes array with risk levels

---

## Data Model (JSON schema)

### File: `public/data/incidents.json`

```json
[
  {
    "id": "string (slug-safe, e.g. 'mv-tutor-attack-red-sea-2026-03-15')",
    "slug": "string (matches id)",
    "date": "string (ISO 8601, date or datetime)",
    "route": "string (e.g. 'red-sea', 'black-sea', 'hormuz', 'gulf-of-aden')",
    "conflict": "string (e.g. 'Yemen-Houthi', 'Ukraine-Russia', 'Iran-Israel')",
    "incidentType": "missile-attack | drone-attack | mine | piracy | seizure | restricted-zone | warning-fire | other",
    "headline": "string (max 120 chars)",
    "summary": "string (2–4 sentences)",
    "vesselName": "string | null",
    "vesselFlag": "string (ISO 3166-1 country name) | null",
    "vesselType": "tanker | container | bulk-carrier | warship | other | unknown",
    "cargoType": "oil | lng | grain | general | military | unknown | null",
    "attackActor": "string (e.g. 'Houthi Forces') | null",
    "severity": "low | medium | high | critical",
    "outcome": "string (e.g. 'Vessel abandoned, crew evacuated', 'Minor damage, continued voyage')",
    "crewStatus": "safe | injured | casualties | missing | hostage | unknown",
    "vesselStatus": "undamaged | minor-damage | major-damage | sunk | seized | unknown",
    "coordinates": {
      "lat": "number | null",
      "lon": "number | null"
    },
    "sources": [
      {
        "label": "string",
        "url": "string"
      }
    ],
    "tags": ["string"]
  }
]
```

### File: `public/data/routes.json`

```json
[
  {
    "id": "string (e.g. 'red-sea')",
    "slug": "string",
    "name": "string (e.g. 'Red Sea / Bab-el-Mandeb')",
    "riskLevel": "low | elevated | high | critical",
    "currentStatus": "string (2–3 sentence current situation overview)",
    "activeRestrictions": ["string (official restriction or exclusion zone descriptions)"],
    "conflictsAffecting": ["string (conflict slugs)"],
    "shippingVolumeNote": "string (e.g. '~12% of global trade transits this route')",
    "backgroundSummary": "string (3–5 sentences on why this route is at risk)",
    "lastUpdated": "string (ISO 8601 date)",
    "coordinates": {
      "lat": "number",
      "lon": "number"
    }
  }
]
```

### Field Notes
- `incidentType`: `restricted-zone` covers official government or military declarations
- `severity`: based on crew/vessel outcome, not just damage — a crew fatality is `critical` regardless of vessel damage
- `attackActor`: use official names or well-sourced attributions; avoid speculation
- `cargoType`: important for cargo insurance angle; affects SEO keyword targeting for energy and grain traders

---

## Milestones & Git Push Points

### M0 — Project Scaffold
- Next.js 15 init, Tailwind, next-intl for 8 locales
- Empty `incidents.json` (1 placeholder) and `routes.json` (4 placeholder routes)
- Vercel project linked; first deploy succeeds
- Git push: `chore: init war-shipping-risk scaffold`

### M1 — Data Layer & API
- `incidents.json` populated with 20+ real incidents (Red Sea focus)
- `routes.json` populated with Red Sea, Black Sea, Hormuz, Gulf of Aden
- API routes implemented with all filter params
- TypeScript types for Incident and Route
- Git push: `feat: incidents and routes data layer with API routes`

### M2 — Home Dashboard
- Risk header + route status cards with colour-coded risk levels
- Recent incidents feed (8 items)
- Stat counter component
- Maritime zone SVG or Leaflet map (dynamic import)
- Git push: `feat: home dashboard — route cards, incidents feed, map`

### M3 — Incidents Page & Filters
- Full incident log with pagination
- Filter controls: route, type, conflict, date range
- Incident row component
- Git push: `feat: incidents list page with filter and pagination`

### M4 — Route & Incident Detail Pages
- SSG: route detail pages from routes.json slugs
- SSG: incident detail pages from incidents.json slugs
- Related incidents component on detail pages
- Git push: `feat: route and incident detail pages SSG`

### M5 — i18n, Ads, SEO
- next-intl messages for all 8 languages
- Adsterra and AdSense units integrated
- Sitemap covering all route and incident slugs × locales
- Structured data on incident detail pages
- Git push: `feat: i18n, ads, sitemap, structured data`

### M6 — Launch
- 30+ incidents across 3+ routes; routes.json fully populated
- All 8 locale routes verified
- Lighthouse ≥ 90
- Google Search Console sitemap submitted
- Git push: `chore: launch — 30 incidents, full route data`

---

## Agent Team

### Frontend Agent
**Responsibilities:**
- Dashboard layout: risk header, route status cards, incidents feed, stat counter
- Route risk card component (colour-coded by risk level)
- Incident row and card components (type badge, severity badge, outcome tag)
- Filter controls and pagination for incidents page
- Route detail and incident detail page layouts
- Maritime zone map component (SVG or Leaflet dynamic import)
- Ad slot placement

**Key files:** `app/[locale]/page.tsx`, `app/[locale]/incidents/page.tsx`, `app/[locale]/routes/[slug]/page.tsx`, `app/[locale]/[incidentSlug]/page.tsx`, `components/RouteCard.tsx`, `components/IncidentRow.tsx`, `components/MaritimeMap.tsx`

### Backend / Data Agent
**Responsibilities:**
- Maintain and validate `incidents.json` and `routes.json`
- API routes with all filter params
- TypeScript types
- `generateStaticParams` for route and incident SSG pages
- Data validation scripts: unique slugs, valid enums, coordinates in range

**Key files:** `app/api/incidents/route.ts`, `app/api/routes/route.ts`, `public/data/incidents.json`, `public/data/routes.json`, `types/`, `lib/getIncidents.ts`, `lib/getRoutes.ts`

### SEO / Content Agent
**Responsibilities:**
- Research and write 30+ incidents with accurate details and source links
- Route summaries with accurate risk levels and restriction data
- Keyword-optimised titles and descriptions
- next-intl messages for 8 languages
- Structured data (JSON-LD) on incident detail pages
- Sitemap generation

**Key files:** `public/data/incidents.json`, `public/data/routes.json`, `messages/`, `app/sitemap.ts`

### QA Agent
**Responsibilities:**
- Validate JSON schemas
- Test all API filters
- Verify all SSG pages (routes × locales)
- Confirm incident detail pages all resolve
- Lighthouse audits
- Source link validation
- Confirm map renders without blocking main thread

---

## SEO Strategy

### Primary Keywords

| Keyword | Monthly Volume (est.) | Intent | Target Page |
|---|---|---|---|
| red sea shipping attacks | 14,000 | Informational | Home / Red Sea route |
| war maritime risk | 3,800 | Informational | Home |
| shipping disruption conflict | 4,200 | Informational | Home / Incidents |
| houthi shipping attacks | 18,000 | Informational | Incidents (Houthi) / Red Sea route |
| black sea mine shipping | 5,100 | Informational | Black Sea route page |
| strait of hormuz shipping risk | 6,300 | Informational | Hormuz route page |
| red sea tanker attacks 2026 | 9,500 | Informational | Incidents page / Red Sea route |
| war zone shipping insurance | 3,200 | Commercial | Route detail pages |

### On-Page SEO
- Home `<title>`: `War Shipping Risk — Maritime Attack & Route Risk Tracker 2026`
- Route `<title>`: `Red Sea Shipping Risk — Houthi Attacks & Route Status | War Shipping Risk`
- Incident `<title>`: `[Vessel] [Incident Type] — [Route] [Date] | War Shipping Risk`
- Meta descriptions: 150–160 chars; include route name and incident type
- `hreflang` all 8 locales on every page

### Structured Data
- `NewsArticle` on incident detail pages: `headline`, `datePublished`, `description`, `author`
- `FAQPage` on route detail pages: Q&A format covering "Is [route] safe?", "What attacks have happened?"
- `Dataset` schema on incidents page

### Content Strategy
- Add new incidents within 24–48 hours of credible reports
- Prioritise Red Sea (highest search volume) and Black Sea
- Route detail pages are evergreen; update `currentStatus` with each major development
- Internal linking: incidents page → route detail → related incidents

### Technical SEO
- Sitemap: all incident slugs + route slugs × 8 locales
- No heavy dependencies on initial load; Leaflet map dynamic-imported
- Image alt text on all map illustrations

---

## Launch Checklist

- [ ] `incidents.json` has 30+ entries across 3+ routes with valid schema
- [ ] `routes.json` has entries for Red Sea, Black Sea, Hormuz, Gulf of Aden
- [ ] Home dashboard renders: risk header, route cards, incidents feed
- [ ] `/api/incidents` returns valid JSON; `?route=`, `?type=`, `?conflict=` filters work
- [ ] `/api/routes` returns valid JSON
- [ ] Incidents page filter controls work; pagination works
- [ ] Route detail SSG pages generated for all routes in routes.json
- [ ] Incident detail SSG pages generated for all slugs in incidents.json
- [ ] Map component renders (no console errors)
- [ ] All 8 locale routes return HTTP 200
- [ ] Adsterra and AdSense units present in production
- [ ] `sitemap.xml` accessible; submitted to Google Search Console
- [ ] `robots.txt` allows all crawlers
- [ ] `hreflang` tags on all pages
- [ ] Incident structured data validates in Rich Results Test
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 90
- [ ] No broken source links
- [ ] Vercel Analytics enabled
- [ ] Live URL confirmed: war-shipping-risk.vercel.app

Boycott Extension — MVP Product/Delivery Plan

0. Vision & Success Metrics
   Goal KPI Target for v1
   Empower users to avoid sites/brands on selected boycott lists - % of flagged visits that users “leave” ≥ 25 %
   Effortless list maintenance by you (the curator) New list item → ≤ 15 min until live in prod 100 % of pushes
   Solid base for cross-browser future All code passes Firefox Web-Extension validator Yes

1. Technical Foundations & Dev Setup
   Task Notes / Acceptance Criteria
   1.1 Repo & Tooling • GitHub mono-repo «boycott-ext» (MIT).
   • Node ≥ 20, pnpm or npm ≥ 10.
   • Initialize vite + ts template targeted at Manifest V3.
   • ESLint + Prettier + Husky pre-commit.
   1.2 Shared Types & SDK /packages/sdk → TypeScript types for List, Item, Source; helper to query the API (see §2).
   1.3 Unit & E2E tests • Jest for logic tests.
   • Playwright-Chromium for extension E2E (loads unpacked build, simulates navigation, checks banner).
   1.4 CI/CD GitHub Actions: lint → test → build; on main create signed ZIP artefact.
   Optional: push to Chrome Web Store via Chrome CI action.
   1.5 Cross-browser hygiene Add @mozilla/webextension-polyfill and run web-ext lint in CI to surface Firefox issues immediately.
   MDN Web Docs
   MDN Web Docs

2. Data-Layer (Lists API & Admin)
   Task Notes
   2.1 Source research • Ethical Consumer boycott endpoints
   Ethical Consumer
   .
   • BDS movement priority targets
   BDS Movement
   .
   • OpenSanctions for sanctions-based lists (already has swagger API)
   api.opensanctions.org
   .
   2.2 Aggregator service Small Fastify/Express micro-service (or Cloudflare Workers) that:
   a. Scrapes / ingests each source on daily cron.
   b. Normalises to { id, name, urlPatterns[ ], tags[ ], lastUpdated, source }.
   c. Publishes static JSON at https://your-cdn/lists/{slug}.json and an index (lists.json) enumerating all lists and metadata.
   2.3 Admin console Auth-gated (Google OAuth) web UI built with Next.js (or Supabase Studio) to:
   • Toggle list visibility, edit metadata.
   • Add custom single entries that aren’t in upstream data.
   • Trigger immediate republish.
   2.4 Versioning & Caching Response headers Cache-Control: public, max-age=86400, plus ETag for diffing. Extension stores lastEtag in chrome.storage.local to fetch deltas only.

3. Extension Architecture (Chrome ≥ MV3)
   Component Responsibilities / Key APIs
   Service Worker (background.ts) • Fetch lists on startup or when etag changes.
   • Listen chrome.webNavigation.onCommitted to capture top-level navigations.
   • Match URL against combined urlPatterns with URLPattern / regex.
   • If hit → send message to content script.
   Chrome for Developers
   Content Script (banner.tsx) Injects shadow-DOM banner with warning, list badges, “Proceed / Leave” buttons.
   Uses document.visibilityState + MutationObserver to hide/re-show for SPAs.
   Options Page (options.html) • Checkbox list of available boycott lists.
   • “Learn more” links to list source.
   • Stores user prefs in chrome.storage.sync (so settings roam).
   Popup UI Browser-action icon shows quick toggle per-site + open settings.
   Analytics (opt-in) Anonymous events (site_flagged, user_left) via Plausible or self-hosted.

4. Feature Backlog (MVP ✅ / Later 🚧)
   ID Feature Priority
   F-1 Fetch & merge boycott lists, respecting user selections ✅
   F-2 Real-time alert banner with continue/leave ✅
   F-3 Options page to enable/disable lists ✅
   F-4 Automatic update when API publishes new etag ✅
   F-5 Suggest alternative sites/products (e.g., ethicalconsumer alternatives API) 🚧
   F-6 Product-page highlighting on e-commerce sites (blur/overlay) 🚧
   F-7 Barcode/UPC scanning companion mobile app 🚧
   F-8 Cross-browser builds (Firefox AMO, Edge Add-ons) 🚧
   F-9 Localisation (i18n JSON + Crowdin pipeline) 🚧
   F-10 Community-submitted lists with moderation queue 🚧

5. Security & Privacy
   Least-privilege permissions — request only "webNavigation", "storage", "declarativeNetRequest" (if you later auto-block) and host permissions added dynamically via optional_permissions.
   MDN Web Docs

Content-Security-Policy set to avoid inline scripts/styles.

Data collection requires explicit opt-in (GDPR + Chrome policy).

Code signing — use Chrome Web Store’s review + supply checksums.txt in repo for reproducibility.

6. Testing & QA
   Layer Tooling Scenarios
   Unit Jest + Vitest Pattern-matching, storage, message-passing
   Component React Testing-Library Banner rendering with various list combos
   E2E Playwright Chromium • Navigate to allowed vs. boycotted sites
   • Reload → ensure banner state persists
   • Options changes propagate immediately
   Manual Canary/Dev builds Memory footprint, race conditions with heavy pages

7. Release & Distribution
   Internal alpha — load unpacked, dog-food with curated lists.

Chrome Web Store — submit under “Productivity › Shopping tools”; provide privacy policy & list update cadence.

Edge Add-ons — same ZIP after validation.

Firefox — run web-ext build && sign; resolve any MV3 API gaps (Firefox supports most MV3 as of 2025).
MDN Web Docs

8. Roadmap to “Beyond Chrome”
   Milestone Tasks
   M-1 WebExtensions parity Audit APIs used; replace any chrome._ globals with browser._ via polyfill; rely on promises instead of callbacks.
   M-2 Safari (WebExtension) Xcode converter → fix plist entitlements; test on iOS 17+.
   M-3 Mobile Companion (Android & iOS) Use same list JSON; barcode scan & share-sheet intercepts.
   M-4 Serverless alt-product recommender\*\* Graph of products ↔ boycott status ↔ alternatives.

9. Risks & Mitigations
   Risk Impact Mitigation
   List accuracy / defamation claims High legal Keep source attribution, publish correction workflow, respect takedown notices
   API rate-limits or downtime Medium UX Cache lists, exponential back-off
   Chrome store policy changes (e.g., political content) Medium removal Follow MV3, no hidden tracking, provide clear value statement
   High banner fatigue → uninstalls Medium retention Allow granular list toggles & "silent mode" icon-badge only

10. Next Steps (Sprint 0)
    Create repo & automate build/test (tasks 1.1 → 1.4).

Draft JSON schema & spin up lightweight Cloudflare Worker that serves a hard-coded “demo” list.

Build minimal service-worker that flags example.com → prove banner injection.

Hold design review & lock scope for Sprint 1.

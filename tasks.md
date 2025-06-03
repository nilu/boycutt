- [x] **Sprint 0 — Boot & "Hello Banner"**

  - [x] Init repo boycott-ext (public, MIT).
    - [x] Verify: remote clone & first commit pushes green.
  - [x] Node toolchain → corepack enable, pnpm install.
    - [x] Verify: node -v ≥ 20, pnpm build succeeds.
  - [x] Scaffold Vite + TypeScript Manifest V3 template.
    - [x] Verify: loads as unpacked extension, icon appears.
  - [x] Lint/Format → ESLint, Prettier, husky pre-commit hook.
    - [x] Verify: committing with lint error blocks push.
  - [x] Polyfill add webextension-polyfill for cross-browser.
  - [ ] CI GitHub Actions: lint → test → build ZIP artefact.
  - [ ] Demo data service
  - [ ] Deploy Cloudflare Worker that serves lists.json with example.com.
  - [ ] Hard-code fetch in service-worker, store in chrome.storage.local.
  - [ ] Banner POC
  - [ ] On visit to example.com, inject banner component.
  - [ ] "Leave / Continue" buttons alter window.location / dismiss.

- [ ] **Sprint 1 — Data Layer & Admin**

  - [ ] Choose sources (EthicalConsumer, BDS, OpenSanctions, etc.).
  - [ ] Design JSON schema {id, name, urlPatterns[], tags[], source, updated}.
  - [ ] Aggregator script (Fastify/Workers Cron) → pull & normalize nightly.
    - [ ] Verify: local run outputs valid list files.
  - [ ] ETag + caching headers; extension pulls only when changed.
  - [ ] Admin console (Next.js or Supabase):
    - [ ] OAuth-protected login.
    - [ ] CRUD lists & single overrides.
    - [ ] "Republish now" button.

- [ ] **Sprint 2 — Extension Core**

  - [ ] Service Worker
    - [ ] Startup fetch lists, merge user-enabled sets.
    - [ ] Listen chrome.webNavigation.onCommitted.
    - [ ] Regex/URLPattern match → postMessage to tab.
  - [ ] Content Script
    - [ ] Shadow-DOM banner (React/Tailwind).
    - [ ] Show list badges + links to "Why?".
  - [ ] Options Page
    - [ ] Checkbox per list, stored in chrome.storage.sync.
    - [ ] "Update now" + export/import prefs JSON.
    - [ ] Browser-action popup quick per-site toggle.
  - [ ] Permissions hardening: only "storage", "webNavigation", dynamic hosts.

- [ ] **Sprint 3 — Tests & Quality**

  - [ ] Unit tests (Vitest/Jest) → matcher utils, storage helpers.
  - [ ] Component tests (React-Testing-Library) → banner variants.
  - [ ] E2E Playwright-Chromium: navigate, verify banner logic.
  - [ ] Manual perf pass: memory, paint jank on heavy sites.

- [ ] **Sprint 4 — Ship It**

  - [ ] Update marketing copy, icons (128 / 48 / 16 px).
  - [ ] Create Privacy Policy & FAQ (link to sources & takedown contact).
  - [ ] Package & upload to Chrome Web Store (dev channel).
  - [ ] Edge Add-ons submit same ZIP.
  - [ ] Run web-ext build && sign → verify Firefox passes.

- [ ] **Backlog / Nice-To-Have**
  - [ ] Alternative-site suggestions API.
  - [ ] E-commerce product page blur/overlay.
  - [ ] Community-submitted lists + moderation queue.
  - [ ] i18n pipeline (Crowdin).
  - [ ] Safari WebExtension build via Xcode converter.
  - [ ] Mobile companion (barcode scan).

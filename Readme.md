# 🛑 Boycott Extension

> A privacy-respecting **Manifest V3** browser extension that warns (or blocks) visits to websites and products appearing on boycott lists you choose — e.g. *Pro-BDS targets*, *anti-US brands*, or any other curated group.

[![CI Status](https://github.com/your-handle/boycott-ext/actions/workflows/ci.yml/badge.svg)](./actions)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/XXXXXXXXXXXXXXX.svg?logo=googlechrome)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

---

## ✨ Features

| ✨ | What it does | Status |
|----|--------------|--------|
| 🚦 **Instant alerts** | Pops a banner when you land on a listed site with "Leave / Continue" options | ✅ v1 |
| 🎛 **List chooser** | Enable/disable boycott lists from the Options page; syncs across devices | ✅ v1 |
| 🔄 **Live updates** | Lists are fetched from your CDN/API and cached with ETag diffing | ✅ v1 |
| 🛡 **Minimal permissions** | Requests only the APIs it needs (`webNavigation`, `storage`, dynamic hosts) | ✅ v1 |
| 🗂 **Cross-browser ready** | Code passes Firefox `web-ext lint`; Edge store compatible | 🛠 |
| 🛍 **Alt-product suggestions** | Recommends ethical alternatives when available | ⏭ roadmap |

---

## 📸 Screenshots

> *(Add real screenshots once you have them)*

| Landing on a boycotted site | Options page (list selector) |
|-----------------------------|------------------------------|
| ![banner](docs/img/banner.png) | ![options](docs/img/options.png) |

---

## 🏗️ Getting Started (for Developers)

### 1. Prerequisites

- **Node 20+** & **pnpm** (corepack enabled)
- Chrome ≥ 114 (Manifest V3) or Firefox ≥ 121 (WebExtensions MV3)
- Git

```bash
git clone https://github.com/your-handle/boycott-ext.git
cd boycott-ext
corepack enable     # enables pnpm
pnpm i              # install deps
```

### 2. Run Extension in Dev mode

```bash
pnpm dev            # vite builds w/ HMR to ./dist
# then in Chrome: chrome://extensions → "Load unpacked" → ./dist
pnpm dev:watch      # rebuild service-worker on save
```

### 3. Build for Production

```bash
pnpm build          # outputs signed ZIP to ./packages/artifacts
```

### 4. Running Tests

```bash
pnpm test           # vitest + jest unit tests
pnpm e2e            # playwright integration suite
```

---

## 🗄 Project Layout

```
.
├── apps/
│   └── admin-console/        # Next.js CRUD for list management
├── packages/
│   ├── extension/            # MV3 code (service-worker, content, UI)
│   └── sdk/                  # Shared TS types & helpers
├── services/
│   └── aggregator/           # Cloudflare Worker that fetches + normalises boycott sources
├── docs/                     # screenshots, architecture diagrams
└── .github/                  # CI pipeline
```

---

## ⚙️ Architecture Overview

| Layer          | Tech                              | Responsibilities                                                                                  |
|--------------- |-----------------------------------|---------------------------------------------------------------------------------------------------|
| Aggregator     | Cloudflare Workers Cron + KV      | Nightly ingest of third-party boycott feeds (EthicalConsumer, BDS, OpenSanctions) → normalises to lists/*.json |
| Extension SW   | TypeScript, chrome.webNavigation  | Fetches lists on boot/etag change, matches navigations, sends alert messages                      |
| Content Script | React + Shadow DOM                | Renders non-intrusive banner with list badges & CTA buttons                                       |
| Storage        | chrome.storage.sync               | User-enabled list slugs, dismissed banners, analytics opt-in                                      |
| Admin Console  | Next.js + Google OAuth            | Toggle list visibility, manual item overrides, force-publish                                      |

(See `docs/architecture.md` for full diagrams.)

---

## 📦 Distributing

```bash
pnpm build   # generates a signed ZIP boycott-ext.zip
```

- **Chrome Web Store**: Dashboard → Items → Upload ZIP → fill metadata & privacy policy
- **Edge Add-ons** — same artifact
- **Firefox AMO**:

```bash
web-ext build && web-ext sign
```

---

## 🛡 Security & Privacy

- Least privilege permission set
- No personal data is transmitted unless the user opts-in to anonymous usage analytics
- All boycott data is sourced & attributed; takedown requests honoured within 48 h

See `SECURITY.md` for reporting vulnerabilities

---

## 🗺 Roadmap

- Browser-action popup site toggle
- Ethical-alternative recommender API
- Community-submitted lists w/ moderation
- i18n (Crowdin)
- Safari (macOS + iOS) build
- Mobile companion app (barcode scanner)

---

## 🤝 Contributing

PRs & issues welcome! Please follow the commit convention and run the test suite before pushing:

```bash
pnpm lint && pnpm test && pnpm build
```

- Fork → feature branch → PR
- Describe why the change is valuable
- Ensure CI passes; maintainers will review ASAP

---

## © License

Licensed under the MIT License – see LICENSE for details.

Built with ❤ by Your Name (@your-handle).

"Code is a political act — choose your dependencies wisely."

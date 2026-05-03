# Playwright Test Framework (JavaScript)

UI test automation for [Delek Homes](https://dev.delekhomes.com) using Playwright with the Page Object Model.

## Project Structure

```text
week-12-ai/
|-- tests/
|   |-- happy-path/        # Primary user journeys
|   |-- negative/          # Validation and edge cases
|   `-- auth.setup.js      # Login once → saves storage state for authenticated project
|-- pages/                 # Page Object Model (POM) classes
|-- data/                  # Test data and factories
|-- utils/                 # Shared helpers
|-- .github/workflows/     # CI (GitHub Actions)
|-- global-setup.js        # Pre-flight health check against BASE_URL
|-- playwright.config.js
|-- package.json
`-- README.md
```

## Setup

```bash
npm install
npx playwright install --with-deps
```

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `BASE_URL` | Target site URL (defaults to `https://dev.delekhomes.com`) |
| `DELEK_EMAIL` | Existing account email (login, auth setup, session persistence, several specs) |
| `DELEK_PASSWORD` | Password for that account |
| `DELEK_REG_PASSWORD` | Password used when registering new users in tests |

## Running Tests

```bash
npm test                   # run all tests (headless)
npm run test:headed        # run with browser visible
npm run test:ui            # open Playwright UI mode
npm run test:report        # view the last HTML report
```

## Test Overview

### Happy-path (`tests/happy-path/`)

| Test file | What it covers |
|-----------|----------------|
| `login.spec.js` | Login with valid credentials; logout and session invalidation |
| `registration.spec.js` | Register a new user (Faker); optional API cleanup after each test |
| `search.spec.js` | City search from homepage, search with no criteria, keyword search on Featured Listings |
| `session-persistence.spec.js` | Auth survives navigation and hard refresh (runs with saved `storageState` from setup) |

### Negative (`tests/negative/`)

| Test file | What it covers |
|-----------|----------------|
| `login-validation.spec.js` | Protected-route redirect, wrong password, unknown email, empty fields, malformed email |
| `registration-validation.spec.js` | Duplicate email, missing first/last/email/password, malformed email |
| `search-validation.spec.js` | Unknown keyword, fake city, XSS-style input, whitespace-only search |

### Projects (in `playwright.config.js`)

| Project | Browser | Purpose |
|---------|---------|---------|
| `setup` | — | Runs `auth.setup.js`; writes `playwright/.auth/user.json` |
| `authenticated` | Chromium (Desktop Chrome) | Runs `session-persistence.spec.js` with stored auth |
| `default` | Chromium (Desktop Chrome) | All other specs (no pre-loaded session) |

## Notes

- Keep specs thin; put interactions and assertions in `page` classes under `pages/`.
- Routes in page objects are relative; `baseURL` is set once in `playwright.config.js`.
- Reusable factories live under `data/` (for example `createUniqueRegistrationUser`).
- `DELEK_EMAIL` / `DELEK_PASSWORD` are required for the setup project, session persistence, happy-path login, and any spec that reads those credentials from `data/testCredentials.js`.

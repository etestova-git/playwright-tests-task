# Playwright Tests Project

This project contains end-to-end tests using Playwright with TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

- Run all tests:
```bash
npx playwright test
```

- Run tests with UI mode:
```bash
npx playwright test --ui
```

- Run tests in specific browser:
```bash
npx playwright test --project=chromium
```

- Run tests in debug mode:
```bash
npx playwright test --debug
```

- Generate tests using Codegen:
```bash
npx playwright codegen
```

## Project Structure

- `tests/` - Contains test files
- `tests-examples/` - Contains example test files
- `playwright.config.ts` - Playwright configuration file
- `.github/workflows/playwright.yml` - GitHub Actions workflow for running tests

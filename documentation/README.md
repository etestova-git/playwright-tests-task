# Playwright Tests Task - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup and Installation](#setup-and-installation)
4. [Project Structure](#project-structure)
5. [Page Object Model](#page-object-model)
6. [Test Scenarios](#test-scenarios)
7. [Configuration](#configuration)
8. [Running Tests](#running-tests)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Project Overview

This is a comprehensive Playwright test automation project for testing the Knowledge Base functionality of a Self Service Portal application. The project implements the Page Object Model design pattern and includes both smoke and regression test suites.

### Application Under Test
- **URL**: https://showcase-x.alloyservice.com/hd/
- **Application Type**: Self Service Portal with Knowledge Base functionality
- **Framework**: Material-UI based web application

### Key Features Tested
- Knowledge Base navigation
- Article search functionality
- Article sorting capabilities
- Breadcrumb navigation
- Search results validation

## Architecture

The project follows a modular architecture based on the Page Object Model (POM) pattern:

```
playwright-tests-task/
├── pages/                 # Page Object Models
├── tests/                 # Test specifications
├── documentation/         # Project documentation
├── utils/                 # Utility functions
├── playwright.config.ts   # Playwright configuration
└── package.json          # Project dependencies
```

### Design Patterns Used
1. **Page Object Model (POM)** - Encapsulates page elements and actions
2. **Composition Pattern** - ManagePage aggregates other page objects
3. **Factory Pattern** - Centralized page object creation
4. **Test Data Management** - Configurable test data and constants

## Setup and Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

### Environment Setup
The project is configured to test against the live application at `https://showcase-x.alloyservice.com/hd/`. No additional environment configuration is required.

## Project Structure

### `/pages` Directory
Contains Page Object Model implementations:

- **`BasePage.ts`** - Base class with common functionality
- **`HomePage.ts`** - Home page interactions
- **`KnowledgeBasePage.ts`** - Knowledge Base specific actions
- **`SearchResultsPage.ts`** - Search results page interactions
- **`ManagePage.ts`** - Composition class aggregating all pages
- **`index.ts`** - Barrel export for clean imports

### `/tests` Directory
Contains test specifications:

- **`knowledge-base.spec.ts`** - Main test suite
- **`knowledge-base-structure.spec.ts`** - Additional structural tests

### `/utils` Directory
Contains utility functions:

- **`isSorted.ts`** - Helper functions for sorting validation

### Configuration Files
- **`playwright.config.ts`** - Playwright test configuration
- **`package.json`** - Project dependencies and scripts

## Page Object Model

### BasePage Class
Base class providing common functionality across all pages:

```typescript
class BasePage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  
  // Common methods:
  async openBurgerMenu()
  async performSearch(searchTerm: string)
  async clearSearch()
  async verifySearchValue(expectedValue: string)
}
```

### HomePage Class
Handles home page specific interactions:

```typescript
class HomePage extends BasePage {
  // Home page specific locators and methods
  async goto()
  async verifyPageLoaded()
  async navigateToKnowledgeBase()
  async verifyBurgerMenuOpened()
}
```

### KnowledgeBasePage Class
Manages Knowledge Base page interactions:

```typescript
class KnowledgeBasePage extends BasePage {
  readonly sortingOptions = ['Alphabetical', 'Highest Rated', 'Most Popular', 'Newest First'] as const;
  
  // Key methods:
  async verifyPageLoaded()
  async verifyPageStructure()
  async verifyArticleCount()
  async changeArticleSorting(order)
  async verifyArticleSorting(order)
  async findArticleTitle()
}
```

### ManagePage Class (Composition Pattern)
Aggregates all page objects for centralized management:

```typescript
class ManagePage {
  homePage: HomePage;
  knowledgeBasePage: KnowledgeBasePage;
  searchResultsPage: SearchResultsPage;
  basePage: BasePage;
}
```

## Test Scenarios

### Smoke Tests (`@smoke`)
Critical path tests that must pass for basic functionality:

1. **Navigation to Knowledge Base via burger menu**
   - Verifies basic navigation flow
   - Checks page structure and article presence

2. **Successful search in Knowledge Base**
   - Dynamic article title extraction
   - Search functionality validation
   - Result count verification

### Regression Tests (`@regression`)
Comprehensive tests covering edge cases and detailed functionality:

1. **Unsuccessful search handling**
   - No results state verification
   - Error message validation

2. **Article sorting functionality**
   - Multiple sorting options
   - Sort order verification
   - View count comparison

3. **Breadcrumb navigation**
   - Navigation element verification
   - Back navigation functionality

## Configuration

### Playwright Configuration
Key configuration settings in `playwright.config.ts`:

```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
```

### Test Tagging Strategy
- `@smoke` - Critical functionality tests
- `@regression` - Comprehensive feature tests

## Running Tests

### Available Scripts
```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run with debugging
npm run test:debug

# Run only smoke tests
npm run test:smoke
```

### Command Line Options
```bash
# Run specific test file
npx playwright test knowledge-base.spec.ts

# Run tests with specific tag
npx playwright test --grep "@smoke"

# Run tests in headed mode
npx playwright test --headed

# Run with UI mode
npx playwright test --ui

# Debug specific test
npx playwright test --grep "Navigation to Knowledge Base" --debug
```

### Browser Configuration
Tests run on multiple browsers by default:
- Chromium (Chrome)
- Firefox
- WebKit (Safari)

## Best Practices

### 1. Page Object Design
- **Single Responsibility**: Each page object handles one page
- **Encapsulation**: Hide implementation details
- **Reusability**: Common functionality in base classes

### 2. Locator Strategy
- **Prefer semantic locators**: `getByRole()`, `getByText()`
- **Use data attributes**: `data-testid` for stable selectors
- **CSS classes as fallback**: Material-UI classes when necessary

### 3. Test Structure
- **Arrange-Act-Assert pattern**
- **Test steps for clarity**
- **Descriptive test names**

### 4. Data Management
- **Dynamic data extraction**: `findArticleTitle()` method
- **Parameterized tests**: Type-safe sorting options
- **Configurable constants**: Centralized configuration

### 5. Error Handling
- **Proper waits**: `waitForURL()`, `toBeVisible()`
- **Timeout configuration**: Appropriate timeouts for different actions
- **Graceful failures**: Meaningful error messages

## Troubleshooting

### Common Issues

#### 1. Strict Mode Violations
**Problem**: `Error: strict mode violation: locator resolved to X elements`

**Solution**: Use `.first()`, `.last()`, or more specific locators
```typescript
// Instead of:
await expect(this.articlesList).toBeVisible();

// Use:
await expect(this.articlesList.first()).toBeVisible();
```

#### 2. Element Interception
**Problem**: `Element is not clickable - intercepted by another element`

**Solution**: Use `force: true` or handle overlays
```typescript
await this.menuButton.click({ force: true });
```

#### 3. Timing Issues
**Problem**: Elements not found or not visible

**Solution**: Proper waits and timeouts
```typescript
await expect(element).toBeVisible({ timeout: 30000 });
await this.page.waitForURL(/knowledgeBase/, { timeout: 15000 });
```

### Debug Techniques

1. **Use Playwright Inspector**:
```bash
npx playwright test --debug
```

2. **Screenshots and traces**:
```typescript
await page.screenshot({ path: 'debug.png' });
```

3. **Console logging**:
```typescript
console.log(await element.textContent());
```

### Performance Optimization

1. **Parallel execution**: Enabled by default
2. **Selective test runs**: Use tags and grep patterns
3. **Efficient locators**: Avoid complex CSS selectors
4. **Page object reuse**: Single instance per test

## Maintenance

### Regular Tasks
1. **Update dependencies**: Keep Playwright and Node.js updated
2. **Review locators**: Check for UI changes in the application
3. **Test data refresh**: Update expected values if application changes
4. **Performance monitoring**: Track test execution times

### Extending the Framework
1. **New pages**: Follow existing page object patterns
2. **Additional utilities**: Add to `/utils` directory
3. **Custom reporters**: Configure in `playwright.config.ts`
4. **CI/CD integration**: Use environment variables for configuration

---

*This documentation is maintained alongside the test automation framework. For questions or contributions, please refer to the project repository.*

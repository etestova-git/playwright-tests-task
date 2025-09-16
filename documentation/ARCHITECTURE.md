# Architecture Guide

## Overview

This document describes the architectural decisions, design patterns, and structural organization of the Playwright test automation framework.

## Design Patterns

### 1. Page Object Model (POM)

The foundation of the framework architecture is the Page Object Model pattern, which provides:

#### Benefits:
- **Separation of Concerns**: UI interactions separated from test logic
- **Maintainability**: UI changes require updates only in page objects
- **Reusability**: Page objects can be used across multiple tests
- **Readability**: Tests focus on business logic, not implementation details

#### Implementation:
```typescript
// Base pattern
class PageName extends BasePage {
  readonly elementName: Locator;
  
  constructor(page: Page) {
    super(page);
    this.elementName = page.locator('selector');
  }
  
  async actionMethod(): Promise<void> {
    await this.elementName.click();
  }
}
```

### 2. Composition Pattern

The `ManagePage` class uses composition to aggregate multiple page objects:

```typescript
class ManagePage {
  homePage: HomePage;
  knowledgeBasePage: KnowledgeBasePage;
  searchResultsPage: SearchResultsPage;
  basePage: BasePage;
  
  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.knowledgeBasePage = new KnowledgeBasePage(page);
    this.searchResultsPage = new SearchResultsPage(page);
    this.basePage = new BasePage(page);
  }
}
```

#### Benefits:
- **Centralized Management**: Single entry point for all page objects
- **Simplified Test Code**: Reduce page object instantiation in tests
- **Consistent State**: Shared page instance across all objects
- **Factory Pattern**: Centralized object creation

### 3. Inheritance Hierarchy

```
BasePage (Abstract base class)
├── HomePage
├── KnowledgeBasePage  
└── SearchResultsPage
```

#### BasePage Responsibilities:
- Common UI elements (header, navigation, search)
- Shared functionality (menu operations, search)
- Base constructor and page reference
- Common utilities and helpers

#### Derived Page Responsibilities:
- Page-specific elements and locators
- Page-specific business logic
- Specialized validation methods
- Navigation and workflow methods

### 4. Barrel Export Pattern

The `pages/index.ts` file implements the barrel export pattern:

```typescript
export { BasePage } from './BasePage';
export { HomePage } from './HomePage';
export { KnowledgeBasePage } from './KnowledgeBasePage';
export { SearchResultsPage } from './SearchResultsPage';
```

#### Benefits:
- **Clean Imports**: Single import statement for multiple classes
- **Module Interface**: Clear public API for the pages module
- **Refactoring Safety**: Internal changes don't affect import statements
- **Namespace Management**: Organized exports from complex modules

## Class Architecture

### BasePage Class Structure

```typescript
export class BasePage {
  readonly page: Page;           // Playwright page instance
  readonly menuButton: Locator;  // Common navigation elements
  readonly searchBox: Locator;   // Global search functionality
  readonly searchButton: Locator;
  
  constructor(page: Page) {
    // Initialize common elements
  }
  
  // Common methods available to all pages
  async openBurgerMenu(): Promise<void>
  async performSearch(searchTerm: string): Promise<void>
  async clearSearch(): Promise<void>
  async verifySearchValue(expectedValue: string): Promise<void>
}
```

### Page-Specific Extensions

Each page extends BasePage and adds:
- **Specific Locators**: Elements unique to that page
- **Business Methods**: Actions that make sense for that page
- **Validation Methods**: Verifications specific to page state
- **Navigation Methods**: Transitions to other pages

## Locator Strategy

### Hierarchy of Selector Preferences

1. **Semantic Locators (Preferred)**
   ```typescript
   page.getByRole('button', { name: 'Submit' })
   page.getByText('Knowledge Base')
   page.getByLabel('Search')
   ```

2. **Test IDs (Recommended)**
   ```typescript
   page.getByTestId('search-button')
   page.locator('[data-testid="article-list"]')
   ```

3. **Stable Attributes**
   ```typescript
   page.locator('[data-value="views"]')
   page.locator('button[type="submit"]')
   ```

4. **CSS Classes (Last Resort)**
   ```typescript
   page.locator('.MuiListItemText-primary')
   page.locator('.MuiButtonBase-root.MuiIconButton-root')
   ```

### Locator Best Practices

#### Robust Selection
```typescript
// Good: Semantic and specific
this.knowledgeBaseLink = page.getByRole('link', { name: 'Knowledge Base' });

// Better: Combined with context
this.homeLink = this.breadcrumbNavigation.getByRole('link', { name: 'Home' });

// Best: Multiple fallback options
this.menuButton = page.locator('button[aria-label*="menu" i]')
  .or(page.getByRole('button', { name: 'menu' }))
  .or(page.locator('button').first());
```

#### Handle Multiple Elements
```typescript
// Problem: Strict mode violation
await expect(this.articlesList).toBeVisible(); // May match multiple elements

// Solution: Be specific
await expect(this.articlesList.first()).toBeVisible();
```

## Error Handling Architecture

### Timeout Strategy
```typescript
// Page-level timeouts
await this.page.waitForURL(/knowledgeBase/, { timeout: 15000 });

// Element-level timeouts  
await expect(this.articlesHeading).toBeVisible({ timeout: 30000 });

// Action-level timeouts (using defaults)
await this.menuButton.click(); // Uses global timeout
```

### Graceful Degradation
```typescript
async findArticleTitle(): Promise<string> {
  try {
    await expect(this.articlesList.first()).toBeVisible();
    const firstArticle = this.articlesList.first();
    const articleText = await firstArticle.textContent();
    return articleText ?? '';
}
```

## Test Organization Architecture

### Test Structure Hierarchy
```
Test Describe Block
├── beforeEach (Setup)
├── Test Case 1 (@smoke)
│   ├── Test Step 1
│   ├── Test Step 2  
│   └── Assertions
├── Test Case 2 (@regression)
│   └── Multiple Test Steps
└── afterEach (Cleanup - if needed)
```

### Test Step Pattern
```typescript
test('Test Name @tag', async ({ page }) => {
  await test.step('Descriptive step name', async () => {
    // Arrange
    const data = await preparePage.extractData();
    
    // Act  
    await interactionPage.performAction(data);
    
    // Assert
    await validationPage.verifyResult();
  });
});
```

## Configuration Architecture

### Environment Abstraction
```typescript
// playwright.config.ts structure
export default defineConfig({
  testDir: './tests',           // Test location
  fullyParallel: true,          // Performance optimization
  retries: process.env.CI ? 2 : 0,  // Environment-specific config
  workers: process.env.CI ? 1 : undefined,  // Resource management
  projects: [                   // Multi-browser support
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
```

### TypeScript Configuration Benefits
- **Type Safety**: Compile-time error detection
- **IntelliSense**: Better development experience
- **Refactoring Support**: Safe code changes
- **Interface Contracts**: Clear API definitions

## Data Architecture

### Static vs Dynamic Data

#### Static Data (Configuration)
```typescript
readonly sortingOptions = ['Alphabetical', 'Highest Rated', 'Most Popular', 'Newest First'] as const;
```

#### Dynamic Data (Runtime Extraction)
```typescript
async findArticleTitle(): Promise<string> {
  const firstArticle = this.articlesList.first();
  const articleText = await firstArticle.textContent();
  return articleText ?? '';
}
```

#### Type-Safe Enums
```typescript
type SortingOption = typeof KnowledgeBasePage.sortingOptions[number];
// Automatically creates: 'Alphabetical' | 'Highest Rated' | 'Most Popular' | 'Newest First'
```

## Scalability Considerations

### Horizontal Scaling (More Tests)
- **Consistent Patterns**: New tests follow established patterns
- **Reusable Components**: Page objects support multiple test scenarios
- **Modular Design**: Independent test files and page objects

### Vertical Scaling (More Complexity)
- **Layered Architecture**: Clear separation between layers
- **Plugin Architecture**: Playwright's plugin system for extensions
- **Configuration Management**: Environment-specific settings

### Performance Architecture
- **Parallel Execution**: Tests run concurrently when possible
- **Resource Optimization**: Shared browser contexts
- **Selective Execution**: Tag-based test filtering

## Future Architecture Enhancements

### Potential Improvements

1. **Data Layer Abstraction**
   ```typescript
   class TestDataProvider {
     static getSearchTerms(): string[]
     static getValidationRules(): ValidationRule[]
   }
   ```

2. **Report Integration**
   ```typescript
   class CustomReporter implements Reporter {
     // Enhanced reporting capabilities
   }
   ```

3. **API Integration**
   ```typescript
   class ApiHelper {
     // Backend API interactions for test data setup
   }
   ```

4. **Visual Testing Integration**
   ```typescript
   await expect(page).toHaveScreenshot('knowledge-base.png');
   ```

This architecture provides a solid foundation for maintainable, scalable test automation while following industry best practices and design patterns.

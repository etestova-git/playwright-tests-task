# API Reference

## Page Object Classes

### BasePage

Base class providing common functionality across all pages.

#### Properties
```typescript
readonly page: Page;
readonly menuButton: Locator;
readonly searchBox: Locator;
readonly searchButton: Locator;
```

#### Methods

##### `openBurgerMenu(): Promise<void>`
Opens the hamburger menu in the navigation bar.

**Usage:**
```typescript
await basePage.openBurgerMenu();
```

##### `performSearch(searchTerm: string): Promise<void>`
Performs a search using the global search box.

**Parameters:**
- `searchTerm` - The text to search for

**Usage:**
```typescript
await basePage.performSearch('Word');
```

##### `clearSearch(): Promise<void>`
Clears the search input and triggers a new search.

##### `verifySearchValue(expectedValue: string): Promise<void>`
Verifies the current value in the search box.

---

### HomePage extends BasePage

Handles interactions specific to the home page.

#### Properties
```typescript
readonly findSolutionHeading: Locator;
readonly latestUpdatesSection: Locator;
readonly popularArticlesSection: Locator;
readonly knowledgeBaseLink: Locator;
```

#### Methods

##### `goto(): Promise<void>`
Navigates to the home page.

##### `verifyPageLoaded(): Promise<void>`
Verifies that the home page has loaded successfully.

##### `navigateToKnowledgeBase(): Promise<void>`
Navigates from home page to Knowledge Base through the burger menu.

##### `verifyBurgerMenuOpened(): Promise<void>`
Verifies that the burger menu is open and navigation links are visible.

---

### KnowledgeBasePage extends BasePage

Manages Knowledge Base page interactions and validations.

#### Properties
```typescript
readonly pageHeading: Locator;
readonly articlesHeading: Locator;
readonly breadcrumbNavigation: Locator;
readonly homeLink: Locator;
readonly knowledgeBaseLink: Locator;
readonly allArticlesLink: Locator;
readonly categoriesTree: Locator;
readonly articlesList: Locator;
readonly sortingDropdown: Locator;
readonly sortingOptions: readonly ['Alphabetical', 'Highest Rated', 'Most Popular', 'Newest First'];
readonly firstArticleViews: Locator;
readonly secondArticleViews: Locator;
```

#### Methods

##### `goto(): Promise<void>`
Navigates directly to the Knowledge Base page.

##### `verifyPageLoaded(): Promise<void>`
Verifies that the Knowledge Base page has loaded successfully.

##### `verifyPageStructure(): Promise<void>`
Verifies the presence of key page elements (breadcrumbs, search, categories, articles).

##### `verifyBreadcrumbElements(): Promise<void>`
Verifies that all breadcrumb navigation elements are visible.

##### `verifyArticleCount(): Promise<void>`
Verifies that the number of articles is between 1 and 10.

##### `findArticleTitle(): Promise<string>`
Extracts and returns the title of the first article for use in search tests.

**Returns:** Promise resolving to the article title text

##### `navigateToHomePage(): Promise<void>`
Navigates back to the home page using the breadcrumb link.

##### `changeArticleSorting(order: SortingOption): Promise<void>`
Changes the article sorting order.

**Parameters:**
- `order` - One of: 'Alphabetical' | 'Highest Rated' | 'Most Popular' | 'Newest First'

##### `verifyArticleSorting(order: SortingOption): Promise<void>`
Verifies that articles are sorted according to the specified order.

**Parameters:**
- `order` - The sorting option to verify

**Current Implementation:** Only 'Most Popular' sorting verification is implemented.

---

### SearchResultsPage extends BasePage

Handles search results page interactions.

#### Methods

##### `verifyPageLoaded(): Promise<void>`
Verifies that the search results page has loaded.

##### `verifyArticleCount(expectedCount: number): Promise<void>`
Verifies the number of articles in search results.

##### `verifyNoResultsState(): Promise<void>`
Verifies the "no results found" state is displayed.

---

### ManagePage

Composition class that aggregates all page objects for centralized management.

#### Properties
```typescript
homePage: HomePage;
knowledgeBasePage: KnowledgeBasePage;
searchResultsPage: SearchResultsPage;
basePage: BasePage;
```

#### Constructor
```typescript
constructor(page: Page)
```

Creates instances of all page objects with the provided Playwright page.

**Usage:**
```typescript
const mp = new ManagePage(page);
await mp.homePage.goto();
await mp.knowledgeBasePage.verifyPageLoaded();
```

## Type Definitions

### SortingOption
```typescript
type SortingOption = typeof KnowledgeBasePage.sortingOptions[number];
// Resolves to: 'Alphabetical' | 'Highest Rated' | 'Most Popular' | 'Newest First'
```

## Utility Functions

### isSorted (utils/isSorted.ts)

Helper functions for validating sorting order.

## Test Annotations

### Test Tags
- `@smoke` - Critical functionality tests
- `@regression` - Comprehensive feature tests

### Usage in Tests
```typescript
test('Navigation to Knowledge Base via burger menu @smoke', async ({ page }) => {
  // Test implementation
});

test('Article sorting functionality @regression', async ({ page }) => {
  // Test implementation
});
```

## Configuration Types

### Playwright Config
Standard Playwright configuration with custom browser setup:

```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } }
]
```

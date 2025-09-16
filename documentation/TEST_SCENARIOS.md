# Test Scenarios Documentation

## Overview

This document describes all test scenarios implemented in the Playwright test suite for the Knowledge Base functionality.

## Test Structure

Tests are organized using the following structure:
- **Test Describe Block**: Groups related tests
- **Test Steps**: Individual actions within a test
- **Tags**: Categorize tests by importance (@smoke, @regression)

## Test Scenarios

### 1. Navigation to Knowledge Base via burger menu (@smoke)

**File**: `knowledge-base.spec.ts`  
**Tag**: `@smoke`  
**Purpose**: Verifies the basic navigation flow from home page to Knowledge Base

#### Test Steps:
1. **Open home page**
   - Navigate to the Self Service Portal
   - Verify page loads successfully

2. **Open burger menu**
   - Click the hamburger menu button
   - Verify menu opens and Knowledge Base link is visible

3. **Navigate to Knowledge Base**
   - Click Knowledge Base link from menu
   - Verify navigation to Knowledge Base page

4. **Verify Knowledge Base page structure**
   - Check page elements are present (breadcrumbs, search, categories, articles)
   - Verify article count is between 1 and 10

#### Expected Results:
- Home page loads without errors
- Burger menu opens successfully
- Knowledge Base page loads with all required elements
- Articles are present and countable

---

### 2. Successful search in Knowledge Base (@smoke)

**File**: `knowledge-base.spec.ts`  
**Tag**: `@smoke`  
**Purpose**: Tests the search functionality with existing content

#### Test Steps:
1. **Navigate to Knowledge Base** (via beforeEach)

2. **Extract article title**
   - Find first available article
   - Extract searchable term from article title

3. **Perform search**
   - Enter extracted term into search box
   - Execute search

4. **Verify search results**
   - Confirm search results page loads
   - Verify at least 1 result is found

#### Expected Results:
- Article title is successfully extracted
- Search executes without errors  
- Search results page displays
- At least one relevant result is shown

---

### 3. Unsuccessful search in Knowledge Base (@regression)

**File**: `knowledge-base.spec.ts`  
**Tag**: `@regression`  
**Purpose**: Tests handling of searches with no results

#### Test Steps:
1. **Navigate to Knowledge Base** (via beforeEach)

2. **Perform unsuccessful search**
   - Search for non-existent term: "NonExistentTerm12345"
   - Execute search

3. **Verify no results state**
   - Confirm "no results found" message appears
   - Verify appropriate empty state is displayed

#### Expected Results:
- Search executes without errors
- "No results found" message is displayed
- Page handles empty state gracefully

---

### 4. Sort articles by Most Popular (@regression)

**File**: `knowledge-base.spec.ts`  
**Tag**: `@regression`  
**Purpose**: Tests article sorting functionality

#### Test Steps:
1. **Navigate to Knowledge Base** (via beforeEach)

2. **Change sorting to Most Popular**
   - Click sorting dropdown
   - Select "Most Popular" option

3. **Verify sorting order**
   - Extract view counts from first two articles
   - Verify first article has higher/equal views than second

#### Expected Results:
- Sorting dropdown works correctly
- Articles are reordered by popularity
- View counts are in descending order

---

### 5. Breadcrumb navigation (@regression)

**File**: `knowledge-base.spec.ts`  
**Tag**: `@regression`  
**Purpose**: Tests breadcrumb navigation functionality

#### Test Steps:
1. **Navigate to Knowledge Base** (via beforeEach)

2. **Verify breadcrumb elements**
   - Check Home link is visible
   - Check Knowledge Base link is visible  
   - Check All Articles link is visible

3. **Test breadcrumb navigation functionality**
   - Click Home breadcrumb link
   - Verify navigation back to home page

#### Expected Results:
- All breadcrumb elements are visible
- Home navigation works correctly
- Page loads successfully after navigation

---

## Test Data

### Dynamic Test Data
- **Article titles**: Extracted dynamically from the Knowledge Base
- **Search terms**: Generated from actual article content
- **View counts**: Read from live article data

### Static Test Data
- **Invalid search terms**: "NonExistentTerm12345", "###NoResultsExpected###"
- **Sorting options**: ['Alphabetical', 'Highest Rated', 'Most Popular', 'Newest First']
- **URLs**: Base application URL and Knowledge Base specific URLs

## Test Setup (beforeEach)

Each test starts with a common setup:

1. **Initialize page objects**
   - Create ManagePage instance
   - Set up all required page object references

2. **Navigate to starting point**
   - Go to home page
   - Verify page loads
   - Open burger menu
   - Navigate to Knowledge Base
   - Verify Knowledge Base page loads

This ensures all tests start from a consistent state.

## Assertions and Verifications

### Page Load Verifications
- URL matching with regex patterns
- Page title validation
- Key element visibility checks
- Timeout configurations for reliable waits

### Content Verifications  
- Article count validation (between 1-10)
- Search result count checks
- Text content matching
- Sorting order validation

### Navigation Verifications
- Breadcrumb element presence
- Menu functionality
- Page transitions
- URL changes after navigation

## Error Handling

### Timeout Management
- Page loads: 15-30 second timeouts
- Element visibility: 5-10 second timeouts
- Network requests: Default Playwright timeouts

### Strict Mode Handling
- Use `.first()` for multi-element locators
- Specific element targeting to avoid ambiguity
- Proper wait conditions before interactions

### Flaky Test Prevention
- Force clicks for overlay issues
- Proper wait strategies
- Element state validation before actions
- Retry mechanisms through Playwright configuration

## Performance Considerations

### Test Execution
- Parallel execution enabled for faster runs
- Browser reuse between tests
- Efficient element selection strategies

### Resource Management
- Proper cleanup after tests
- Memory efficient page object design
- Minimal unnecessary waits

## Future Test Scenarios

### Potential Additions
1. **Advanced Search Features**
   - Filter by categories
   - Date range filtering
   - Advanced search operators

2. **Article Content Testing**
   - Article detail page navigation
   - Content validation
   - Related articles functionality

3. **Accessibility Testing**
   - Keyboard navigation
   - Screen reader compatibility
   - ARIA attribute validation

4. **Performance Testing**
   - Page load times
   - Search response times
   - Large dataset handling

5. **Cross-Browser Compatibility**
   - Extended browser matrix
   - Mobile browser testing
   - Different viewport sizes

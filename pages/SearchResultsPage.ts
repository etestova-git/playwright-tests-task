import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
  readonly searchResultsHeading: Locator;
  readonly noResultsMessage: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResultsHeading = page.getByRole('heading', { name: 'Search Results', level: 4 });
    this.noResultsMessage = page.getByText('There are no items to display.');
  }

  async verifyPageLoaded() {
    await this.page.waitForURL(/searchResults/, { timeout: 15000 });
    await expect(this.page).toHaveTitle('Search Results');
    await expect(this.searchResultsHeading).toBeVisible();
  }

  async verifyNoResultsState() {
    await expect(this.page).toHaveURL(/searchResults/);
    await expect(this.noResultsMessage).toBeVisible();
  }

  async verifyArticleCount(expectedCount: number) {
    await expect(this.page.getByRole('listitem')).toHaveCount(expectedCount);
  }

}

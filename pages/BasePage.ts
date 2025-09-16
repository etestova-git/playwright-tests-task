import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

   // this.menuButton = page.locator('button[aria-label*="menu" i]').or(page.getByRole('button', { name: 'menu' })).or(page.locator('button').first());
    this.searchBox = page.getByRole('textbox', { name: 'Search for solutions and tickets' });
    this.searchButton = page.locator('button[tabindex="0"][type="button"]').nth(1);
    this.menuButton = page.getByLabel('menu');
  }

  async openBurgerMenu() {
    await this.menuButton.click();

  }
  async clickToKnowledgeBaseLink() {
    await this.page.getByRole('link', { name: 'Knowledge Base' }).click();

  }

  async performSearch(searchTerm: string) {
    await this.searchBox.fill(searchTerm);
    await this.searchButton.click();
  }

  async clearSearch() {
    await this.searchBox.clear();
    await this.searchButton.click();
  }

  async verifySearchValue(expectedValue: string) {
    await expect(this.searchBox).toHaveValue(expectedValue);
  }

}

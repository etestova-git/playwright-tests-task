import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly signInLink: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'menu' });
    this.searchBox = page.getByRole('textbox', { name: 'Search for solutions and tickets' });
    this.searchButton = page.getByRole('banner').getByRole('button').nth(1);
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.homeLink = page.getByRole('link', { name: 'Self Service Portal' });
  }

  async openBurgerMenu() {
    await this.menuButton.click();
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

  async navigateHome() {
    await this.homeLink.click();
  }
}

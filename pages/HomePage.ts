import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly findSolutionHeading: Locator;
  readonly knowledgeBaseLink: Locator;

  constructor(page: Page) {
    super(page);
    this.findSolutionHeading = page.getByRole('heading', { name: 'Find a Solution' });
    this.knowledgeBaseLink = page.getByRole('link', { name: 'Knowledge Base' });
  }

  async goto() {
    await this.page.goto('https://showcase-x.alloyservice.com/hd/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle(/Self Service Portal/);
    await expect(this.findSolutionHeading).toBeVisible();
  }

  async navigateToKnowledgeBase() {
    await this.openBurgerMenu();
    await expect(this.knowledgeBaseLink).toBeVisible();
  }

  async verifyBurgerMenuOpened() {
    await expect(this.knowledgeBaseLink).toBeVisible();
  }
}

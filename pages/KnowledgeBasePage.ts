import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class KnowledgeBasePage extends BasePage {
  readonly pageHeading: Locator;
  readonly articlesHeading: Locator;
  readonly breadcrumbNavigation: Locator;
  readonly homeLink: Locator;
  readonly knowledgeBaseLink: Locator;
  readonly allArticlesLink: Locator;
  readonly categoriesTree: Locator;
  readonly articlesList: Locator;
  readonly pageInfo: Locator;
  readonly visibleCountInfo: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Knowledge Base', level: 4 });
    this.articlesHeading = page.getByRole('heading', { name: 'All Articles', level: 5 });
    this.breadcrumbNavigation = page.getByRole('navigation', { name: 'breadcrumb' });
    this.homeLink = this.breadcrumbNavigation.getByRole('link', { name: 'Home' });
    this.knowledgeBaseLink = this.breadcrumbNavigation.getByRole('link', { name: 'Knowledge Base' });
    this.allArticlesLink = this.breadcrumbNavigation.getByRole('link', { name: 'All Articles' });
    this.categoriesTree = page.getByRole('tree');
    //this.articlesList = page.getByRole('list').filter({ has: page.getByText(/KB\d{6}/) }); // переписать
    this.articlesList = page.locator('.MuiListItemText-primary');
    this.pageInfo = page.getByText('Page:');
    this.visibleCountInfo = page.getByText('Visible:');
  }

  async verifyPageLoaded() {
    await this.page.waitForURL(/knowledgeBase/, { timeout: 15000 });
    await expect(this.articlesHeading).toBeVisible({ timeout: 30000 });
    await expect(this.pageHeading).toBeVisible();
  }

  async verifyPageStructure() {
    await expect(this.breadcrumbNavigation).toBeVisible();
    await expect(this.searchBox).toBeVisible();
    await expect(this.categoriesTree).toBeVisible();
    await expect(this.articlesList).toBeVisible();
  }

  async verifyBreadcrumbElements() {
    await expect(this.homeLink).toBeVisible();
    await expect(this.knowledgeBaseLink).toBeVisible();
    await expect(this.allArticlesLink).toBeVisible();
  }

  async verifyArticleCount(expectedCount: number) {
    await expect(this.articlesList).toHaveCount(expectedCount);
  }

  async navigateToHomePage() {
    await this.homeLink.click();
  }
}

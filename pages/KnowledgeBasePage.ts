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
  readonly sortingDropdown: Locator;
  readonly sortingOptions = ['Alphabetical', 'Highest Rated', 'Most Popular', 'Newest First'] as const;
  readonly firstArticleViews: Locator;
  readonly secondArticleViews: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Knowledge Base', level: 4 });
    this.articlesHeading = page.getByRole('heading', { name: 'All Articles', level: 5 });
    this.breadcrumbNavigation = page.getByRole('navigation', { name: 'breadcrumb' });
    this.homeLink = this.breadcrumbNavigation.getByRole('link', { name: 'Home' });
    this.knowledgeBaseLink = this.breadcrumbNavigation.getByRole('link', { name: 'Knowledge Base' });
    this.allArticlesLink = this.breadcrumbNavigation.getByRole('link', { name: 'All Articles' });
    this.categoriesTree = page.getByRole('tree');
    this.articlesList = page.locator('.MuiListItemText-primary');
    this.sortingDropdown = page.getByRole('combobox').nth(0);
    this.firstArticleViews = page.locator('.MuiTypography-inherit').nth(0);
    this.secondArticleViews = page.locator('.MuiTypography-inherit').nth(2);
  }

  async goto() {
    await this.page.goto('https://showcase-x.alloyservice.com/hd/knowledgeBase');
    await this.page.waitForLoadState('domcontentloaded');
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
    await expect(this.articlesList.first()).toBeVisible(); // at least one article should be visible
  }

  async verifyBreadcrumbElements() {
    await expect(this.homeLink).toBeVisible();
    await expect(this.knowledgeBaseLink).toBeVisible();
    await expect(this.allArticlesLink).toBeVisible();
  }

  async verifyArticleCount() {
    const articleCount = await this.articlesList.count();
    expect(articleCount).toBeGreaterThanOrEqual(1);
    expect(articleCount).toBeLessThanOrEqual(10);
  }

  async findArticleTitle(): Promise<string> {
    // Wait for articles to load
    await expect(this.articlesList.first()).toBeVisible();

    // Get the text content of the first article
    const firstArticle = this.articlesList.first();
    const articleText = await firstArticle.textContent();
    return articleText ?? '';
  }

  async navigateToHomePage() {
    await this.homeLink.click();
  }

  async changeArticleSorting(order: typeof this.sortingOptions[number]) {
    await this.sortingDropdown.click();
    await this.page.getByRole('option', { name: order }).click();
  }

  async verifyArticleSorting(order: typeof this.sortingOptions[number]) {
    if (order === 'Most Popular') {
      expect(this.firstArticleViews).toBeVisible();
      const firstArticleViews = await this.firstArticleViews.textContent();
      const firstNumber = firstArticleViews?.match(/\d+/)?.[0];
      expect(this.secondArticleViews).toBeVisible();
      const secondArticleViews = await this.secondArticleViews.textContent();
      const secondNumber = secondArticleViews?.match(/\d+/)?.[0];
      expect(parseInt(firstNumber || '0')).toBeGreaterThanOrEqual(parseInt(secondNumber || '0'));
    } else {
      // Implement other sorting verifications as needed
      throw new Error(`Sorting verification for ${order} is not implemented.`);
    }
  }
}

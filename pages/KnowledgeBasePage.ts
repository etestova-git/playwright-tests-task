import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class KnowledgeBasePage extends BasePage {
  readonly pageHeading: Locator;
  readonly breadcrumbNavigation: Locator;
  readonly homeLink: Locator;
  readonly knowledgeBaseLink: Locator;
  readonly allArticlesLink: Locator;
  readonly categoriesTree: Locator;
  readonly allArticlesTreeItem: Locator;
  readonly articleTypeTreeItem: Locator;
  readonly manufacturerTreeItem: Locator;
  readonly softwareTreeItem: Locator;
  readonly articlesHeading: Locator;
  readonly sortByHeading: Locator;
  readonly sortDropdown: Locator;
  readonly articlesList: Locator;
  readonly article1Link: Locator;
  readonly article2Link: Locator;
  readonly paginationSection: Locator;
  readonly pageInfo: Locator;
  readonly visibleCountInfo: Locator;
  readonly rowsPerPageDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Knowledge Base', level: 4 });
    this.breadcrumbNavigation = page.getByRole('navigation', { name: 'breadcrumb' });
    this.homeLink = this.breadcrumbNavigation.getByRole('link', { name: 'Home' });
    this.knowledgeBaseLink = this.breadcrumbNavigation.getByRole('link', { name: 'Knowledge Base' });
    this.allArticlesLink = this.breadcrumbNavigation.getByRole('link', { name: 'All Articles' });
    this.categoriesTree = page.getByRole('tree');
    this.allArticlesTreeItem = page.getByRole('treeitem', { name: 'All Articles' });
    this.articleTypeTreeItem = page.getByRole('treeitem', { name: 'Article Type' });
    this.manufacturerTreeItem = page.getByRole('treeitem', { name: 'Manufacturer' });
    this.softwareTreeItem = page.getByRole('treeitem', { name: 'Software' });
    this.articlesHeading = page.getByRole('heading', { name: 'All Articles', level: 5 });
    this.sortByHeading = page.getByRole('heading', { name: 'Sort by:', level: 6 });
    this.sortDropdown = page.getByRole('combobox').first();
    this.articlesList = page.getByRole('list').filter({ has: page.getByText(/KB\d{6}/) });
    this.article1Link = page.getByRole('link', { name: /KB000001.*How do I get Word to stop helping me type?/ });
    this.article2Link = page.getByRole('link', { name: /KB000002.*How do I tell the Office Assistant to go away?/ });
    this.paginationSection = page.locator('div').filter({ has: page.getByText('Page:') });
    this.pageInfo = page.getByText('Page:');
    this.visibleCountInfo = page.getByText('Visible:');
    this.rowsPerPageDropdown = page.getByRole('combobox').filter({ has: page.getByText('10') });
  }

  async goto() {
    await this.page.goto('https://showcase-x.alloyservice.com/hd/knowledgeBase/f3adc740-8a18-43cd-8789-681a1ca79c21');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/knowledgeBase/);
    await expect(this.page).toHaveTitle('Knowledge Base');
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

  async verifyArticlesPresent() {
    await expect(this.articlesList.filter({ has: this.page.getByText('KB000001') })).toBeVisible();
    await expect(this.articlesList.filter({ has: this.page.getByText('KB000002') })).toBeVisible();
  }

  async verifyArticleContent(articleNumber: string, title: string) {
    await expect(this.page.getByText(articleNumber)).toBeVisible();
    await expect(this.page.getByText(title)).toBeVisible();
  }

  async verifySearchResults(searchTerm: string) {
    // Verify that search results contain the expected term
    await expect(this.page.getByText(new RegExp(searchTerm, 'i'))).toBeVisible();
  }

  async verifyNoSpecificResults(searchTerm: string) {
    // Verify that the search term only appears in the search box (count = 1)
    await expect(this.page.getByText(searchTerm)).toHaveCount(1);
    
    // Verify that default articles are still shown
    await this.verifyArticleContent('KB000001', 'How do I get Word to stop helping me type?');
    await this.verifyArticleContent('KB000002', 'How do I tell the Office Assistant to go away?');
  }

  async verifyPagination() {
    await expect(this.pageInfo).toBeVisible();
    await expect(this.page.getByText('1')).toBeVisible();
    await expect(this.page.getByText('of')).toBeVisible();
    await expect(this.page.getByText('Rows per page')).toBeVisible();
    await expect(this.visibleCountInfo).toBeVisible();
    await expect(this.page.getByText('2')).toBeVisible();
  }

  async verifyArticleCount(expectedCount: number) {
    await expect(this.page.getByRole('listitem').filter({ has: this.page.getByText(/KB\d{6}/) })).toHaveCount(expectedCount);
  }

  async navigateToHomePage() {
    await this.homeLink.click();
  }
}

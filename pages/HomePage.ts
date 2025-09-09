import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly findSolutionHeading: Locator;
  readonly latestUpdatesSection: Locator;
  readonly popularArticlesSection: Locator;
  readonly myTicketsSection: Locator;
  readonly approvalsSection: Locator;
  readonly submitTicketSection: Locator;
  readonly askQuestionSection: Locator;
  readonly announcementsSection: Locator;
  readonly knowledgeBaseLink: Locator;
  readonly viewAllPopularArticlesLink: Locator;

  constructor(page: Page) {
    super(page);
    this.findSolutionHeading = page.getByRole('heading', { name: 'Find a Solution' });
    this.latestUpdatesSection = page.getByRole('button', { name: 'Latest Updates' });
    this.popularArticlesSection = page.getByRole('button', { name: 'Popular Articles' });
    this.myTicketsSection = page.getByRole('button', { name: 'My Tickets' });
    this.approvalsSection = page.getByRole('button', { name: 'Approvals' });
    this.submitTicketSection = page.getByRole('heading', { name: 'Submit a Ticket' });
    this.askQuestionSection = page.getByRole('heading', { name: 'Ask a Question' });
    this.announcementsSection = page.getByRole('button', { name: 'Announcements' });
    this.knowledgeBaseLink = page.getByRole('link', { name: 'Knowledge Base' });
    this.viewAllPopularArticlesLink = page.getByRole('link', { name: 'View all' }).first();
  }

  async goto() {
    await this.page.goto('https://showcase-x.alloyservice.com/hd/');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle(/Self Service Portal/);
    await expect(this.findSolutionHeading).toBeVisible();
  }

  async navigateToKnowledgeBase() {
    await this.openBurgerMenu();
    await expect(this.knowledgeBaseLink).toBeVisible();
    await this.knowledgeBaseLink.click();
  }

  async verifyMainPageElements() {
    await expect(this.findSolutionHeading).toBeVisible();
    await expect(this.latestUpdatesSection).toBeVisible();
    await expect(this.popularArticlesSection).toBeVisible();
    await expect(this.myTicketsSection).toBeVisible();
    await expect(this.approvalsSection).toBeVisible();
    await expect(this.submitTicketSection).toBeVisible();
    await expect(this.askQuestionSection).toBeVisible();
    await expect(this.announcementsSection).toBeVisible();
  }

  async verifyBurgerMenuOpened() {
    await expect(this.knowledgeBaseLink).toBeVisible();
  }
}

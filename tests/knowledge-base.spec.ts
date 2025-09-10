import { test, expect } from '@playwright/test';
import { HomePage, KnowledgeBasePage, BasePage, SearchResultsPage } from '../pages';

test.describe('Knowledge Base Tests', () => {
  let homePage: HomePage;
  let knowledgeBasePage: KnowledgeBasePage;
  let basePage: BasePage;
  let searchResultsPage: SearchResultsPage;


  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    homePage = new HomePage(page);
    knowledgeBasePage = new KnowledgeBasePage(page);
    searchResultsPage = new SearchResultsPage(page);

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.verifyPageLoaded();
    });

    await test.step('Open burger menu', async () => {
      await homePage.openBurgerMenu();
      await homePage.verifyBurgerMenuOpened();
    });

    await test.step('Navigate to Knowledge Base', async () => {
      await homePage.navigateToKnowledgeBase();
      await knowledgeBasePage.verifyPageLoaded();
    });

  });

  test('Navigation to Knowledge Base via burger menu @smoke', async ({ page }) => {

    await test.step('Verify Knowledge Base page structure', async () => {
      await knowledgeBasePage.verifyPageStructure();
      await knowledgeBasePage.verifyArticleCount(); // not less than 1, not more than 10
    });
  });

  test('Successful search in Knowledge Base @smoke', async ({ page }) => {

    const articleTitle = await knowledgeBasePage.findArticleTitle();
    await basePage.performSearch(articleTitle);

    await searchResultsPage.verifyPageLoaded();
    await searchResultsPage.verifyArticleCount(1);
  });

  test('Unsuccessful search in Knowledge Base @regression', async ({ page }) => {

    await test.step('Perform unsuccessful search', async () => {
      await basePage.performSearch('NonExistentTerm12345');
      await searchResultsPage.verifyNoResultsState();
    });
  });

  test('Knowledge Base navigation breadcrumbs @regression', async ({ page }) => {

    await test.step('Verify breadcrumb navigation', async () => {
      await knowledgeBasePage.verifyBreadcrumbElements();
    });

    await test.step('Test breadcrumb navigation functionality', async () => {
      await knowledgeBasePage.navigateToHomePage();
      await homePage.verifyPageLoaded();
    });
  });
});

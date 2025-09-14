import { test, expect } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

test.describe('Knowledge Base Tests', () => {
  let mp: ManagePage;


  test.beforeEach(async ({ page }) => {
    mp = new ManagePage(page);

    await test.step('Open home page', async () => {
      await mp.homePage.goto();
      await mp.homePage.verifyPageLoaded();
    });

    await test.step('Open burger menu', async () => {
      await mp.homePage.openBurgerMenu();
      await mp.homePage.verifyBurgerMenuOpened();
    });

    await test.step('Navigate to Knowledge Base', async () => {
      await mp.homePage.navigateToKnowledgeBase();
      await mp.knowledgeBasePage.verifyPageLoaded();
    });

  });

  test('Navigation to Knowledge Base via burger menu', {
    tag: '@regression',
  }, async ({ page }) => {

    await test.step('Verify Knowledge Base page structure', async () => {
      await mp.knowledgeBasePage.verifyPageStructure();
      await mp.knowledgeBasePage.verifyArticleCount(); // not less than 1, not more than 10
    });
  });

  test('Successful search in Knowledge Base', {
    tag: '@smoke',
  }, async ({ page }) => {

    const articleTitle = await mp.knowledgeBasePage.findArticleTitle();
    await mp.knowledgeBasePage.performSearch(articleTitle);

    await mp.searchResultsPage.verifyPageLoaded();
    await mp.searchResultsPage.verifyArticleCount(1);
  });

  test('Unsuccessful search in Knowledge Base', {
    tag: '@smoke',
  }, async ({ page }) => {

    await test.step('Perform unsuccessful search', async () => {
      await mp.knowledgeBasePage.performSearch('NonExistentTerm12345');
      await mp.searchResultsPage.verifyNoResultsState();
    });
  });

  test('Knowledge Base navigation breadcrumbs', {
    tag: '@tegression',
  }, async ({ page }) => {

    await test.step('Verify breadcrumb navigation', async () => {
      await mp.knowledgeBasePage.verifyBreadcrumbElements();
    });

    await test.step('Test breadcrumb navigation functionality', async () => {
      await mp.knowledgeBasePage.navigateToHomePage();
      await mp.homePage.verifyPageLoaded();
    });
  });
});

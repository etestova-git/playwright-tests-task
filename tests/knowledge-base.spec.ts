import { test, expect } from '@playwright/test';
import { HomePage, KnowledgeBasePage, BasePage, SearchResultsPage } from '../pages';

test.describe('Knowledge Base Tests', () => {
  let homePage: HomePage;
  let knowledgeBasePage: KnowledgeBasePage;
  let basePage: BasePage;
  let searchResultsPage: SearchResultsPage;


  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    knowledgeBasePage = new KnowledgeBasePage(page);
    basePage = new BasePage(page);
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
      await knowledgeBasePage.verifyArticleCount(2); // сделать не меньше 1 не больше 10
    });
  });

  test('Successful search in Knowledge Base @smoke', async ({ page }) => {

    await basePage.performSearch('Word'); // сначала найти название статьи, а потом поискать ее

    await searchResultsPage.verifyPageLoaded();
    await searchResultsPage.verifyArticleCount(1);
  });

  test('Unsuccessful search in Knowledge Base @regression', async ({ page }) => {

    await test.step('Perform unsuccessful search', async () => {
      await basePage.performSearch('NonExistentTerm12345');
      await searchResultsPage.verifyNoResultsState();
    });
  });

  test('Search with no results - empty state verification @regression', async ({ page }) => {

    await test.step('Input text and varify that articles still present', async () => {
      await basePage.performSearch('###NoResultsExpected###');
      await searchResultsPage.verifyPageLoaded;
      await searchResultsPage.verifyArticleCount(2);
    });

    await test.step('Verify clear search state', async () => {
      await basePage.clearSearch();

      await basePage.verifySearchValue('');
      await searchResultsPage.verifyArticleCount(2);
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

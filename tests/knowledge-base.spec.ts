import { test, expect } from '@playwright/test';
import { HomePage, KnowledgeBasePage } from '../pages';

test.describe('Knowledge Base Tests', () => {
  let homePage: HomePage;
  let knowledgeBasePage: KnowledgeBasePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    knowledgeBasePage = new KnowledgeBasePage(page);
    
    await homePage.goto();
    await homePage.verifyPageLoaded();
  });

  test('Navigation to Knowledge Base via burger menu @smoke', async ({ page }) => {
    await test.step('Open burger menu', async () => {
      await homePage.openBurgerMenu();
      await homePage.verifyBurgerMenuOpened();
    });

    await test.step('Navigate to Knowledge Base', async () => {
      await homePage.navigateToKnowledgeBase();
      await knowledgeBasePage.verifyPageLoaded();
    });

    await test.step('Verify Knowledge Base page structure', async () => {
      await knowledgeBasePage.verifyPageStructure();
      await knowledgeBasePage.verifyArticlesPresent();
    });
  });

  test('Successful search in Knowledge Base @smoke', async ({ page }) => {
    await test.step('Navigate to Knowledge Base', async () => {
      await homePage.navigateToKnowledgeBase();
      await knowledgeBasePage.verifyPageLoaded();
    });

    await test.step('Perform successful search', async () => {
      await knowledgeBasePage.performSearch('Word');
      await knowledgeBasePage.verifySearchValue('Word');
    });

    await test.step('Verify search results', async () => {
      await knowledgeBasePage.verifyArticleContent('KB000001', 'How do I get Word to stop helping me type?');
      await knowledgeBasePage.verifySearchResults('Word');

      await expect(page.getByText('Visible:')).toBeVisible();
    });
  });

  test('Unsuccessful search in Knowledge Base @regression', async ({ page }) => {
    await test.step('Navigate to Knowledge Base', async () => {
      await homePage.navigateToKnowledgeBase();
      await knowledgeBasePage.verifyPageLoaded();
    });

    await test.step('Perform unsuccessful search', async () => {
      await knowledgeBasePage.performSearch('NonExistentTerm12345');
      await knowledgeBasePage.verifySearchValue('NonExistentTerm12345');
    });

    await test.step('Verify no results found', async () => {
      await knowledgeBasePage.verifyNoSpecificResults('NonExistentTerm12345');
    });
  });

  test('Search with no results - empty state verification @regression', async ({ page }) => {
    await test.step('Navigate to Knowledge Base', async () => {
      await homePage.navigateToKnowledgeBase();
      await knowledgeBasePage.verifyPageLoaded();
    });

    await test.step('Perform search with special characters that should return no results', async () => {
      await knowledgeBasePage.performSearch('###NoResultsExpected###');
      await knowledgeBasePage.verifySearchValue('###NoResultsExpected###');
    });

    await test.step('Verify search behavior when no relevant results found', async () => {
      await knowledgeBasePage.verifyNoSpecificResults('###NoResultsExpected###');
      await expect(page.getByText('Visible:')).toBeVisible();
      await expect(page.getByText('2')).toBeVisible();
    });

    await test.step('Verify search state persistence', async () => {
      await knowledgeBasePage.verifySearchValue('###NoResultsExpected###');
      await knowledgeBasePage.clearSearch();

      await knowledgeBasePage.verifySearchValue('');
      await knowledgeBasePage.verifyArticleContent('KB000001', 'How do I get Word to stop helping me type?');
      await knowledgeBasePage.verifyArticleContent('KB000002', 'How do I tell the Office Assistant to go away?');
    });
  });

  test('Knowledge Base article structure @regression', async ({ page }) => {
    await test.step('Navigate to Knowledge Base', async () => {
      await homePage.navigateToKnowledgeBase();
      await knowledgeBasePage.verifyPageLoaded();
    });

    await test.step('Verify article count and pagination', async () => {
      await knowledgeBasePage.verifyArticleCount(2);

      await knowledgeBasePage.verifyPagination();
    });
  });

  test('Knowledge Base navigation breadcrumbs @regression', async ({ page }) => {
    await test.step('Navigate to Knowledge Base', async () => {
      await homePage.navigateToKnowledgeBase();
      await knowledgeBasePage.verifyPageLoaded();
    });

    await test.step('Verify breadcrumb navigation', async () => {
      await knowledgeBasePage.verifyBreadcrumbElements();
    });

    await test.step('Test breadcrumb navigation functionality', async () => {
      await knowledgeBasePage.navigateToHomePage();
      await homePage.verifyPageLoaded();
    });
  });
});

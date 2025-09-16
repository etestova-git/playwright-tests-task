import { knowledgeBaseTest as test, expect } from '../fixtures';

test.describe('Knowledge Base Tests', () => {

  test('Navigation to Knowledge Base via burger menu', {
    tag: '@regression',
  }, async ({ knowledgeBaseViaNavigation: mp }) => {

    await test.step('Verify Knowledge Base page structure', async () => {
      await mp.knowledgeBasePage.verifyPageStructure();
      await mp.knowledgeBasePage.verifyArticleCount(); // not less than 1, not more than 10
    });
  });

  test('Knowledge Base navigation breadcrumbs', {
    tag: '@tegression',
  }, async ({ knowledgeBaseViaNavigation: mp }) => {

    await test.step('Verify breadcrumb navigation', async () => {
      await mp.knowledgeBasePage.verifyBreadcrumbElements();
    });

    await test.step('Test breadcrumb navigation functionality', async () => {
      await mp.knowledgeBasePage.navigateToHomePage();
      await mp.homePage.verifyPageLoaded();
    });
  });
});

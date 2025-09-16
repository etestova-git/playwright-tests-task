import { test as base, Page } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

type KnowledgeBaseFixtures = {
  managePage: ManagePage;
  knowledgeBaseViaNavigation: ManagePage;
  knowledgeBaseDirect: ManagePage;
};

export const test = base.extend<KnowledgeBaseFixtures>({
  managePage: async ({ page }, use) => {
    const mp = new ManagePage(page);
    await use(mp);
  },

  knowledgeBaseViaNavigation: async ({ page }, use) => {
    const mp = new ManagePage(page);

    await test.step('Navigate to Knowledge Base via home page', async () => {
      await mp.homePage.goto();
      await mp.homePage.verifyPageLoaded();
      await mp.homePage.openBurgerMenu();
      await mp.homePage.verifyBurgerMenuOpened();
      await mp.homePage.navigateToKnowledgeBase();
      await mp.knowledgeBasePage.verifyPageLoaded();
    });

    await use(mp);
  },

  knowledgeBaseDirect: async ({ page }, use) => {
    const mp = new ManagePage(page);

    await test.step('Navigate directly to Knowledge Base', async () => {
      await mp.knowledgeBasePage.goto();
      await mp.knowledgeBasePage.verifyPageLoaded();
    });

    await use(mp);
  },
});

export { expect } from '@playwright/test';

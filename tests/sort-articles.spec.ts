import { test, expect } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

test.describe('Knowledge Base Structure', async () => {
    let mp: ManagePage;

    test.beforeEach(async ({ page }) => {
        mp = new ManagePage(page);
    });

    test('Sort articles by Most Popular', async ({page}) => {
        await test.step('Open knowledge base page', async () => {
            await mp.knowledgeBasePage.goto();
            await mp.knowledgeBasePage.verifyPageLoaded();
        });

        await test.step('Change article sorting', async () => {
            const orderMethod = 'Most Popular';
            await mp.knowledgeBasePage.changeArticleSorting(orderMethod);
            await mp.knowledgeBasePage.verifyArticleSorting(orderMethod);
        });
    });
});
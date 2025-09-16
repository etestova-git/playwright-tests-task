import { knowledgeBaseTest as test, expect } from '../fixtures';

test.describe('Knowledge Base Structure', async () => {

    test('Successful search in Knowledge Base', {
        tag: '@smoke',
    }, async ({ knowledgeBaseDirect: mp }) => {
        await test.step('Perform successful search', async () => {
            const articleTitle = await mp.knowledgeBasePage.findArticleTitle();
            await mp.knowledgeBasePage.performSearch(articleTitle);
        });
        await test.step('Verify search results', async () => {
            await mp.searchResultsPage.verifyPageLoaded();
            await mp.searchResultsPage.verifyArticleCount(1);
        });
    });

    test('Unsuccessful search in Knowledge Base', {
        tag: '@smoke',
    }, async ({ knowledgeBaseDirect: mp }) => {

        await test.step('Perform unsuccessful search', async () => {
            await mp.knowledgeBasePage.performSearch('NonExistentTerm12345');
            await mp.searchResultsPage.verifyNoResultsState();
        });
    });

    test('Sort articles by Most Popular', {
        tag: '@regression',
    }, async ({ knowledgeBaseDirect: mp }) => {
        const orderMethod = 'Most Popular';
        await test.step('Change article sorting', async () => {
            await mp.knowledgeBasePage.changeArticleSorting(orderMethod);
        });
        await test.step('Verify article count', async () => {
            await mp.knowledgeBasePage.verifyArticleSorting(orderMethod);
        });
    });
});
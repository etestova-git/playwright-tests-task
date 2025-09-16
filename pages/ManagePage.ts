
import { Page } from '@playwright/test';
/*import { HomePage } from './HomePage';
import { SearchResultsPage } from './SearchResultsPage';
import { KnowledgeBasePage } from './KnowledgeBasePage';*/
import { HomePage, KnowledgeBasePage, SearchResultsPage } from '../pages';

export default class ManagePage {
    constructor(private readonly page: Page) { }

    // private caches (undefined until first access)
    private _home?: HomePage;
    private _search?: SearchResultsPage;
    private _knowledge?: KnowledgeBasePage;

    // Lazy getter: creates the page object only on first use, then reuses it.
    get homePage(): HomePage {
        return this._home ??= new HomePage(this.page);
    }

    get searchResultsPage(): SearchResultsPage {
        return this._search ??= new SearchResultsPage(this.page);
    }

    get knowledgeBasePage(): KnowledgeBasePage {
        return this._knowledge ??= new KnowledgeBasePage(this.page);
    }
}
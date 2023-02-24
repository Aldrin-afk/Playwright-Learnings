import { expect, Locator, Page } from '@playwright/test';
import Constants from '../common/constants.json';

export class LinksPO {
    readonly page: Page;
    linksBtn: Locator;
    createAPI: Locator;
    noContentAPI: Locator;
    movedAPI: Locator;
    badReqAPI: Locator;
    unAuthAPI: Locator;
    forbiddenAPI: Locator;
    notFoundAPI: Locator;
    linkResult: Locator;
    homeUrlBtn: Locator;
    homeUrlBtn2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linksBtn = this.page.locator(`//span[text()='Links']`);
        this.createAPI = this.page.locator(`a#created`);
        this.noContentAPI = this.page.locator(`a#no-content`);
        this.movedAPI = this.page.locator(`a#moved`);
        this.badReqAPI = this.page.locator(`a#bad-request`);
        this.unAuthAPI = this.page.locator(`a#unauthorized`);
        this.forbiddenAPI = this.page.locator(`a#forbidden`);
        this.notFoundAPI = this.page.locator(`a#invalid-url`);
        this.linkResult = this.page.locator(`p#linkResponse`);
        this.homeUrlBtn = this.page.locator(`a#simpleLink`);
        this.homeUrlBtn2 = this.page.locator(`a#dynamicLink`);
    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickLinksBtn() {
        await this.linksBtn.click();
    }

    async clickcreatedAPI() {
        await this.createAPI.click();
    }

    async clicknoContentAPI() {
        await this.noContentAPI.click();
    }

    async clickmovedAPI() {
        await this.movedAPI.click();
    }

    async clickbadReqAPI() {
        await this.badReqAPI.click();
    }

    async clickunAuthorizedAPI() {
        await this.unAuthAPI.click();
    }

    async clickforbiddenAPI() {
        await this.forbiddenAPI.click();
    }

    async clicknotFoundAPI() {
        await this.notFoundAPI.click();
    }

    async linkResponse() {
        return await this.linkResult.allInnerTexts();
    }

    async clickHomePageBtn() {
        await this.homeUrlBtn.click();
    }
    
    async clickHomePageDynBtn() {
        await this.homeUrlBtn2.click();
    }
}
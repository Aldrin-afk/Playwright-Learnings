import { Page } from '@playwright/test';
import Constants from '../common/constants.json';


export class BrokenImageLinkPO {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickBrokenLinksImageBtn() {
        await this.page.locator(`//span[text()='Broken Links - Images']`).click();
    }

    async clickValidLink() {
        await this.page.locator(`//a[contains(text(),'Click Here for Valid Link')]`).click();
    }

    async clickBrokenLink() {
        await this.page.locator(`//a[contains(text(),'Click Here for Broken Link')]`).click();
    }

    async validLinkHeader() {
        return await this.page.locator(`//p[text()='Valid Link']`).textContent();
    }

    async brokenLinkHeader() {
        return await this.page.locator(`//p[text()='Broken Link']`).textContent();
    }
}
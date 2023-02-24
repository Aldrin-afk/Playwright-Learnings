import { expect, Locator, Page } from '@playwright/test';
import Constants from '../common/constants.json';


export class UploadDownloadPO {
    readonly page: Page;
    updownBtn: Locator;
    downloadBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.updownBtn = this.page.locator(`//span[text()='Upload and Download']`);
        this.downloadBtn = this.page.locator("a#downloadButton");

    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickUploadDownloadBtn() {
        await this.updownBtn.click();
    }

    async clickDownloadBtn() {
        await this.downloadBtn.click();
    }
}
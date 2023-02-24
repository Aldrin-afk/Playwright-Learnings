import { expect, Locator, Page } from '@playwright/test';
import Constants from '../common/constants.json';

export class CheckBoxPO {
    readonly page: Page;
    checkBoxBtn: Locator;
    checkBox: Locator;
    expandBtn: Locator;
    collapseBtn: Locator;
    toggleBtn: Locator;
    result1: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkBoxBtn = this.page.locator(`//span[text()='Check Box']`);
        this.checkBox = this.page.locator(`span[class="rct-checkbox"]`);
        this.expandBtn = this.page.locator(`button[title="Expand all"]`);
        this.collapseBtn = this.page.locator(`button[title="Collapse all"]`);
        this.toggleBtn = this.page.locator(`button[title="Toggle"]`);
        this.result1 = this.page.locator(`div[id="result"]`);

    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickCheckBoxBtn() {
        await this.checkBoxBtn.click();
    }

    async clickHomeCheckBox() {
        await this.checkBox.click();
    }

    async dispResult() {
        return await this.result1.textContent();
    }

    async clickExpandBtn() {
        await this.expandBtn.click();
    }

    async clickCollapseBtn() {
        await this.collapseBtn.click();
    }
    
    async clickToggleBtn() {
        await this.toggleBtn.nth(0).click();
    }
}
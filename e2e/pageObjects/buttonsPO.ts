import { Locator, Page } from '@playwright/test';
import Constants from '../common/constants.json';


export class ButtonsPO {
    readonly page: Page;
    buttonsBtn: Locator;
    doubleClickBtn: Locator;
    rightClickBtn: Locator;
    clickMeBtn: Locator;
    doubleClickMessage: Locator;
    rightClickMessage: Locator;
    dynamicClickMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonsBtn = this.page.locator(`//span[text()='Buttons']`);
        this.doubleClickBtn = this.page.locator(`button[id="doubleClickBtn"]`);
        this.rightClickBtn = this.page.locator(`button[id="rightClickBtn"]`);
        this.clickMeBtn = this.page.locator(`//button[text()='Click Me']`);
        this.doubleClickMessage = this.page.locator(`p#doubleClickMessage`);
        this.rightClickMessage = this.page.locator(`p#rightClickMessage`);
        this.dynamicClickMessage = this.page.locator(`p#dynamicClickMessage`);
    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickRadioBtn() {
        await this.buttonsBtn.click();
    }

    async clickDoubleClickBtn() {
        await this.doubleClickBtn.dblclick();
    }

    async clickRightClickBtn() {
        await this.rightClickBtn.click({ button: 'right' });
    }

    async clickMeButtonBtn() {
        await this.clickMeBtn.click();
    }

    async dbButtonResult() {
        return await this.doubleClickMessage.allTextContents();
    }

    async rbuttonResult() {
        return await this.rightClickMessage.allTextContents();
    }

    async dynbuttonResult() {
        return await this.dynamicClickMessage.allTextContents();
    }
}


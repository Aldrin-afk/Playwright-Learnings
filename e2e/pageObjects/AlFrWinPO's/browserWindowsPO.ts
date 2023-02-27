import { expect, Locator, Page } from '@playwright/test';
import Constants from '../../common/constants.json';


export class browserWindowsPO {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async toClickAndVerifyNewTab() {
        const newTab = this.page.waitForEvent('popup');
        await this.page.locator(`button#tabButton`).click();
        const tabWindow = await newTab;
        await tabWindow.bringToFront();
        let tabVerify = await tabWindow.locator(`h1#sampleHeading`).textContent();
        expect(tabVerify).toBe(`This is a sample page`)
        await tabWindow.close();
    }

    async toClickAndVerifyNewWindow() {
        const newWindow = this.page.waitForEvent('popup');
        await this.page.locator(`button#windowButton`).click();
        await this.page.getByRole('button', { name: 'New Window', exact: true }).click();
        const window = await newWindow;
        await window.bringToFront();
        let windowVerify = await window.locator(`h1#sampleHeading`).textContent();
        expect(windowVerify).toBe(`This is a sample page`)
        await window.close();
    }

    async toClickAndVerifyNewWindowMessage() {
        const newWindowMsg = this.page.waitForEvent('popup');
        await this.page.locator(`button#messageWindowButton`).click();
        const windowMsg = await newWindowMsg;
        await windowMsg.bringToFront();
    }
}
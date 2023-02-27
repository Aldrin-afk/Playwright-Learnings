import { expect, Locator, Page } from '@playwright/test';
import Constants from '../../common/constants.json';


export class alertsPO {
    readonly page: Page;
    alertsBtn: Locator;
    alertsHeaderBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.alertsBtn = page.locator(`//div[text()='Alerts, Frame & Windows']`);
        this.alertsHeaderBtn = page.locator(`//span[text()='Alerts']`);
    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickAlertsFrameWindowsBtn() {
        await this.alertsBtn.click();
    }
    
    async clickAlertsBtn() {
        await this.alertsHeaderBtn.click();
    }

    async clickAlertButton() {
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept();
        });
        await this.page.locator('#alertButton').click();
    }

    async clickTimerAlertButton() {
        await this.page.locator('#timerAlertButton').click();
        const dialog = await this.page.waitForEvent('dialog');
        const message = dialog.message();
        await dialog.dismiss();
        console.log(`Dialog message: ${message}`);
    }

    async clickAlertBoxButton() {
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept();
        });
        await this.page.locator('#confirmButton').click();
        let visibletextButton = await this.page.locator(`span#confirmResult`).textContent();
        expect(visibletextButton).toBe('You selected Ok');
    }

    async clickPromptButton() {
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept('Aldrin Francis');
        });
        await this.page.locator('#promtButton').click();
        let visibleTextAlertName = await this.page.locator(`span#promptResult`).textContent();
        expect(visibleTextAlertName).toBe('You entered Aldrin Francis');
    }
}
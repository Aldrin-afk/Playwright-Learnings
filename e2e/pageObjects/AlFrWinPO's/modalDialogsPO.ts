import { expect, Locator, Page } from '@playwright/test';
import Constants from '../../common/constants.json';


export class modalDialogsPO {
    readonly page: Page;
    alertsBtn: Locator;
    modalDialogBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.alertsBtn = page.locator(`//div[text()='Alerts, Frame & Windows']`);
        this.modalDialogBtn = page.locator(`//span[text()='Modal Dialogs']`)
    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickAlertsFrameWindowsBtn() {
        await this.alertsBtn.click();
    }

    async clickModalDialogBtn() {
        await this.modalDialogBtn.click();
    }

    async toVerifySmallModal() {
        await this.page.locator(`button#showSmallModal`).click();
        await this.page.locator(`div.modal-content`).isEnabled();
        let headerTextModalSmall = await this.page.locator(`div.modal-title.h4`).textContent();
        console.log(headerTextModalSmall);
        expect(headerTextModalSmall).toBe(`Small Modal`);
        await this.page.locator(`button#closeSmallModal`).click();
    }

    async toVerifyLargeModal() {
        await this.page.locator(`button#showLargeModal`).click();
        await this.page.locator(`div.modal-content`).isEnabled();
        let headerTextModalLarge = await this.page.locator(`div.modal-title.h4`).textContent();
        console.log(headerTextModalLarge);
        expect(headerTextModalLarge).toBe(`Large Modal`);
        await this.page.locator(`button#closeLargeModal`).click();
    }
}
import { expect, Locator, Page } from '@playwright/test';
import { Support } from "../common/constants";

let support: Support;

export class AlertsFramesWindowsPO {
    readonly page: Page;
    alertsBtn: Locator;
    alertsHeaderBtn: Locator;
    modalDialogBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.alertsBtn = page.locator(`//div[text()='Alerts, Frame & Windows']`);
        this.alertsHeaderBtn = page.locator(`//span[text()='Alerts']`);
        this.modalDialogBtn = page.locator(`//span[text()='Modal Dialogs']`)

        support = new Support();
    }

    async baseURL() {
        await this.page.goto(support.homePageURL);
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

    //////////////
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

    //////////////
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
};
import { expect, Locator, Page } from '@playwright/test';
import Constants from '../common/constants.json';

export class TextBoxPO {
    readonly page: Page;
    textBoxBtn: Locator;
    userNameHeader: Locator;
    userNameInputBox: Locator;
    userEmailHeader: Locator;
    userEmailInputBox: Locator;
    currAddress: Locator;
    currAddressTextArea: Locator;
    permAddress: Locator;
    permAddressTextArea: Locator;
    subBtn: Locator;
    result: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textBoxBtn = page.locator(`//span[text()='Text Box']`);
        this.userNameHeader = page.locator(`label[id="userName-label"]`);
        this.userNameInputBox = page.locator(`input[id="userName"]`);
        this.userEmailHeader = this.page.locator(`label[id="userEmail-label"]`);
        this.userEmailInputBox = this.page.locator(`input[id="userEmail"]`);
        this.currAddress = this.page.locator(`label[id="currentAddress-label"]`);
        this.currAddressTextArea = this.page.locator(`textarea[id="currentAddress"]`);
        this.permAddress = this.page.locator(`label[id="permanentAddress-label"]`);
        this.permAddressTextArea = this.page.locator(`textarea[id="permanentAddress"]`);
        this.subBtn = this.page.locator(`button[id="submit"]`);
        this.result = this.page.locator(`div[id="output"]`);
    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickTextBoxBtn() {
        await this.textBoxBtn.click();
    }

    async fillFullName(name: string) {
        const username = await this.userNameHeader.textContent();
        expect(username).toContain('Full Name');
        await this.userNameInputBox.fill(name);
    }

    async fillEmail(email: string) {
        const emailheader = await this.userEmailHeader.textContent();
        expect(emailheader).toContain('Email');
        await this.userEmailInputBox.fill(email);
    }

    async fillCurrAddress(currAdrs: string) {
        const address = await this.currAddress.textContent();
        expect(address).toContain('Current Address');
        await this.currAddressTextArea.type(currAdrs);
    }

    async fillPermAddress(permAdrs: string) {
        const peraddress = await this.permAddress.textContent();
        expect(peraddress).toContain('Permanent Address');
        await this.permAddressTextArea.fill(permAdrs);
    }

    async submitButton() {
        await this.subBtn.click();
    }

    async textResult() {
        return await this.result.allTextContents();
    }
}
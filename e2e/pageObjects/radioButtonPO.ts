import { Locator, Page } from '@playwright/test';
import Constants from '../common/constants.json';

export class RadioButtonPO {
    readonly page: Page;
    radioButBtn: Locator;
    radioButHeader: Locator;
    yesRadioBtn: Locator;
    impressiveRadioBtn: Locator;
    noRadioButton: Locator;
    radioResultText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.radioButBtn = this.page.locator(`//span[text()='Radio Button']`);
        this.radioButHeader = this.page.locator(`div[class="mb-3"]`);
        this.yesRadioBtn = this.page.locator(`input[id="yesRadio"]`);
        this.impressiveRadioBtn = this.page.locator(`input[id="impressiveRadio"]`);
        this.noRadioButton = this.page.locator(`input[id="noRadio"]`);
        this.radioResultText = this.page.locator(`span.text-success`);
    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickRadioButtonBtn() {
        await this.radioButBtn.click();
    }

    async radioBtnHeader() {
        return await this.radioButHeader.allTextContents();
    }

    async clickYesRadioBtn() {
        await this.yesRadioBtn.click({ force: true });
        const radioButton = this.yesRadioBtn;
        const isRadioButtonEnabled = await radioButton.isEnabled();
        const isRadioButtonClickable = await radioButton.isChecked();

        if (!isRadioButtonEnabled) {
            console.log('Radio button is disabled and cannot be checked.');
        } else if (!isRadioButtonClickable) {
            console.log('Radio button is enabled but not checked.');
        } else {
            console.log('Radio button is enabled and checked.');
        }
    }

    async clickImpressiveRadioBtn() {
        await this.impressiveRadioBtn.click({ force: true });
        const radioButton = this.impressiveRadioBtn;
        const isRadioButtonEnabled = await radioButton.isEnabled();
        const isRadioButtonClickable = await radioButton.isChecked();

        if (!isRadioButtonEnabled) {
            console.log('Radio button is disabled and cannot be checked.');
        } else if (!isRadioButtonClickable) {
            console.log('Radio button is enabled but not checked.');
        } else {
            console.log('Radio button is enabled and checked.');
        }
    }

    async noRadioBtn() {
        const radioButton = this.noRadioButton;
        const isRadioButtonEnabled = await radioButton.isEnabled();
        const isRadioButtonClickable = await radioButton.isChecked();

        if (!isRadioButtonEnabled) {
            console.log('Radio button is disabled and cannot be checked.');
        } else if (!isRadioButtonClickable) {
            console.log('Radio button is enabled but not checked.');
        } else {
            console.log('Radio button is enabled and checked.');
        }
    }

    async radioResult() {
        return await this.radioResultText.allTextContents();
    }
}
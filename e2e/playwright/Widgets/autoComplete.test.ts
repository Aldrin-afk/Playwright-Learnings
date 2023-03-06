import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { browserWindowsPO } from "../../PageObjects/AlFrWinPO's/browserWindowsPO";

let page: Page;
let browser: Browser, context: any;
let browserPO: browserWindowsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    browserPO = new browserWindowsPO(page);
});

test("Verification of AutoComplete DEMOQA", async () => {
    await browserPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await page.getByText('Widgets').click();
    await page.getByText('Auto Complete').click();

    // Wait for the input field to become visible and click on it
    const header1 = await page.locator(`div#autoCompleteMultiple>span`).textContent();
    expect(header1).toBe(`Type multiple color names`);
    await page.locator('div#autoCompleteMultipleContainer').click();

    // Type 'pu' in the input field to trigger auto-complete suggestions
    await page.type('div#autoCompleteMultipleContainer', 'pu');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Wait for the input field to become visible and click on it
    const header2 = await page.locator(`div#autoCompleteSingle>span`).textContent();
    expect(header2).toBe(`Type single color name`);
    await page.locator('div#autoCompleteSingleContainer').click();

    // Type 'wh' in the input field to trigger auto-complete suggestions
    await page.type('div#autoCompleteSingleContainer', 'wh');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Verify that the input field has been populated with the selected suggestion
    const inputFieldValue = await page.locator('div#autoCompleteMultipleContainer').textContent();
    console.log(`Input field value: ${inputFieldValue}`);

    await page.waitForTimeout(3000);

    // Verify that the input field has been populated with the selected suggestion
    const inputFieldValue2 = await page.locator('div#autoCompleteSingleContainer').textContent();
    console.log(`Input field value: ${inputFieldValue2}`);
});

test.afterAll(async () => {
    await browser.close();
});
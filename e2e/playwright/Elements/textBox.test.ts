import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { TextBoxPO } from "../../PageObjects/textBoxPO";

let page: Page;
let browser: Browser, context: any;
let textBoxPO: TextBoxPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    textBoxPO = new TextBoxPO(page);
});

test("Verification of TextBox DEMOQA", async () => {
    await textBoxPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await textBoxPO.clickTextBoxBtn();
    await textBoxPO.fillFullName(Constants.TestData.Fname);
    await page.locator(`input[id="userName"]`).clear();
    await textBoxPO.fillFullName(Constants.TestData.Fname);
    await textBoxPO.fillEmail(Constants.TestData.Email);
    await textBoxPO.fillCurrAddress('     ');
    await page.locator(`textarea[id="currentAddress"]`).clear();
    await textBoxPO.fillCurrAddress(Constants.TestData.currentAddress);
    await textBoxPO.fillPermAddress(Constants.TestData.permanentAddress);
    await textBoxPO.submitButton();
    let result = await textBoxPO.textResult();
    expect(result.toString()).toBe(`Name:${Constants.TestData.Fname}Email:${Constants.TestData.Email}Current Address :${Constants.TestData.currentAddress} Permananet Address :${Constants.TestData.permanentAddress}`);
});

test.afterAll(async () => {
    await browser.close();
});
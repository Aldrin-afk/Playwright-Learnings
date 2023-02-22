import { chromium, expect, test, Page } from "@playwright/test";
import Constants from '../../common/constants.json';
import { ElementsPO } from "../../PageObjects/elementsPO";

let page: Page;
let browser, context: any;
let elementsPO: ElementsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    elementsPO = new ElementsPO(page);
});

test("Verification of TextBox DEMOQA", async () => {
    test.slow();
    await elementsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await elementsPO.clickTextBoxBtn();
    await elementsPO.fillFullName(Constants.TestData.Fname);
    await page.locator(`input[id="userName"]`).clear();
    await elementsPO.fillFullName(Constants.TestData.Fname);
    await elementsPO.fillEmail(Constants.TestData.Email);
    await elementsPO.fillCurrAddress('     ');
    await page.locator(`textarea[id="currentAddress"]`).clear();
    await elementsPO.fillCurrAddress(Constants.TestData.currentAddress);
    await elementsPO.fillPermAddress(Constants.TestData.permanentAddress);
    await elementsPO.submitButton();
    let result = await elementsPO.textResult();
    expect(result.toString()).toBe(`Name:${Constants.TestData.Fname}Email:${Constants.TestData.Email}Current Address :${Constants.TestData.currentAddress} Permananet Address :${Constants.TestData.permanentAddress}`);
    // await new Promise(() => { });
});
test.afterAll(async () => {
    await browser.close();
});
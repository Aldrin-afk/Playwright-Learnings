import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { ElementsPO } from "../../PageObjects/elementsPO";

let page: Page;
let browser, context: any;
let elementsPO: ElementsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize({ width: 2048, height: 1536 });
    elementsPO = new ElementsPO(page);
});
const filepath = 'sample.jpeg'

test("Verification of Practice Form DEMOQA", async () => {
    await elementsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);

    await page.locator(`//div[text()='Forms']`).click();
    await elementsPO.clickPracticeFormBtn();
    await elementsPO.fillPracticeForm(filepath);
    await elementsPO.submitButton();
    let result = await elementsPO.formResult();
    expect(result).toContain(Constants.TestData.formResult);
});

test.afterAll(async () => {
    await browser.close();
});

import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { PracticeFormPO } from "../../PageObjects/practiceFormPO";

let page: Page;
let browser, context: any;
let practiceFormPO: PracticeFormPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize({ width: 2048, height: 1536 });
    practiceFormPO = new PracticeFormPO(page);
});
const filepath = 'sample.jpeg'

test("Verification of Practice Form DEMOQA", async () => {
    await practiceFormPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);

    await page.locator(`//div[text()='Forms']`).click();
    await practiceFormPO.clickPracticeFormBtn();
    await practiceFormPO.fillPracticeForm(filepath);
    await practiceFormPO.submitButton();
    let result = await practiceFormPO.formResult();
    expect(result).toContain(Constants.TestData.formResult);
});

test.afterAll(async () => {
    await browser.close();
});

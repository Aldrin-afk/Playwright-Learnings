import { chromium, expect, test, Page, Browser } from "@playwright/test";
import { Support } from "../../common/constants";
import { ElementsPO } from "../../PageObjects/elementsPO";

let page: Page;
let browser, context: any;
let elementsPO: ElementsPO;
let support: Support;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize({ width: 2048, height: 1536 });
    elementsPO = new ElementsPO(page);
    support = new Support();
});
const filepath = 'sample.jpeg'

test("Verification of Practice Form DEMOQA", async () => {
    await elementsPO.baseURL();
    await expect(page).toHaveURL(support.webSiteURL);

    await page.locator(`//div[text()='Forms']`).click();
    await elementsPO.clickPracticeFormBtn();
    await elementsPO.fillPracticeForm(filepath);
    await elementsPO.submitButton();
    let result = await elementsPO.formResult();
    expect(result).toContain(support.formResult);
});

test.afterAll(async () => {
    await browser.close();
});

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
    elementsPO = new ElementsPO(page);
});

test("Verification of CheckBox DEMOQA", async () => {
    await elementsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await elementsPO.clickCheckBoxBtn();
    await page.locator(`(//span[@class='rct-title'])[1]`).uncheck();
    await elementsPO.clickHomeCheckBox();
    const result = await elementsPO.dispResult();
    expect(result).toBe("You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile");
    await elementsPO.clickExpandBtn();
    await page.locator(`(//span[@class='rct-title'])[1]`).check();
    await page.locator(`//span[text()='Desktop']`).click();
    await page.locator(`//span[text()='Desktop']`).uncheck();
    const result1 = await elementsPO.dispResult();
    expect(result1).toBe("You have selected :documentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile");
    await elementsPO.clickToggleBtn();
    await elementsPO.clickCollapseBtn();
});

test.afterAll(async () => {
    await browser.close();
});
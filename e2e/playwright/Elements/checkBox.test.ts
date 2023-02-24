import { chromium, expect, test, Page } from "@playwright/test";
import Constants from '../../common/constants.json';
import { CheckBoxPO } from "../../PageObjects/checkBoxPO";

let page: Page;
let browser, context: any;
let checkBoxPO: CheckBoxPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    checkBoxPO = new CheckBoxPO(page);
});

test("Verification of CheckBox DEMOQA", async () => {
    await checkBoxPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await checkBoxPO.clickCheckBoxBtn();
    await page.locator(`(//span[@class='rct-title'])[1]`).uncheck();
    await checkBoxPO.clickHomeCheckBox();
    const result = await checkBoxPO.dispResult();
    expect(result).toBe("You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile");
    await checkBoxPO.clickExpandBtn();
    await page.locator(`(//span[@class='rct-title'])[1]`).check();
    await page.locator(`//span[text()='Desktop']`).click();
    await page.locator(`//span[text()='Desktop']`).uncheck();
    const result1 = await checkBoxPO.dispResult();
    expect(result1).toBe("You have selected :documentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile");
    await checkBoxPO.clickToggleBtn();
    await checkBoxPO.clickCollapseBtn();
});

test.afterAll(async () => {
    await browser.close();
});
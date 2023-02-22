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
    elementsPO = new ElementsPO(page);
    support = new Support();
});

test("Verification of Web Tables DEMOQA", async () => {
    await elementsPO.baseURL();
    await expect(page).toHaveURL(support.webSiteURL);
    await elementsPO.clickWebTableBtn();
    await elementsPO.clickAddRecordBtn();
    await elementsPO.fillRegForm();
    await elementsPO.submitButton();

    await elementsPO.fillSearchBox();
    await elementsPO.verifyTableByFilter();
});

test.afterAll(async () => {
    await browser.close();
});
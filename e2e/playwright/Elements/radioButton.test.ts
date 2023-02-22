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

test("Verification of Radio Button DEMOQA", async () => {
    await elementsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await elementsPO.clickRadioButtonBtn();
    const headerTitle = await elementsPO.radioBtnHeader();
    expect(headerTitle).toContain(Constants.TestData.radioButtonHeader);

    await elementsPO.clickYesRadioBtn();
    const radio1 = await elementsPO.radioResult();
    expect(radio1.toString()).toBe(`Yes`);
    await elementsPO.clickImpressiveRadioBtn();
    const radio2 = await elementsPO.radioResult();
    expect(radio2.toString()).toBe(`Impressive`);
    await elementsPO.noRadioBtn();
});

test.afterAll(async () => {
    await browser.close();
});
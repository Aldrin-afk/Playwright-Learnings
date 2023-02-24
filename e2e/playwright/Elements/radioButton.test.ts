import { chromium, expect, test, Page } from "@playwright/test";
import Constants from '../../common/constants.json';
import { RadioButtonPO } from "../../PageObjects/radioButtonPO";

let page: Page;
let browser, context: any;
let radioButtonPO: RadioButtonPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    radioButtonPO = new RadioButtonPO(page);
});

test("Verification of Radio Button DEMOQA", async () => {
    await radioButtonPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await radioButtonPO.clickRadioButtonBtn();
    const headerTitle = await radioButtonPO.radioBtnHeader();
    expect(headerTitle).toContain(Constants.TestData.radioButtonHeader);

    await radioButtonPO.clickYesRadioBtn();
    const radio1 = await radioButtonPO.radioResult();
    expect(radio1.toString()).toBe(`Yes`);
    await radioButtonPO.clickImpressiveRadioBtn();
    const radio2 = await radioButtonPO.radioResult();
    expect(radio2.toString()).toBe(`Impressive`);
    await radioButtonPO.noRadioBtn();
});

test.afterAll(async () => {
    await browser.close();
});
import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { modalDialogsPO } from "../../PageObjects/AlFrWinPO's/modalDialogsPO";

let page: Page;
let browser: Browser, context: any;
let modalPO: modalDialogsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    modalPO = new modalDialogsPO(page);
});

test("Verification of ModalDialogs DEMOQA", async () => {

    await modalPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await modalPO.clickAlertsFrameWindowsBtn();
    await modalPO.clickModalDialogBtn();
    await page.waitForSelector(`div#modalWrapper div div`);

    let headerText = await page.locator(`div#modalWrapper div div`).textContent();
    console.log(headerText);
    expect(headerText).toBe(`Click on button to see modal`);

    await modalPO.toVerifySmallModal();
    await modalPO.toVerifyLargeModal();
});

test.afterAll(async () => {
    await browser.close();
});
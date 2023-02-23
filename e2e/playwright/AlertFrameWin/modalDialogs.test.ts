import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { AlertsFramesWindowsPO } from "../../PageObjects/alertsFramesWindowsPO";

let page: Page;
let pages, browser, context: any;
let alertsPO: AlertsFramesWindowsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    alertsPO = new AlertsFramesWindowsPO(page);
});

test("Verification of ModalDialogs DEMOQA", async () => {

    await alertsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await alertsPO.clickAlertsFrameWindowsBtn();
    await alertsPO.clickModalDialogBtn();
    await page.waitForSelector(`div#modalWrapper div div`);

    let headerText = await page.locator(`div#modalWrapper div div`).textContent();
    console.log(headerText);
    expect(headerText).toBe(`Click on button to see modal`);

    await alertsPO.toVerifySmallModal();
    await alertsPO.toVerifyLargeModal();
});

test.afterAll(async () => {
    await browser.close();
});
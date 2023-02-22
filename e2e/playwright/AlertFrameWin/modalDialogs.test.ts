import { chromium, expect, test, Page, Browser } from "@playwright/test";
import { Support } from "../../common/constants";
import { AlertsFramesWindowsPO } from "../../PageObjects/alertsFramesWindowsPO";

let page: Page;
let pages, browser, context: any;
let alertsPO: AlertsFramesWindowsPO;
let support: Support;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    alertsPO = new AlertsFramesWindowsPO(page);
    support = new Support();
});

test("Verification of ModalDialogs DEMOQA", async () => {

    await alertsPO.baseURL();
    await expect(page).toHaveURL(support.webSiteURL);
    await alertsPO.clickAlertsFrameWindowsBtn();
    await alertsPO.clickModalDialogBtn();
    await page.waitForTimeout(3000);

    let headerText = await page.locator(`div#modalWrapper div div`).textContent();
    console.log(headerText);
    expect(headerText).toBe(`Click on button to see modal`);

    await alertsPO.toVerifySmallModal();
    await page.waitForTimeout(2000);
    await alertsPO.toVerifyLargeModal();
});
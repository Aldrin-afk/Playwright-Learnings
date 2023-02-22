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

test("Verification of BrowserWindows DEMOQA", async () => {
    await alertsPO.baseURL();
    await expect(page).toHaveURL(support.webSiteURL);
    await page.goto('https://demoqa.com/elements');
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByText('Browser Windows').click();

    await alertsPO.toClickAndVerifyNewTab();
    await alertsPO.toClickAndVerifyNewWindow();
    await alertsPO.toClickAndVerifyNewWindowMessage();
});
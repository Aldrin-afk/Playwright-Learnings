import { chromium, expect, test, Page } from "@playwright/test";
import Constants from '../../common/constants.json';
import { browserWindowsPO } from "../../PageObjects/AlFrWinPO's/browserWindowsPO";

let page: Page;
let browser, context: any;
let browserPO: browserWindowsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    browserPO = new browserWindowsPO(page);
});

test("Verification of BrowserWindows DEMOQA", async () => {
    await browserPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByText('Browser Windows').click();

    await browserPO.toClickAndVerifyNewTab();
    await browserPO.toClickAndVerifyNewWindow();
    await browserPO.toClickAndVerifyNewWindowMessage();
});

test.afterAll(async () => {
    await browser.close();
});
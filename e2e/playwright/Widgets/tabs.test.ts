import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { browserWindowsPO } from "../../PageObjects/AlFrWinPO's/browserWindowsPO";

let page: Page;
let browser: Browser, context: any;
let browserPO: browserWindowsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    browserPO = new browserWindowsPO(page);
});

test("Verification of Tabs DEMOQA", async () => {
    await browserPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await page.getByText('Widgets').click();
    await page.getByText('Tabs').click();

    const tabs = await page.$$(".nav-link");
    await tabs[2].click(); // Click the third tab

    const activeTab = await page.$(".nav-link.active");
    const activeTabText = await activeTab.innerText();
    console.log("Active tab text:", activeTabText);

    // Verify the tab is active
    const activeTabVerify = await page.waitForSelector(`.nav-link.active`);
    const tabContent = await page.locator(`div#demo-tabpane-use>p`).textContent();
    if (!activeTabVerify) {
        throw new Error('Could not activate tab');
    } else {
        expect(tabContent).toBeTruthy();
        console.log("The tab is active and verified:", activeTabText); //Print the active tab name
        console.log('Tab Content displayed:', tabContent);             //Print the Tab Content displayed
    }
});

test.afterAll(async () => {
    await browser.close();
});
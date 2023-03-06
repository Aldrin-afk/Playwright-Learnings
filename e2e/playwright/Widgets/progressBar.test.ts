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

test("Verification of ProgressBar DEMOQA", async () => {
    await browserPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await page.getByText('Widgets').click();
    await page.getByText('Progress Bar').click();

    const progressBar = await page.$('div#progressBar');
    const startButton = await page.$('button#startStopButton');
    const resetButton = await page.$('button#resetButton');

    if (progressBar && startButton) {
        const progressBarWidth = await progressBar.getProperty('innerText');
        console.log(`Initial progress bar width: ${progressBarWidth}`);

        await startButton.click();

        await page.waitForSelector('div#progressBar [aria-valuenow="100"]');
        const progressBarCompleteWidth = await progressBar.getProperty('innerText');
        console.log(`Completed progress bar width: ${progressBarCompleteWidth}`);
    } else {
        await resetButton.click();
        console.error('Could not find progress bar or start button');
    }
});

test.afterAll(async () => {
    await browser.close();
});
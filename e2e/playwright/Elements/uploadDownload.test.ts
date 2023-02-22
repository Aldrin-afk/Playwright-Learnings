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

const filepath = 'sample.jpeg'

test("Verification of Upload and Download DEMOQA", async () => {

    await elementsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);

    await elementsPO.clickUploadDownloadBtn();
    await page.setInputFiles("input[type='file']", [filepath]);
    const filePath = await page.locator(`p[id="uploadedFilePath"]`).textContent();
    expect(filePath).toBe(`C:\\fakepath\\${filepath}`);

    await page.waitForTimeout(3000);

    await elementsPO.clickDownloadBtn();
    const download = await Promise.all([
        page.waitForEvent("download")
    ])
    const path = await download[0].path();
    console.log(path);
    const fs = require('fs');
    if (fs.existsSync(path)) {
        console.log('Downloaded File exists.');
    } else {
        console.log('Downloaded File does not exist.');
    }
});

test.afterAll(async () => {
    await browser.close();
});
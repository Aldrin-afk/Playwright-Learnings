import { chromium, expect, test, Page } from "@playwright/test";
import Constants from '../../common/constants.json';
import { UploadDownloadPO } from "../../PageObjects/uploadDownloadPO";

let page: Page;
let browser, context: any;
let uploadDownloadPO: UploadDownloadPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    uploadDownloadPO = new UploadDownloadPO(page);
});

const filepath = 'sample.jpeg'

test("Verification of Upload and Download DEMOQA", async () => {

    await uploadDownloadPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);

    await uploadDownloadPO.clickUploadDownloadBtn();
    await page.setInputFiles("input[type='file']", [filepath]);
    const filePath = await page.locator(`p[id="uploadedFilePath"]`).textContent();
    expect(filePath).toBe(`C:\\fakepath\\${filepath}`);

    await page.waitForTimeout(3000);

    await uploadDownloadPO.clickDownloadBtn();
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
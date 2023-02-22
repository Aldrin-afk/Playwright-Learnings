import { chromium, expect, test, Page, Browser } from "@playwright/test";
import { Support } from "../../common/constants";
import { ElementsPO } from "../../PageObjects/elementsPO";

let page: Page;
let browser, context: any;
let elementsPO: ElementsPO;
let support: Support;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    elementsPO = new ElementsPO(page);
    support = new Support();
});
const filepath = 'sample.jpeg'

test("Verification of Upload and Download DEMOQA", async () => {

    await elementsPO.baseURL();
    await expect(page).toHaveURL(support.webSiteURL);

    await elementsPO.clickUploadDownloadBtn();
    await page.setInputFiles("input[type='file']", [filepath]);
    await page.waitForTimeout(3000);

    await elementsPO.clickDownloadBtn();
    await page.waitForTimeout(3000);
    const download = await Promise.all([
        page.waitForEvent("download")
    ])
    const path = await download[0].path();
    console.log(path);
});

test.afterAll(async () => {
    await browser.close();
});
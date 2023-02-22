import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { ElementsPO } from "../../PageObjects/elementsPO";

let page: Page;
let pages, browser, context: any;
let elementsPO: ElementsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    elementsPO = new ElementsPO(page);
});

test("Verification of Links DEMOQA", async () => {
    test.slow();
    await elementsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await elementsPO.clickLinksBtn();

    await elementsPO.clickHomePageBtn();
    await page.waitForTimeout(1000); // wait for page loading
    pages = await context.pages();
    expect(await pages[0].title()).toEqual('DEMOQA');
    console.log(await pages[0].title());
    const status = await page.evaluate(() => document.readyState);
    console.log(`Page status: ${status}`);
    await elementsPO.clickHomePageDynBtn();
    expect(await pages[1].title()).toEqual('DEMOQA');
    console.log(await pages[1].title());
    const status1 = await page.evaluate(() => document.readyState);
    console.log(`Page status: ${status1}`);



    await elementsPO.clickcreatedAPI();
    await page.waitForTimeout(1000);
    const linkres201 = await elementsPO.linkResponse();
    expect(linkres201.toString()).toBe(Constants.TestData.linkResponse201);
    await elementsPO.clicknoContentAPI();
    await page.waitForTimeout(1000);
    const linkres204 = await elementsPO.linkResponse();
    expect(linkres204.toString()).toBe(Constants.TestData.linkResponse204);
    await elementsPO.clickmovedAPI();
    await page.waitForTimeout(1000);
    const linkres301 = await elementsPO.linkResponse();
    expect(linkres301.toString()).toBe(Constants.TestData.linkResponse301);
    await elementsPO.clickbadReqAPI();
    await page.waitForTimeout(1000);
    const linkres400 = await elementsPO.linkResponse();
    expect(linkres400.toString()).toBe(Constants.TestData.linkResponse400);
    await elementsPO.clickunAuthorizedAPI();
    await page.waitForTimeout(1000);
    const linkres401 = await elementsPO.linkResponse();
    expect(linkres401.toString()).toBe(Constants.TestData.linkResponse401);
    await elementsPO.clickforbiddenAPI();
    await page.waitForTimeout(1000);
    const linkres403 = await elementsPO.linkResponse();
    expect(linkres403.toString()).toBe(Constants.TestData.linkResponse403);
    await elementsPO.clicknotFoundAPI();
    await page.waitForTimeout(1000);
    const linkres404 = await elementsPO.linkResponse();
    expect(linkres404.toString()).toBe(Constants.TestData.linkResponse404);
});

test.afterAll(async () => {
    await browser.close();
});
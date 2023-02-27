import { chromium, expect, test, Page } from "@playwright/test";
import Constants from '../../common/constants.json';
import { LinksPO } from "../../PageObjects/linksPO";

let page: Page;
let pages, browser, context: any;
let linksPO: LinksPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    linksPO = new LinksPO(page);
});

test("Verification of Links DEMOQA", async () => {
    await linksPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await linksPO.clickLinksBtn();

    await linksPO.clickHomePageBtn();
    await page.waitForTimeout(1000); // wait for page loading
    pages = await context.pages();
    expect(await pages[0].title()).toEqual('DEMOQA');
    console.log(await pages[0].title());
    const status = await page.evaluate(() => document.readyState);
    console.log(`Page status: ${status}`);
    await linksPO.clickHomePageDynBtn();
    expect(await pages[1].title()).toEqual('DEMOQA');
    console.log(await pages[1].title());
    const status1 = await page.evaluate(() => document.readyState);
    console.log(`Page status: ${status1}`);

    await linksPO.clickcreatedAPI();
    await page.waitForTimeout(2000);
    const linkres201 = await linksPO.linkResponse();
    expect(linkres201.toString()).toBe(Constants.TestData.linkResponse201);
    await linksPO.clicknoContentAPI();
    await page.waitForTimeout(2000);
    const linkres204 = await linksPO.linkResponse();
    expect(linkres204.toString()).toBe(Constants.TestData.linkResponse204);
    await linksPO.clickmovedAPI();
    await page.waitForTimeout(2000);
    const linkres301 = await linksPO.linkResponse();
    expect(linkres301.toString()).toBe(Constants.TestData.linkResponse301);
    await linksPO.clickbadReqAPI();
    await page.waitForTimeout(2000);
    const linkres400 = await linksPO.linkResponse();
    expect(linkres400.toString()).toBe(Constants.TestData.linkResponse400);
    await linksPO.clickunAuthorizedAPI();
    await page.waitForTimeout(2000);
    const linkres401 = await linksPO.linkResponse();
    expect(linkres401.toString()).toBe(Constants.TestData.linkResponse401);
    await linksPO.clickforbiddenAPI();
    await page.waitForTimeout(2000);
    const linkres403 = await linksPO.linkResponse();
    expect(linkres403.toString()).toBe(Constants.TestData.linkResponse403);
    await linksPO.clicknotFoundAPI();
    await page.waitForTimeout(2000);
    const linkres404 = await linksPO.linkResponse();
    expect(linkres404.toString()).toBe(Constants.TestData.linkResponse404);
});

test.afterAll(async () => {
    await browser.close();
});
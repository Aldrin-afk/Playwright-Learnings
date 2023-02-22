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

test("Verification of Buttons DEMOQA", async () => {
    test.slow();
    await elementsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await elementsPO.clickRadioBtn();

    await page.locator(`button[id="doubleClickBtn"]`).click();
    const singleclick = await elementsPO.dbButtonResult();
    expect(singleclick.toString()).not.toBe("You have done a double click");
    await elementsPO.clickDoubleClickBtn();
    const dbclick = await elementsPO.dbButtonResult();
    expect(dbclick.toString()).toBe(Constants.TestData.ButtonRes1);

    await page.locator(`button[id="rightClickBtn"]`).click();
    const leftclick = await elementsPO.rbuttonResult();
    expect(leftclick.toString()).not.toBe("You have done a right click");
    await elementsPO.clickRightClickBtn();
    const rclick = await elementsPO.rbuttonResult();
    expect(rclick.toString()).toBe("You have done a right click");

    await page.locator(`//button[text()='Click Me']`).click({ button: 'right' });
    const dynclick = await elementsPO.dynbuttonResult();
    expect(dynclick.toString()).not.toBe("You have done a dynamic click");
    await elementsPO.clickMeButtonBtn();
    const norclick = await elementsPO.dynbuttonResult();
    expect(norclick.toString()).toBe("You have done a dynamic click");
});

test.afterAll(async () => {
    await browser.close();
});
import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { ButtonsPO } from "../../PageObjects/buttonsPO";

let page: Page;
let browser, context: any;
let buttonsPO: ButtonsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    buttonsPO = new ButtonsPO(page);
});

test("Verification of Buttons DEMOQA", async () => {
    test.slow();
    await buttonsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await buttonsPO.clickRadioBtn();

    await page.locator(`button[id="doubleClickBtn"]`).click();
    const singleclick = await buttonsPO.dbButtonResult();
    expect(singleclick.toString()).not.toBe("You have done a double click");
    await buttonsPO.clickDoubleClickBtn();
    const dbclick = await buttonsPO.dbButtonResult();
    expect(dbclick.toString()).toBe(Constants.TestData.ButtonRes1);

    await page.locator(`button[id="rightClickBtn"]`).click();
    const leftclick = await buttonsPO.rbuttonResult();
    expect(leftclick.toString()).not.toBe("You have done a right click");
    await buttonsPO.clickRightClickBtn();
    const rclick = await buttonsPO.rbuttonResult();
    expect(rclick.toString()).toBe("You have done a right click");

    await page.locator(`//button[text()='Click Me']`).click({ button: 'right' });
    const dynclick = await buttonsPO.dynbuttonResult();
    expect(dynclick.toString()).not.toBe("You have done a dynamic click");
    await buttonsPO.clickMeButtonBtn();
    const norclick = await buttonsPO.dynbuttonResult();
    expect(norclick.toString()).toBe("You have done a dynamic click");
});

test.afterAll(async () => {
    await browser.close();
});
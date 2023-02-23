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

test("Verification of Web Tables DEMOQA", async () => {
    await elementsPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await elementsPO.clickWebTableBtn();

    await page.locator(`span#edit-record-2`).click();
    const fName = await page.locator(`label[id="firstName-label"]`).textContent();
    expect(fName).toBe('First Name');
    await page.locator(`input[id="firstName"]`).fill(`Francis`);
    await elementsPO.submitButton();
    const editedRow = await page.locator(`div.rt-tbody`).allTextContents();
    expect(editedRow.toString()).not.toContain(`AldenCantrell45alden@example.com12000Compliance`);
    expect(editedRow.toString()).toContain("CierraVega39cierra@example.com10000Insurance FrancisCantrell45alden@example.com12000Compliance KierraGentry29kierra@example.com2000Legal");

    await page.locator(`span#delete-record-3`).click();
    const rowBody = await page.locator(`div.rt-tbody`).allTextContents();
    expect(rowBody).not.toContain(`KierraGentry29kierra@example.com2000Legal`);

    await elementsPO.clickAddRecordBtn();
    await elementsPO.fillRegForm();
    await elementsPO.submitButton();

    await elementsPO.fillSearchBox();
    await elementsPO.verifyTableByFilter();
});

test.afterAll(async () => {
    await browser.close();
});
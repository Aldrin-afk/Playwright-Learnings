import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { WebTablesPO } from "../../PageObjects/webTablesPO";

let page: Page;
let browser: Browser, context: any;
let webTablesPO: WebTablesPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    webTablesPO = new WebTablesPO(page);
});

test("Verification of Web Tables DEMOQA", async () => {
    await webTablesPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await webTablesPO.clickWebTableBtn();

    await page.locator(`span#edit-record-2`).click();
    const fName = await page.locator(`label[id="firstName-label"]`).textContent();
    expect(fName).toBe('First Name');
    await page.locator(`input[id="firstName"]`).fill(`Francis`);
    await webTablesPO.submitButton();
    const editedRow = await page.locator(`div.rt-tbody`).allTextContents();
    expect(editedRow.toString()).not.toContain(`AldenCantrell45alden@example.com12000Compliance`);
    expect(editedRow.toString()).toContain("CierraVega39cierra@example.com10000Insurance FrancisCantrell45alden@example.com12000Compliance KierraGentry29kierra@example.com2000Legal");

    await page.locator(`span#delete-record-3`).click();
    const rowBody = await page.locator(`div.rt-tbody`).allTextContents();
    expect(rowBody).not.toContain(`KierraGentry29kierra@example.com2000Legal`);

    await webTablesPO.clickAddRecordBtn();
    await webTablesPO.fillRegForm(Constants.TestData.Fname, Constants.TestData.Lname, Constants.TestData.Email, Constants.TestData.age, Constants.TestData.salary, Constants.TestData.department);
    await webTablesPO.submitButton();

    await webTablesPO.fillSearchBox(Constants.TestData.Fname);
    await webTablesPO.verifyTableByFilter(Constants.TestData.verifyTable);
});

test.afterAll(async () => {
    await browser.close();
});
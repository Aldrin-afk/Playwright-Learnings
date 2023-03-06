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

test("Verification of Accordian DEMOQA", async () => {
    await browserPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await page.getByText('Widgets').click();
    await page.getByText('Accordian').click();

    // Click on the first section to expand it
    const header1 = await page.locator(`div#section1Heading`).textContent();
    expect(header1).toBe(`What is Lorem Ipsum?`);
    await page.click('div#section1Heading');

    // Get the text content of the first section's body
    const section1BodyText: string = await page.textContent('div#section1Content');
    console.log(`Section 1 body text: ${section1BodyText}`);

    // Click on the second section to expand it
    const header2 = await page.locator(`div#section2Heading`).textContent();
    expect(header2).toBe(`Where does it come from?`);
    await page.click('div#section2Heading');

    // Get the text content of the second section's body
    const section2BodyText: string = await page.textContent('div#section2Content');
    console.log(`Section 2 body text: ${section2BodyText}`);

    // Click on the third section to expand it
    const header3 = await page.locator(`div#section3Heading`).textContent();
    expect(header3).toBe(`Why do we use it?`);
    await page.click('div#section2Heading');

    // Get the text content of the third section's body
    const section3BodyText: string = await page.textContent('div#section2Content');
    console.log(`Section 3 body text: ${section3BodyText}`);
});

test.afterAll(async () => {
    await browser.close();
});
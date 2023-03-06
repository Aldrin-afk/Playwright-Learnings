import { chromium, test, Page, expect, Browser } from "@playwright/test";

let page: Page;
let browser: Browser, context: any;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
});

test("Verification of Frames DEMOQA", async () => {
    await page.goto('https://demoqa.com/elements');
    await page.locator(`//div[text()='Alerts, Frame & Windows']`).click();
    await page.locator(`//span[text()='Frames']`).click();

    // Switch to first frame
    const frame1 = page.frameLocator('#frame1');
    await page.waitForLoadState('load');
    const frame1Heading = frame1.locator('h1#sampleHeading');
    console.log(await frame1Heading.innerText());
    expect(await frame1Heading.innerText()).toBe('This is a sample page');

    // Switch to second frame
    const frame2 = page.frameLocator('#frame2');
    await page.waitForLoadState('load');
    const frame2Heading = frame2.locator('h1#sampleHeading');
    console.log(await frame2Heading.innerText());
    expect(await frame2Heading.innerText()).toBe('This is a sample page');
});

test.afterAll(async () => {
    await browser.close();
});
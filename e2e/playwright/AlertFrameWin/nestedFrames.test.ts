import { chromium, test, Page, expect, Browser } from "@playwright/test";

let page: Page;
let browser: Browser, context: any;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
});

test("Verification of NestedFrames DEMOQA", async () => {
    await page.goto('https://demoqa.com/elements');
    await page.locator(`//div[text()='Alerts, Frame & Windows']`).click();
    await page.locator(`//span[text()='Nested Frames']`).click();

    const title = await page.locator(`//div[@id='framesWrapper']/div[1]`).textContent();
    expect(title).toBe(`Sample Nested Iframe page. There are nested iframes in this page. Use browser inspecter or firebug to check out the HTML source. In total you can switch between the parent frame and the nested child frame. `);

    // switch to the frame inside the top frame
    const frame = await page.frameLocator(`iframe#frame1`);

    // switch to the frame inside the second frame
    const nestedFrame = await frame.frameLocator(`//p[text()='Child Iframe']`);

    console.log(nestedFrame);
    console.log(title);
});

test.afterAll(async () => {
    await browser.close();
});
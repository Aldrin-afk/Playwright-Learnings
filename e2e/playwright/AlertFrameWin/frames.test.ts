import { chromium, expect, test, Page, Browser } from "@playwright/test";
import { Support } from "../../common/constants";
import { AlertsFramesWindowsPO } from "../../PageObjects/alertsFramesWindowsPO";

let page: Page;
let pages, browser, context: any;
let alertsPO: AlertsFramesWindowsPO;
let support: Support;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    alertsPO = new AlertsFramesWindowsPO(page);
    support = new Support();
});

test("Verification of Frames DEMOQA", async () => {
    await page.goto('https://demoqa.com/elements');
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByText('Frames', { exact: true }).click();
    let firstFrame = await page.frameLocator(`#frame1`).locator(`h1#sampleHeading`).textContent();
    console.log(firstFrame);
    let secondFrame = await page.frameLocator(`#frame1`).locator(`h1#sampleHeading`).textContent();
    console.log(secondFrame);
});
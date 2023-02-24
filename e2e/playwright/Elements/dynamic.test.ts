import { chromium, expect, test, Page } from "@playwright/test";
import { AlertsFramesWindowsPO } from "../../PageObjects/alertsFramesWindowsPO";

let page: Page;
let browser, context: any;
let alertsPO: AlertsFramesWindowsPO;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    alertsPO = new AlertsFramesWindowsPO(page);
});

test("Verification of Dynamic Properties DEMOQA", async () => {

    await page.goto('https://demoqa.com/dynamic-properties');
    await page.waitForLoadState('load');

    const firstButtonDisabled = await page.$('button#enableAfter');
    const isDisabled = await firstButtonDisabled?.isDisabled();
    expect(isDisabled).toBeTruthy();
    console.log('The button is Disabled!');

    const button = await page.$(`button#colorChange`);
    const currentColor = await button?.evaluate((el) => getComputedStyle(el).color);
    console.log(currentColor);

    const thirdButtonNotVisible = await page.$('button#visibleAfter');
    const isNotVisible = await thirdButtonNotVisible?.isHidden();
    expect(isNotVisible).toBeUndefined();
    console.log('The button is Hidden!');

    await page.waitForTimeout(5000);
    const firstButtonEnabled = await page.$('button#enableAfter');
    const isEnabled = await firstButtonEnabled?.isEnabled();
    expect(isEnabled).toBeTruthy();
    console.log('The button is Enabled!');

    const updatedColor = await button?.evaluate((el) => getComputedStyle(el).color);
    console.log(updatedColor);
    expect(updatedColor).not.toEqual(currentColor);

    const thirdButtonVisible = await page.$('button#visibleAfter');
    const isVisible = await thirdButtonVisible?.isEnabled();
    expect(isVisible).toBeTruthy();
    console.log('The button is Visible!');
});

test.afterAll(async () => {
    await browser.close();
});
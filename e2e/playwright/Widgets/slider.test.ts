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

test("Verification of Slider DEMOQA", async () => {
    await browserPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await page.getByText('Widgets').click();
    await page.getByText('Slider').click();

    // the value corresponding to the 100% of the slider
    const maxValue = 100;
    // drag-and-drop target value in percentage
    const targetValue = 0.6; // 60%

    const sliderHandle = page.locator("span.range-slider__wrap");
    const slider = page.locator("input[type='range']");
    const sliderBoundingBox = await slider.boundingBox();

    // performing the drag-and-drop interaction
    await sliderHandle.dragTo(sliderHandle, {
        force: true,
        targetPosition: {
            // moving the slider to the target value in %
            x: sliderBoundingBox.width * targetValue,
            y: 0,
        },
    });

    // retrieving the input HTML element
    const input = page.locator("input#sliderValue");
    const value = await input.getAttribute("value");

    // calculating the expected value
    const expectedValue = `${maxValue * targetValue}`;
    console.log('Slider Value ->', expectedValue);
    expect(value).toEqual(expectedValue);
});

test.afterAll(async () => {
    await browser.close();
});
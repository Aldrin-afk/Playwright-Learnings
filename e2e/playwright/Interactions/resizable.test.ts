import { chromium, test, Page, Browser } from "@playwright/test";

let page: Page;
let browser: Browser, context: any;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
});

test("Verification of Selectable DEMOQA", async () => {

    // Navigate to the resizable demo page
    await page.goto('https://demoqa.com/resizable');

    const resizableHandle = await page.locator('#resizableBoxWithRestriction span.react-resizable-handle').first();
    const resizableBox = await page.locator('#resizableBoxWithRestriction').first();

    const boxInitialSize = await resizableBox.boundingBox();

    await resizableHandle?.hover();

    // performing the drag-and-drop interaction
    await resizableHandle.dragTo(resizableHandle, {
        force: true,
        targetPosition: {
            // moving the slider to the target value in %
            x: boxInitialSize.width * 50,
            y: 20,
        }
    });

    const boxNewSize = await resizableBox.boundingBox();

    console.log(`Resizable box initial size: ${JSON.stringify(boxInitialSize)}`);
    console.log(`Resizable box new size: ${JSON.stringify(boxNewSize)}`);

    await page.waitForTimeout(3000);

    /////////////////////////////////////////////////////////////////////////////
    page.keyboard.down('PageDown');

    const resizableHandleNoLimit = await page.locator('div#resizable span.react-resizable-handle').first();
    const resizableBoxNoLimit = await page.locator('div#resizable span.react-resizable-handle').first();

    const boxInitialSizeNoLimit = await resizableBoxNoLimit.boundingBox();

    await resizableHandleNoLimit?.hover();

    // performing the drag-and-drop interaction
    await resizableBoxNoLimit.dragTo(resizableBoxNoLimit, {
        force: true,
        targetPosition: {
            // moving the slider to the target value in %
            x: boxInitialSizeNoLimit.width * 100,
            y: 50,
        }
    });

    const boxNewSizeNoLimit = await resizableBoxNoLimit.boundingBox();

    console.log(`Resizable box initial size NoLimit: ${JSON.stringify(boxInitialSizeNoLimit)}`);
    console.log(`Resizable box new size NoLimit: ${JSON.stringify(boxNewSizeNoLimit)}`);

    await page.waitForTimeout(8000);
});

test.afterAll(async () => {
    await browser.close();
});

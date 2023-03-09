import { chromium, test, Page, Browser } from "@playwright/test";

let page: Page;
let browser: Browser, context: any;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
});

test("Verification of Selectable DEMOQA", async () => {
    await page.goto('https://demoqa.com/selectable');

    await page.locator(`a#demo-tab-list`).click();

    // Wait for the Selectable section to be visible
    await page.waitForSelector('ul#verticalListContainer');

    // Select items 1, 3, and 4
    const itemsToSelect = [1, 3, 4];
    for (const itemNumber of itemsToSelect) {
        const itemSelector = `ul#verticalListContainer li:nth-child(${itemNumber})`;
        await page.click(itemSelector);
    }

    // Verify that the selected items have the 'active' class
    for (const itemNumber of itemsToSelect) {
        const itemSelector = `ul#verticalListContainer li:nth-child(${itemNumber})`;
        const isSelected = await page.$eval(itemSelector, el => el.classList.contains('active'));
        console.log(`List Item ${itemNumber} is selected: ${isSelected}`);
        const selectedText = await page.locator(itemSelector).textContent();
        console.log(`Selected List Items Text: ${selectedText}`)
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    await page.locator(`a#demo-tab-grid`).click();

    // Wait for the Selectable section to be visible
    await page.waitForSelector('#gridContainer');

    // Select items 1, 3
    const gridTtemsToSelect = [1, 3];
    const rowToSelect = [3];
    for (const itemNumber of gridTtemsToSelect) {
        const itemSelector = `#gridContainer div#row${rowToSelect} li:nth-child(${itemNumber})`;
        await page.click(itemSelector);
    }

    // Verify that the selected items have the 'active' class
    for (const itemNumber of gridTtemsToSelect) {
        const itemSelector = `#gridContainer div#row${rowToSelect} li:nth-child(${itemNumber})`;
        const isSelected = await page.$eval(itemSelector, el => el.classList.contains('active'));
        console.log(`Grid Item ${itemNumber} is selected: ${isSelected}`);
        const selectedText = await page.locator(itemSelector).textContent();
        console.log(`Selected Grid Items Text: ${selectedText}`)
    }
});

test.afterAll(async () => {
    await browser.close();
});

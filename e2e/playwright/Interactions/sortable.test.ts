import { chromium, test, Page, Browser } from "@playwright/test";

let page: Page;
let browser: Browser, context: any;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
});

test("Verification of Sortable DEMOQA", async () => {
    
    // Navigate to the sortable page
    await page.goto('https://demoqa.com/sortable');

    await page.locator(`a#demo-tab-list`).click();

    // Drag and drop the first item to the last position    
    const from = await page.$(`(//div[@class='list-group-item list-group-item-action'])[3]`);
    const to = await page.$(`(//div[@class='list-group-item list-group-item-action'])[6]`);

    const oneBoundingBox = await from?.boundingBox()
    const twoBoundingBox = await to?.boundingBox()

    // Verify the order of the items[LIST]
    const itemsBefore = await page.$$('div#demo-tabpane-list div.vertical-list-container.mt-4');
    for (let i = 0; i < itemsBefore.length; i++) {
        const itemText = await itemsBefore[i].innerText();
        console.log(`Before Sorting : ${itemText}`);
    }

    if (oneBoundingBox && twoBoundingBox) {
        await page.mouse.move(
            oneBoundingBox.x + oneBoundingBox.width / 2,
            oneBoundingBox.y + oneBoundingBox.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            twoBoundingBox.x + twoBoundingBox.width / 2,
            twoBoundingBox.y + twoBoundingBox.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    await page.waitForLoadState('load');
    await page.waitForTimeout(3000);

    // Verify the order of the items[LIST]
    const itemsAfter = await page.$$('div#demo-tabpane-list div.vertical-list-container.mt-4');
    for (let i = 0; i < itemsAfter.length; i++) {
        const itemText = await itemsAfter[i].innerText();
        console.log(`After Sorting : ${itemText}`);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    await page.locator(`a#demo-tab-grid`).click();

    // Drag and drop the first item to the last position    
    const fromGrid = await page.$(`//div[@class='create-grid']//div[3]`);
    const toGrid = await page.$(`//div[@class='create-grid']//div[7]`);

    const oneBoundingBoxGrid = await fromGrid?.boundingBox()
    const twoBoundingBoxGrid = await toGrid?.boundingBox()

    // Verify the order of the items[GRID]
    const itemsBeforeGrid = await page.$$('div#demo-tabpane-grid div.create-grid');
    for (let i = 0; i < itemsBeforeGrid.length; i++) {
        const itemText = await itemsBeforeGrid[i].innerText();
        console.log(`Before Sorting Grid : ${itemText}`);
    }

    if (oneBoundingBoxGrid && twoBoundingBoxGrid) {
        await page.mouse.move(
            oneBoundingBoxGrid.x + oneBoundingBoxGrid.width / 2,
            oneBoundingBoxGrid.y + oneBoundingBoxGrid.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            twoBoundingBoxGrid.x + twoBoundingBoxGrid.width / 2,
            twoBoundingBoxGrid.y + twoBoundingBoxGrid.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    await page.waitForLoadState('load');
    await page.waitForTimeout(3000);

    // Verify the order of the items[GRID]
    const itemsAfterGrid = await page.$$('div#demo-tabpane-grid div.create-grid');
    for (let i = 0; i < itemsAfterGrid.length; i++) {
        const itemText = await itemsAfterGrid[i].innerText();
        console.log(`After Sorting Grid : ${itemText}`);
    }
});

test.afterAll(async () => {
    await browser.close();
});
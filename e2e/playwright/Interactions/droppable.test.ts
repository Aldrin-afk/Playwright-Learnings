import { chromium, test, Page, Browser } from "@playwright/test";

let page: Page;
let browser: Browser, context: any;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
});

test("Verification of Selectable - Simple DEMOQA", async () => {
    await page.goto('https://demoqa.com/droppable');

    await page.locator(`a#droppableExample-tab-simple`).click();
    // Wait for the page to load and the draggable and droppable elements to be available
    await Promise.all([
        page.waitForSelector(`div#simpleDropContainer`),
        page.waitForSelector('#draggable'),
        page.waitForSelector('#droppable')
    ]);

    // Get the draggable and droppable elements
    const draggable = await page.$('#draggable');
    const droppable = await page.$('#droppable');

    // Get the initial position of the droppable element
    const draggableRect = await draggable.boundingBox();
    const droppableRect = await droppable.boundingBox();

    const initialDraggableX = draggableRect?.x || 0;
    const initialDraggableY = draggableRect?.y || 0;

    // Drag the draggable element to the droppable element
    // await draggable?.dragAndDrop('#droppable');
    if (draggableRect && droppableRect) {
        await page.mouse.move(
            draggableRect.x + draggableRect.width / 2,
            draggableRect.y + draggableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            droppableRect.x + droppableRect.width / 2,
            droppableRect.y + droppableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    // Get the final position of the droppable element
    const finalDraggableRect = await draggable.boundingBox();
    const finalDraggableX = finalDraggableRect?.x || 0;
    const finalDraggableY = finalDraggableRect?.y || 0;

    // Verify that the droppable element has moved
    if (finalDraggableX === initialDraggableX && finalDraggableY === initialDraggableY) {
        console.error('The draggable element did not move.');
    } else {
        console.log('The draggable element moved successfully.');
    }
});

test("Verification of Selectable - Accept DEMOQA", async () => {
    await page.goto('https://demoqa.com/droppable');

    await page.locator(`a#droppableExample-tab-accept`).click();
    // Wait for the page to load and the draggable and droppable elements to be available
    await Promise.all([
        page.waitForSelector(`div#acceptDropContainer`),
        page.waitForSelector('div#acceptable'),
        page.waitForSelector('div#notAcceptable')
    ]);

    // Get the draggable and droppable elements
    const acceptable = await page.$('div#acceptable');
    const notAcceptable = await page.$('div#notAcceptable');
    const droppable = await page.$(`(//div[@class='drop-box ui-droppable'])[2]`);

    // Get the initial position of the droppable element
    const acceptableRect = await acceptable.boundingBox();
    const notAcceptableRect = await notAcceptable.boundingBox();
    const droppableRect = await droppable.boundingBox();

    const initialacceptableX = acceptableRect?.x || 0;
    const initialacceptableY = acceptableRect?.y || 0;

    const initialnotAcceptableX = notAcceptableRect?.x || 0;
    const initialnotAcceptableY = notAcceptableRect?.y || 0;

    // Drag the draggable element to the droppable element
    if (acceptableRect && droppableRect) {
        await page.mouse.move(
            acceptableRect.x + acceptableRect.width / 2,
            acceptableRect.y + acceptableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            droppableRect.x + droppableRect.width / 2,
            droppableRect.y + droppableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    if (notAcceptableRect && droppableRect) {
        await page.mouse.move(
            notAcceptableRect.x + notAcceptableRect.width / 2,
            notAcceptableRect.y + notAcceptableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            droppableRect.x + droppableRect.width / 2,
            droppableRect.y + droppableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    // Get the final position of the droppable element
    const finalAcceptableRect = await acceptable.boundingBox();
    const finalAcceptableX = finalAcceptableRect?.x || 0;
    const finalAcceptableY = finalAcceptableRect?.y || 0;

    // Verify that the droppable element has moved
    if (finalAcceptableX === initialacceptableX && finalAcceptableY === initialacceptableY) {
        console.error('The acceptable element did not move.');
    } else {
        console.log('The acceptable element moved successfully.');
    }

    // Get the final position of the droppable element
    const finalnotAcceptableRect = await notAcceptable.boundingBox();
    const finalnotAcceptableX = finalnotAcceptableRect?.x || 0;
    const finalnotAcceptableY = finalnotAcceptableRect?.y || 0;

    // Verify that the droppable element has moved
    if (finalnotAcceptableX === initialnotAcceptableX && finalnotAcceptableY === initialnotAcceptableY) {
        console.error('The notAcceptable element did not move.');
    } else {
        console.log('The notAcceptable element moved successfully.');
    }
});

test("Verification of Selectable - Prevent Propogation DEMOQA", async () => {
    await page.goto('https://demoqa.com/droppable');

    await page.locator(`a#droppableExample-tab-preventPropogation`).click();
    // Wait for the page to load and the draggable and droppable elements to be available
    await Promise.all([
        page.waitForSelector(`div#ppDropContainer`),
        page.waitForSelector('div#notGreedyDropBox'),
        page.waitForSelector('div#notGreedyInnerDropBox'),
        page.waitForSelector('div#greedyDropBox'),
        page.waitForSelector('div#greedyDropBoxInner')
    ]);

    // Get the draggable and droppable elements
    const notGreedyDropBox = await page.$('div#notGreedyDropBox');
    const notGreedyInnerDropBox = await page.$('div#notGreedyInnerDropBox');
    const greedyDropBox = await page.$('div#greedyDropBox');
    const greedyDropBoxInner = await page.$('div#greedyDropBoxInner');
    const draggable = await page.$('div#dragBox');

    // Get the initial position of the droppable element
    const notGreedyDropBoxRect = await notGreedyDropBox.boundingBox();
    const notGreedyInnerDropBoxRect = await notGreedyInnerDropBox.boundingBox();
    const greedyDropBoxRect = await greedyDropBox.boundingBox();
    const greedyDropBoxInnerRect = await greedyDropBoxInner.boundingBox();
    const draggableRect = await draggable.boundingBox();

    const initialnotGreedyDropBoxX = notGreedyDropBoxRect?.x || 0;
    const initialnotGreedyDropBoxY = notGreedyDropBoxRect?.y || 0;

    const initialNotGreedyInnerDropBoxX = notGreedyInnerDropBoxRect?.x || 0;
    const initialNotGreedyInnerDropBoxY = notGreedyInnerDropBoxRect?.y || 0;

    const initialGreedyDropBoxX = greedyDropBoxRect?.x || 0;
    const initialGreedyDropBoxY = greedyDropBoxRect?.y || 0;

    const initialGreedyDropBoxInnerX = greedyDropBoxInnerRect?.x || 0;
    const initialGreedyDropBoxInnerY = greedyDropBoxInnerRect?.y || 0;


    // Drag the draggable element to the droppable element
    if (notGreedyDropBoxRect && draggableRect) {
        await page.mouse.move(
            draggableRect.x + draggableRect.width / 2,
            draggableRect.y + draggableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            notGreedyDropBoxRect.x + notGreedyDropBoxRect.width / 2,
            notGreedyDropBoxRect.y + notGreedyDropBoxRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    await page.waitForTimeout(2000);

    if (notGreedyInnerDropBoxRect && draggableRect) {
        await page.mouse.move(
            draggableRect.x + draggableRect.width / 2,
            draggableRect.y + draggableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            notGreedyInnerDropBoxRect.x + notGreedyInnerDropBoxRect.width / 2,
            notGreedyInnerDropBoxRect.y + notGreedyInnerDropBoxRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    await page.waitForTimeout(2000);

    if (greedyDropBoxRect && draggableRect) {
        await page.mouse.move(
            draggableRect.x + draggableRect.width / 2,
            draggableRect.y + draggableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            greedyDropBoxRect.x + greedyDropBoxRect.width / 2,
            greedyDropBoxRect.y + greedyDropBoxRect.width / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    await page.waitForTimeout(2000);

    if (greedyDropBoxInnerRect && draggableRect) {
        await page.mouse.move(
            draggableRect.x + draggableRect.width / 2,
            draggableRect.y + draggableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            greedyDropBoxInnerRect.x + greedyDropBoxInnerRect.width / 2,
            greedyDropBoxInnerRect.y + greedyDropBoxInnerRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    // Get the final position of the droppable element
    const finalNotGreedyDropBoxRect = await draggable.boundingBox();
    const finalNotGreedyDropBoxX = finalNotGreedyDropBoxRect?.x || 0;
    const finalNotGreedyDropBoxY = finalNotGreedyDropBoxRect?.y || 0;

    // Verify that the droppable element has moved
    if (finalNotGreedyDropBoxX === initialnotGreedyDropBoxX && finalNotGreedyDropBoxY === initialnotGreedyDropBoxY) {
        console.error('The notGreedyDropBox element did not move.');
    } else {
        console.log('The notGreedyDropBox element moved successfully.');
    }

    // Get the final position of the droppable element
    const finalNotGreedyInnerDropBoxRect = await draggable.boundingBox();
    const finalNotGreedyInnerDropBoxX = finalNotGreedyInnerDropBoxRect?.x || 0;
    const finalNotGreedyInnerDropBoxY = finalNotGreedyInnerDropBoxRect?.y || 0;

    // Verify that the droppable element has moved
    if (finalNotGreedyInnerDropBoxX === initialNotGreedyInnerDropBoxX && finalNotGreedyInnerDropBoxY === initialNotGreedyInnerDropBoxY) {
        console.error('The notGreedyInnerDropBox element did not move.');
    } else {
        console.log('The notGreedyInnerDropBox element moved successfully.');
    }

    // Get the final position of the droppable element
    const finalgreedyDropBoxRect = await draggable.boundingBox();
    const finalgreedyDropBoxX = finalgreedyDropBoxRect?.x || 0;
    const finalgreedyDropBoxY = finalgreedyDropBoxRect?.y || 0;

    // Verify that the droppable element has moved
    if (finalgreedyDropBoxX === initialGreedyDropBoxX && finalgreedyDropBoxY === initialGreedyDropBoxY) {
        console.error('The greedyDropBox element did not move.');
    } else {
        console.log('The greedyDropBox element moved successfully.');
    }
    // Get the final position of the droppable element
    const finalgreedyDropBoxInnerRect = await draggable.boundingBox();
    const finalgreedyDropBoxInnerX = finalgreedyDropBoxInnerRect?.x || 0;
    const finalgreedyDropBoxInnerY = finalgreedyDropBoxInnerRect?.y || 0;

    // Verify that the droppable element has moved
    if (finalgreedyDropBoxInnerX === initialGreedyDropBoxInnerX && finalgreedyDropBoxInnerY === initialGreedyDropBoxInnerY) {
        console.error('The greedyDropBoxInner element did not move.');
    } else {
        console.log('The greedyDropBoxInner element moved successfully.');
    }
});

test("Verification of Selectable - Revert Draggable DEMOQA", async () => {
    await page.goto('https://demoqa.com/droppable');

    await page.locator(`a#droppableExample-tab-revertable`).click();
    // Wait for the page to load and the draggable and droppable elements to be available
    await Promise.all([
        page.waitForSelector(`div#revertableDropContainer`),
        page.waitForSelector('div#revertable'),
        page.waitForSelector('div#notRevertable'),
        page.waitForSelector(`(//div[@id='droppable'])[3]`)
    ]);

    // Get the draggable and droppable elements
    const revertable = await page.$('div#revertable');
    const notRevertable = await page.$('div#notRevertable');
    const droppable = await page.$(`(//div[@id='droppable'])[3]`);

    // Get the initial position of the droppable element
    const revertableRect = await revertable.boundingBox();
    const notRevertableRect = await notRevertable.boundingBox();
    const droppableRect = await droppable.boundingBox();

    const initialrevertableRectX = revertableRect?.x || 0;
    const initialrevertableRectY = revertableRect?.y || 0;

    const initialnotRevertableRectX = notRevertableRect?.x || 0;
    const initialnotRevertableRectY = notRevertableRect?.y || 0;

    // Drag the draggable element to the droppable element
    if (revertableRect && droppableRect) {
        await page.mouse.move(
            revertableRect.x + revertableRect.width / 2,
            revertableRect.y + revertableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            droppableRect.x + droppableRect.width / 2,
            droppableRect.y + droppableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    if (notRevertableRect && droppableRect) {
        await page.mouse.move(
            notRevertableRect.x + notRevertableRect.width / 2,
            notRevertableRect.y + notRevertableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            droppableRect.x + droppableRect.width / 2,
            droppableRect.y + droppableRect.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    // Get the final position of the droppable element
    const finalRevertableRect = await revertable.boundingBox();
    const finalRevertableX = finalRevertableRect?.x || 0;
    const finalRevertableY = finalRevertableRect?.y || 0;

    // Verify that the droppable element has moved
    if (finalRevertableX === initialrevertableRectX && finalRevertableY === initialrevertableRectY) {
        console.error('The revertable element did not move.');
    } else {
        console.log('The revertable element moved successfully.');
    }

    // Get the final position of the droppable element
    const finalNotRevertableRect = await notRevertable.boundingBox();
    const finalNotRevertableX = finalNotRevertableRect?.x || 0;
    const finalNotRevertableY = finalNotRevertableRect?.y || 0;

    // Verify that the droppable element has moved
    if (finalNotRevertableX === initialnotRevertableRectX && finalNotRevertableY === initialnotRevertableRectY) {
        console.error('The notRevertable element did not move.');
    } else {
        console.log('The notRevertable element moved successfully.');
    }
});

test.afterAll(async () => {
    await browser.close();
});
import { chromium, test, Page, Browser } from "@playwright/test";

let page: Page;
let browser: Browser, context: any;

test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
});

test("Verification of Draggable - Simple DEMOQA", async () => {
    await page.goto('https://demoqa.com/dragabble');

    await page.locator(`a#draggableExample-tab-simple`).click();

    const draggableElement = await page.waitForSelector('div#dragBox');
    const droppableElement = await page.waitForSelector('div.dragable-container');

    // Get the initial position of the draggable element
    const initialPosition = await draggableElement.boundingBox();
    const finalPosition = await droppableElement.boundingBox();

    // Drag the element to a new position
    if (initialPosition && finalPosition) {
        await page.mouse.move(
            initialPosition.x + initialPosition.width / 2,
            initialPosition.y + initialPosition.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            finalPosition.x = 300 + finalPosition.width / 2,
            finalPosition.y = 400 + finalPosition.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    // Get the new position of the draggable element
    const newPosition = await draggableElement.boundingBox();

    console.log(`Element was moved from (${initialPosition?.x},${initialPosition?.y}) to (${newPosition?.x},${newPosition?.y})`);
});

test("Verification of Draggable - Axis Restricted DEMOQA", async () => {
    await page.goto('https://demoqa.com/dragabble');

    await page.locator(`a#draggableExample-tab-axisRestriction`).click();

    const draggableElementX = await page.waitForSelector('div#restrictedX');
    const draggableElementY = await page.waitForSelector('div#restrictedY');
    const droppableElement = await page.waitForSelector('div.dragable-container');

    // Get the initial position of the draggable element
    const initialPositionX = await draggableElementX.boundingBox();
    const initialPositionY = await draggableElementY.boundingBox();
    const finalPosition = await droppableElement.boundingBox();

    // Drag the element to a new position
    if (initialPositionX && finalPosition) {
        await page.mouse.move(
            initialPositionX.x + initialPositionX.width / 2,
            initialPositionX.y + initialPositionX.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            finalPosition.x = 600 + finalPosition.width / 2,
            finalPosition.y + finalPosition.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }
    
    if (initialPositionY && finalPosition) {
        await page.mouse.move(
            initialPositionY.x + initialPositionY.width / 2,
            initialPositionY.y + initialPositionY.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            finalPosition.x + finalPosition.width / 2,
            finalPosition.y = 600 + finalPosition.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    // Get the new position of the draggable element
    const newPositionX = await draggableElementX.boundingBox();
    const newPositionY = await draggableElementY.boundingBox();

    console.log(`Element X and Y was moved from (${initialPositionX?.x},${initialPositionY?.y}) to (${newPositionX?.x},${newPositionY?.y})`);
});

test("Verification of Draggable - Container Restricted DEMOQA", async () => {
    await page.goto('https://demoqa.com/dragabble');

    await page.locator(`a#draggableExample-tab-containerRestriction`).click();

    const draggableTextBox = await page.waitForSelector('div#containmentWrapper>div');
    const draggableTextParent = await page.waitForSelector('span.ui-widget-header.ui-draggable');
    const droppableElement = await page.waitForSelector('div#draggableExample-tabpane-containerRestriction');
    const droppableElement2 = await page.waitForSelector('div.draggable.ui-widget-content.m-3');

    // Get the initial position of the draggable element
    const initialTextBoxPosition = await draggableTextBox.boundingBox();
    const initialTextParentPosition = await draggableTextParent.boundingBox();
    const finalPosition = await droppableElement.boundingBox();
    const finalPosition2 = await droppableElement2.boundingBox();

    // Drag the element to a new position
    if (initialTextBoxPosition && finalPosition) {
        await page.mouse.move(
            initialTextBoxPosition.x + initialTextBoxPosition.width / 2,
            initialTextBoxPosition.y + initialTextBoxPosition.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            finalPosition.x = 600 + finalPosition.width / 2,
            finalPosition.y + finalPosition.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    if (initialTextParentPosition && finalPosition2) {
        await page.mouse.move(
            initialTextParentPosition.x + initialTextParentPosition.width / 2,
            initialTextParentPosition.y + initialTextParentPosition.height / 2,
            { steps: 5 }
        )
        await page.mouse.down()
        await page.mouse.move(
            finalPosition2.x = 10 + finalPosition2.width / 2,
            finalPosition2.y = 30 + finalPosition2.height / 2,
            { steps: 5 }
        )
        await page.mouse.up()
    }

    // Get the new position of the draggable element
    const newPositionTextBox = await draggableTextBox.boundingBox();
    const newPositionTextParent = await draggableTextParent.boundingBox();

    console.log(`Element TextBox and TextParent was moved from (${initialTextBoxPosition?.x},${initialTextParentPosition?.y}) to (${newPositionTextBox?.x},${newPositionTextParent?.y})`);
});

test.afterAll(async () => {
    await browser.close();
});

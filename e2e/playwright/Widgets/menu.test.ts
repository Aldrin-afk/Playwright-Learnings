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

test("Verification of Menu DEMOQA", async () => {
    await browserPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await page.getByText('Widgets').click();
    await page.locator(`//span[text()='Menu']`).click();
    const menuItem = 'Main Item 2';
    const subItem = "SUB SUB LIST »";
    const subSubItem = "Sub Sub Item 1";

    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Find the menu item
    const menuButton = await page.$(`//ul[@id='nav']//a[text()='${menuItem}']`);

    // Click the menu item
    await menuButton.click();

    // Verify the page title
    const headerTitle = await page.innerText(`//ul[@id='nav']//a[text()='${menuItem}']`);
    expect(headerTitle).toContain(menuItem);

    await page.locator(`//ul[@id='nav']//a[text()='${subItem}']`).click();
    await page.locator(`//ul[@id='nav']//a[text()='${subItem}']`).textContent();
    expect(subItem).toContain(`${subItem}`);

    await page.locator(`//ul[@id='nav']//a[text()='${subSubItem}']`).click();
    await page.locator(`//ul[@id='nav']//a[text()='${subSubItem}']`).textContent();
    expect(subSubItem).toContain(`${subSubItem}`);
});

test.afterAll(async () => {
    await browser.close();
});
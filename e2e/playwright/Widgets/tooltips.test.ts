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
    await page.setViewportSize({ width: 2048, height: 1536 });
    browserPO = new browserWindowsPO(page);
});

test("Verification of ToolTips DEMOQA", async () => {
    await browserPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await page.getByText('Widgets').click();
    await page.getByText('Tool Tips').click();

    const button = await page.waitForSelector('button#toolTipButton');
    await button?.hover();
    await page.waitForTimeout(2000);
    const tooltip = await page.waitForSelector('div.tooltip-inner');
    const tooltipText = await tooltip.textContent();
    console.log('Tooltip text :', tooltipText);
    expect(await tooltip?.isVisible()).toBeTruthy();

    const input = await page.waitForSelector('input#toolTipTextField');
    await input?.hover();
    await page.waitForTimeout(2000);
    const tooltipinput = await page.waitForSelector('div.tooltip-inner');
    const inputTooltipText = await tooltipinput.textContent();
    console.log('Tooltip text :', inputTooltipText);
    expect(await tooltipinput?.isVisible()).toBeTruthy();

    const text = await page.waitForSelector(`//a[contains(text(),'Contrary')]`);
    await text?.hover();
    await page.waitForTimeout(2000);
    const toolTipText = await page.waitForSelector('div.tooltip-inner');
    const inputToolTipText = await toolTipText.textContent();
    console.log('Tooltip text :', inputToolTipText);
    expect(await toolTipText?.isVisible()).toBeTruthy();

    const text2 = await page.waitForSelector(`//a[contains(text(),'1.10.32')]`);
    await text2?.hover();
    await page.waitForTimeout(2000);
    const toolTipText2 = await page.waitForSelector('div.tooltip-inner');
    const inputToolTipText2 = await toolTipText2.textContent();
    console.log('Tooltip text :', inputToolTipText2);
    expect(await toolTipText2?.isVisible()).toBeTruthy();
});

test.afterAll(async () => {
    await browser.close();
});
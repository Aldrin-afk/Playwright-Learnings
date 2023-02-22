import { chromium, expect, test, Page } from "@playwright/test";
import Constants from '../../common/constants.json';
import { ElementsPO } from "../../PageObjects/elementsPO";

let page: Page;
let browser, context: any;
let elementsPO: ElementsPO;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  elementsPO = new ElementsPO(page);
});

test("Verification of BrokenImage and Links DEMOQA", async () => {
  test.slow();

  await elementsPO.baseURL();
  await expect(page).toHaveURL(Constants.webSiteURL);
  page.keyboard.down('PageDown');
  await elementsPO.clickBrokenLinksImageBtn();

  const validImage = await page.$(`//p[text()='Valid image']/following-sibling::img`);
  expect(validImage).not.toBeNull(); // check that the image element exists
  expect(await validImage?.evaluate((vimg) => (vimg as HTMLImageElement).complete)).toBeTruthy(); // check if the image has loaded successfully
  expect(await validImage?.getAttribute('src')).not.toBeNull(); // check that the image has a valid 'src' attribute

  const brokenImage = await page.$(`(//p[text()='Valid image']/following-sibling::img)[2]`);
  expect(brokenImage).not.toBeNull(); // check that the image element exists
  expect(await brokenImage?.evaluate((bimg) => (bimg as HTMLImageElement).complete)).not.toBeTruthy(); // check if the image has loaded successfully
  expect(await brokenImage?.getAttribute('src')).not.toBeNull(); // check that the image has a valid 'src' attribute

  await elementsPO.baseURL();
  await expect(page).toHaveURL(Constants.webSiteURL);
  page.keyboard.down('PageDown');
  await elementsPO.clickBrokenLinksImageBtn();
  let vlink = await elementsPO.validLinkHeader();
  expect(vlink).toBe('Valid Link');
  await elementsPO.clickValidLink();
  let validurl = page.url();
  expect(validurl).toBe('https://demoqa.com/');
  await page.waitForLoadState('load');
  console.log(await page.title());
  const status = await page.evaluate(() => document.readyState);
  console.log(`Page status: ${status}`);
  await page.goBack();
  let blink = await elementsPO.brokenLinkHeader();
  expect(blink).toBe('Broken Link');
  await elementsPO.clickBrokenLink();
  await page.waitForLoadState('load');
  console.log(await page.title());
  const status1 = await page.evaluate(() => document.readyState);
  console.log(`Page status: ${status1}`);
  let Linktext = await page.locator(`div.example p`).textContent();
  console.log(Linktext);
  expect(Linktext).toContain(Constants.TestData.errormsg);
});

test.afterAll(async () => {
  await browser.close();
});
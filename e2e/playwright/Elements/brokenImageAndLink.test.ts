import { chromium, expect, test, Page } from "@playwright/test";
import Constants from '../../common/constants.json';
import { BrokenImageLinkPO } from "../../PageObjects/brokenImageAndLinkPO";

let page: Page;
let browser, context: any;
let brokenImageLinkPO: BrokenImageLinkPO;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  brokenImageLinkPO = new BrokenImageLinkPO(page);
});

test("Verification of BrokenImage and Links DEMOQA", async () => {
  test.slow();

  await brokenImageLinkPO.baseURL();
  await expect(page).toHaveURL(Constants.webSiteURL);
  page.keyboard.down('PageDown');
  await brokenImageLinkPO.clickBrokenLinksImageBtn();

  const validImage = await page.$(`//p[text()='Valid image']/following-sibling::img`);
  expect(validImage).not.toBeNull(); // check that the image element exists
  expect(await validImage?.evaluate((vimg) => (vimg as HTMLImageElement).complete)).toBeTruthy(); // check if the image has loaded successfully
  expect(await validImage?.getAttribute('src')).not.toBeNull(); // check that the image has a valid 'src' attribute

  const brokenImage = await page.$(`(//p[text()='Valid image']/following-sibling::img)[2]`);
  expect(brokenImage).not.toBeNull(); // check that the image element exists
  expect(await brokenImage?.evaluate((bimg) => (bimg as HTMLImageElement).complete)).not.toBeTruthy(); // check if the image has loaded successfully
  expect(await brokenImage?.getAttribute('src')).not.toBeNull(); // check that the image has a valid 'src' attribute

  await brokenImageLinkPO.baseURL();
  await expect(page).toHaveURL(Constants.webSiteURL);
  page.keyboard.down('PageDown');
  await brokenImageLinkPO.clickBrokenLinksImageBtn();
  let vlink = await brokenImageLinkPO.validLinkHeader();
  expect(vlink).toBe('Valid Link');
  await brokenImageLinkPO.clickValidLink();
  let validurl = page.url();
  expect(validurl).toBe('https://demoqa.com/');
  await page.waitForLoadState('load');
  console.log(await page.title());
  const status = await page.evaluate(() => document.readyState);
  console.log(`Page status: ${status}`);
  await page.goBack();
  let blink = await brokenImageLinkPO.brokenLinkHeader();
  expect(blink).toBe('Broken Link');
  await brokenImageLinkPO.clickBrokenLink();
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
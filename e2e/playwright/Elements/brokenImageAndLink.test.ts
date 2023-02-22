import { chromium, expect, test, Page } from "@playwright/test";
import { Support } from "../../common/constants";
import { ElementsPO } from "../../PageObjects/elementsPO";

let page: Page;
let browser, context: any;
let elementsPO: ElementsPO;
let support: Support;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  elementsPO = new ElementsPO(page);
  support = new Support();
});

test("Verification of BrokenImage and Links DEMOQA", async () => {
  await elementsPO.baseURL();
  await expect(page).toHaveURL(support.webSiteURL);
  page.keyboard.down('PageDown');
  await elementsPO.clickBrokenLinksImageBtn();

  const validImage = await page.$(`//p[text()='Valid image']/following-sibling::img`);
  expect(validImage).not.toBeNull(); // check that the image element exists
  expect(await validImage?.evaluate((vimg) => (vimg as HTMLImageElement).complete)).toBeTruthy(); // check if the image has loaded successfully
  expect(await validImage?.getAttribute('src')).not.toBeNull(); // check that the image has a valid 'src' attribute

  const brokenImage = await page.$(`(//p[text()='Valid image']/following-sibling::img)[2]`);
  expect(brokenImage).not.toBeNull(); // check that the image element exists
  expect(await brokenImage?.evaluate((bimg) => (bimg as HTMLImageElement).complete)).toBeFalsy(); // check if the image has loaded successfully
  expect(await brokenImage?.getAttribute('src')).not.toBeNull(); // check that the image has a valid 'src' attribute

  await elementsPO.baseURL();
  await expect(page).toHaveURL(support.webSiteURL);
  page.keyboard.down('PageDown');
  await elementsPO.clickBrokenLinksImageBtn();
  let vlink = await elementsPO.validLinkHeader();
  expect(vlink).toBe('Valid Link');
  await elementsPO.clickValidLink();
  let validurl = page.url();
  expect(validurl).toBe('https://demoqa.com/');
  await page.goBack();
  let blink = await elementsPO.brokenLinkHeader();
  expect(blink).toBe('Broken Link');
  await elementsPO.clickBrokenLink();
  let Linktext = await page.locator(`div.example`).textContent();
  console.log(Linktext);
  expect(Linktext).toContain(support.errormsg);
});

test.afterAll(async () => {
  await browser.close();
});
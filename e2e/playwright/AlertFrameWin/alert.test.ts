import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { AlertsFramesWindowsPO } from "../../PageObjects/alertsFramesWindowsPO";

let page: Page;
let pages, browser, context: any;
let alertsPO: AlertsFramesWindowsPO;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  alertsPO = new AlertsFramesWindowsPO(page);
});

test("Verification of Alerts DEMOQA", async () => {

  await alertsPO.baseURL();
  await expect(page).toHaveURL(Constants.webSiteURL);
  await alertsPO.clickAlertsFrameWindowsBtn();
  await alertsPO.clickAlertsBtn();
  await page.waitForTimeout(3000);

  //////////////////
  await alertsPO.clickAlertButton();
  //////////////////
  await alertsPO.clickTimerAlertButton();
  //////////////////
  await alertsPO.clickAlertBoxButton();
  //////////////////
  await alertsPO.clickPromptButton();
});

test.afterAll(async () => {
  await browser.close();
});
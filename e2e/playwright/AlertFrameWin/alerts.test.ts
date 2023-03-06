import { chromium, expect, test, Page, Browser } from "@playwright/test";
import Constants from '../../common/constants.json';
import { alertsPO } from "../../PageObjects/AlFrWinPO's/alertsPO";

let page: Page;
let browser: Browser, context: any;
let alertsButtonPO: alertsPO;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  alertsButtonPO = new alertsPO(page);
});

test("Verification of Alerts DEMOQA", async () => {

  await alertsButtonPO.baseURL();
  await expect(page).toHaveURL(Constants.webSiteURL);
  await alertsButtonPO.clickAlertsFrameWindowsBtn();
  await alertsButtonPO.clickAlertsBtn();
  await page.waitForTimeout(3000);

  await alertsButtonPO.clickAlertButton();
  await alertsButtonPO.clickTimerAlertButton();
  await alertsButtonPO.clickAlertBoxButton();
  await alertsButtonPO.clickPromptButton();
});

test.afterAll(async () => {
  await browser.close();
});
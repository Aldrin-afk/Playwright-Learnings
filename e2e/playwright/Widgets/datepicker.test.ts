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

test("Verification of DatePicker DEMOQA", async () => {
    await browserPO.baseURL();
    await expect(page).toHaveURL(Constants.webSiteURL);
    await page.getByText('Widgets').click();
    await page.getByText('Date Picker').click();

    await page.waitForSelector('#datePickerMonthYearInput');
    const datePickerInput = await page.$('#datePickerMonthYearInput');
    await datePickerInput?.click();
    await page.waitForSelector('.react-datepicker__month-select');
    const monthSelect = await page.$('.react-datepicker__month-select');
    await page.locator('.react-datepicker__month-select').click();
    await monthSelect?.selectOption('March');
    const yearSelect = await page.$('.react-datepicker__year-select');
    await page.locator('.react-datepicker__year-select').click();
    await yearSelect?.selectOption('2024');
    const date = await page.$('div.react-datepicker__day.react-datepicker__day--014');
    await date?.click();
    await page.waitForSelector('#datePickerMonthYearInput');
    const selectedDate = await page.$eval('#datePickerMonthYearInput', (el) => el.getAttribute('value'));
    console.log(`Selected date: ${selectedDate}`);
    expect(selectedDate).toBe(`03/14/2024`);


    await page.waitForSelector('#dateAndTimePickerInput');
    const dateTimePickerInput = await page.$('#dateAndTimePickerInput');
    await dateTimePickerInput?.click();
    await page.waitForSelector('.react-datepicker__month-read-view');
    await page.locator('.react-datepicker__month-read-view').click();
    await page.getByText('May').click();
    await page.locator('.react-datepicker__year-read-view').click();
    await page.getByText('2025').click();
    await page.getByRole('option', { name: '15' }).click();
    await page.getByText('20:00').click();
    await page.waitForSelector('#dateAndTimePickerInput');
    const selectedDate2 = await page.$eval('#dateAndTimePickerInput', (el) => el.getAttribute('value'));
    console.log(`Selected date and time: ${selectedDate2}`);
    expect(selectedDate2).toBe(`May 15, 2025 8:00 PM`);
});

test.afterAll(async () => {
    await browser.close();
});

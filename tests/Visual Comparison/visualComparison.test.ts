import { test, expect } from '@playwright/test';

test.describe('Visual Comparisons', () => {
  test('Playwright Doc test', async ({ page }) => {
    await page.goto('https://playwright.dev');
    //newMethod
    await expect(page).toHaveScreenshot('venom.png');
    //oldMethod
    expect(await page.screenshot()).toMatchSnapshot('venom.png');
  });

  test('Typescript Doc test', async ({ page }) => {
    await page.goto('https://www.typescriptlang.org/');
    //newMethod
    await expect(page).toHaveScreenshot('tysclang.png');
    //oldMethod
    expect(await page.screenshot()).toMatchSnapshot('tysclang.png');
  });

  test('Visual Difference test', async ({ page }) => {
    await page.goto('https://www.typescriptlang.org/');
    //newMethod
    await expect(page).toHaveScreenshot('tysclangVC.png');
    //oldMethod
    expect(await page.screenshot()).toMatchSnapshot('tysclangVC.png');
    //acceptableAmountOfDifference
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });

  test('Visual Text Difference test', async ({ page }) => {
    await page.goto('https://www.typescriptlang.org/');
    //newMethod
    await expect(page).toHaveScreenshot('tysclangText.png');
    //oldMethod
    expect(await page.screenshot()).toMatchSnapshot('tysclangText.png');
    //verifyTheText
    expect(await page.textContent(`//div[@class=' col1']//h1[1]`)).toMatchSnapshot('header.txt');
  });
});
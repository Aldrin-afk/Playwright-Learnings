import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '..', 'env.ts') });

const config: PlaywrightTestConfig = {
  testDir: './tests',
  use: {
    actionTimeout: 30000,
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: false,
    trace: 'on',
    screenshot: "on",
    browserName: 'chromium',
    viewport: null,
    launchOptions: {
      args: ["--start-maximized"]
    }
  },
  testMatch: ["tests/*.test.ts"],
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,
  timeout: 60 * 60 * 1000,
  expect: {
    timeout: 50000
  },
  reporter: [['dot'], ['json', {
    outputFile: 'playwright-report/report.json'
  }], ['html', {
    open: 'always'
  }]]
};

export default config;
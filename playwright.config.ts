import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  use: {
    actionTimeout: 30000,
    baseURL: 'http://localhost:3000',
    headless: false,
    trace: 'on',
    screenshot: "on",
    browserName: 'chromium',
    viewport: null,
    launchOptions: {
      args: ["--start-maximized"]
    }
  },
  testMatch: ["tests/*.spec.ts"],
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,
  timeout: 60 * 60 * 1000,
  expect: {
    timeout: 50000
  },
  reporter: [['line'], ['json', {
    outputFile: 'playwright-report/report.json'
  }], ['html', {
    open: 'always'
  }]]
};

export default config;
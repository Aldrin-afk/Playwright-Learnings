import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  use: {
    baseURL: "https://demoqa.com/elements",
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    launchOptions: {
      args: ["--start-maximized"]
    }
  },
  /* Maximum time one test can run for. */
  timeout: 300 * 1000,
  workers: 1,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 50000
  },
  reporter: [['dot'], ['json', {
    outputFile: 'playwright-report/report.json'
  }], ['html', {
    open: 'on-failure'
  }]]
};

export default config;
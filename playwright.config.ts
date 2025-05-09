import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  
  testDir: './automation/tests', 
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,//process.env.CI ? 2 : 0,
  workers: 1,//process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60 * 1000, 
  expect: {
    timeout: 60000, 
  },
 
  
  use: {
    actionTimeout: 0, //  time to perform actions like click, fill, etc.
    navigationTimeout: 30 * 1000, //  time to page.goto.
    baseURL: 'https://serverest.dev', // Opcional: URL base
    headless: false,
    screenshot: 'only-on-failure', // 'on', 'off', 'only-on-failure'
    video: 'retain-on-failure', // 'on', 'off', 'retain-on-failure'
    trace: 'on-first-retry', // 'on', 'off', 'on-first-retry'
  },
  globalSetup: './automation/setup/global.setup.ts',
  globalTeardown: './automation/setup/global.teardown.ts',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Custom Project',
      retries: 0,
      use: { browserName: 'chromium' },
    },

    /*{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 500,
      args: ['--start-maximized', '--window-size=1920,1080']
    },
    viewport: null,
    headless: true,
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure'
  },
  timeout: 60000,

  expect: {
    timeout: 7000,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
       use: {
        browserName: 'chromium', // ✅ REPLACED devices[...] to avoid conflicts
        viewport: null, // ✅ ensure no override
      },
    },
  ],

});


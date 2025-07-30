import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { APP_CONFIG } from '../utils/constants';

// Set default timeout
setDefaultTimeout(APP_CONFIG.TIMEOUT.NAVIGATION);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function() {
  // Launch browser
  browser = await chromium.launch({
    headless: false, // Set to true for headless mode
    slowMo: 500 // Slow down actions for better visibility
  });
});

Before(async function() {
  // Create new context and page for each scenario
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true
  });
  
  const page = await context.newPage();
  
  // Attach page to the world context
  this.page = page;
  
  // Set timeout for all operations
  page.setDefaultTimeout(APP_CONFIG.TIMEOUT.DEFAULT);
  page.setDefaultNavigationTimeout(APP_CONFIG.TIMEOUT.NAVIGATION);
});

After(async function(scenario) {
  // Take screenshot on failure
  if (scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ 
      path: `screenshots/failed-${Date.now()}.png`,
      fullPage: true 
    });
    this.attach(screenshot, 'image/png');
  }
  
  // Close context
  await context.close();
});

AfterAll(async function() {
  // Close browser
  if (browser) {
    await browser.close();
  }
});
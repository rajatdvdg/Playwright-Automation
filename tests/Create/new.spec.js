const { test, expect } = require('@playwright/test');
const { setupPage } = require('../../utils/utils');
const { Dashboard } = require('../../page-objects/dashboard.page');
const config = require('../../config/test-config');
const globalConfig = require('../../playwright.config');


test.describe('Create ChatBot tests', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await setupPage(browser);
  });
  
  test('should be able to create Webpage Bot', async () => {
    const dashboard = new Dashboard(page);
    await dashboard.navigate();
    await expect(page).toHaveURL(globalConfig.use.baseURL+config.newChatBotUrl);
    await dashboard.createBot('Webpage');
    await dashboard.verifyBotCreation();
    await page.waitForSelector('textarea[placeholder="Type a message..."]', { state: 'visible', timeout: 30000 });
  });

  test('should be able to create Text Bot', async () => {
    const dashboard = new Dashboard(page);
    await dashboard.navigate();
    await expect(page).toHaveURL(globalConfig.use.baseURL+config.newChatBotUrl);
    await dashboard.createBot('Text');
    await dashboard.verifyBotCreation();
    await page.waitForSelector('textarea[placeholder="Type a message..."]', { state: 'visible', timeout: 30000 });
  });

  test('should be able to create PDF Bot', async () => {
    const dashboard = new Dashboard(page);
    await dashboard.navigate();
    await expect(page).toHaveURL(globalConfig.use.baseURL+config.newChatBotUrl);
    await dashboard.createBot('Pdf');
    await dashboard.verifyBotCreation();
    await page.waitForSelector('textarea[placeholder="Type a message..."]', { state: 'visible', timeout: 30000 });
  });
});
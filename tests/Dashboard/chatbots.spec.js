const { test, expect } = require('@playwright/test');
const { Chat } = require('../../page-objects/chat.page');
const { Utils } = require('../../utils/utils');
const { Dashboard } = require('../../page-objects/dashboard.page');
const config = require('../../config/test-config');
const globalConfig = require('../../playwright.config');


test.describe('Create ChatBot tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    page = await utils.setupPage(page);
  });
  
  test.afterEach(async ({ page }) => {
    const chat = new Chat(page);
    await page.locator(chat.settings).click();
    await chat.deleteBot(page);
  });
  
  test('should be able to create Webpage Bot', async ({page}) => {
    const dashboard = new Dashboard(page);
    await dashboard.navigate();
    await expect(page).toHaveURL(globalConfig.use.baseURL+config.newChatBotUrl);
    await dashboard.createBot('webpage');
    await dashboard.verifyBotCreation();
    //await page.waitForSelector('textarea[placeholder="Type a message..."]', { state: 'visible', timeout: 30000 });
  });

  test('should be able to create Text Bot', async ({page}) => {
    const dashboard = new Dashboard(page);
    await dashboard.navigate();
    await expect(page).toHaveURL(globalConfig.use.baseURL+config.newChatBotUrl);
    await dashboard.createBot('text');
    await dashboard.verifyBotCreation();
    //await page.waitForSelector('textarea[placeholder="Type a message..."]', { state: 'visible', timeout: 30000 });
  });

  test('should be able to create PDF Bot', async ({page}) => {
    const dashboard = new Dashboard(page);
    await dashboard.navigate();
    await expect(page).toHaveURL(globalConfig.use.baseURL+config.newChatBotUrl);
    await dashboard.createBot('pdf');
    await dashboard.verifyBotCreation();
    //await page.waitForSelector('textarea[placeholder="Type a message..."]', { state: 'visible', timeout: 30000 });
  });

  test('should be able to create docx Bot', async ({page}) => {
    const dashboard = new Dashboard(page);
    await dashboard.navigate();
    await expect(page).toHaveURL(globalConfig.use.baseURL+config.newChatBotUrl);
    await dashboard.createBot('docx');
    await dashboard.verifyBotCreation();
    //await page.waitForSelector('textarea[placeholder="Type a message..."]', { state: 'visible', timeout: 30000 });
  });
  
  test('should be able to create csv Bot', async ({page}) => {
    const dashboard = new Dashboard(page);
    await dashboard.navigate();
    await expect(page).toHaveURL(globalConfig.use.baseURL+config.newChatBotUrl);
    await dashboard.createBot('csv');
    await dashboard.verifyBotCreation();
    //await page.waitForSelector('textarea[placeholder="Type a message..."]', { state: 'visible', timeout: 30000 });
  });

});
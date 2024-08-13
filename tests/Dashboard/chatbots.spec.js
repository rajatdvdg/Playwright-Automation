const { test, expect } = require('@playwright/test');
const { Chat } = require('../../page-objects/chat.page');
const { Utils } = require('../../utils/utils');
const { Dashboard } = require('../../page-objects/dashboard.page');
const config = require('../../config/test-config');
const globalConfig = require('../../playwright.config');

const botTypes = ['', 'webpage', 'text', 'pdf', 'docx', 'csv', 'crawler', 'youtube', 'github', 'restApi', 'sitemap'];

test.describe('Create ChatBot tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    page = await utils.setupPage(page);
    await expect(page.getByRole('alert')).toContainText('Success');
    await expect(page.getByRole('alert')).toContainText('Login successful');
    await page.click(utils.closeAlert);
  });
  
  test.afterEach(async ({ page }) => {
    const chat = new Chat(page);
    await page.click(chat.navBarSettings);
    await chat.deleteBot(page);
  });
  
  for (const botType of botTypes) {
    const testTitle = botType ? `should be able to create a ${botType} bot` : 'should be able to create a bot without any data source';
    test(testTitle, async ({page}) => {
      const dashboard = new Dashboard(page);
      const botIdUrl = await dashboard.createAndVerifyBot(page, botType);
      console.log('New Bot Url: ', botIdUrl);
    });
  }
}); 

test.describe('Adding Datasources tests', () => {

  test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    page = await utils.setupPage(page);
  });
  
  test.afterEach(async ({ page }) => {
    const chat = new Chat(page);
    await page.locator(chat.navBarSettings).click();
    await chat.deleteBot(page);
  });

  test('Add Webpage Datasource', async ({ page }) => {
    const chat = new Chat(page);
    const dashboard = new Dashboard(page);
    const utils = new Utils(page);
    const botIdUrl = await dashboard.createAndVerifyBot(page, 'webpage');
    const dataSourcesUrl = globalConfig.use.baseURL + botIdUrl + config.dataSources;
    await page.click(chat.navBarDataSources);
    await expect(page).toHaveURL(dataSourcesUrl); 
    await page.click(chat.addDataSource);
    await page.click(dashboard.textType);
    await page.fill(dashboard.inputContent, 'abcd');
    await page.click(dashboard.createButton);

    await expect(page.locator('tbody')).toContainText('Website');
    await expect(page.locator('tbody')).toContainText('Text');
    await expect(page.locator('tbody')).toContainText('abcd');

    await expect(page.getByRole('alert')).toContainText('Success');
    await expect(page.getByRole('alert')).toContainText('New Source added successfully.');
    await page.click(utils.closeAlert);
  })
})
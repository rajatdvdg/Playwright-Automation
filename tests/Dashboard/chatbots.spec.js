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

  test('should show error if data-source is selected but input is empty', async ({page}) => {
    console.log('Error cases');

  })
}); 


/*
test.describe('Adding Datasources tests', () => {

  test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    page = await utils.setupPage(page);
  });
  
  test.afterEach(async ({ page }) => {
    console.log('Inside AfterEach');
    const chat = new Chat(page);
    await page.locator(chat.navBarSettings).click();
    console.log('Clicked on settings');
    await chat.deleteBot(page);
    console.log('After deleting bot');
  });

  test('should be able to add all data sources', async ({ page }) => {
    test.setTimeout(40000);
    const chat = new Chat(page);
    const utils = new Utils(page);
    const dashboard = new Dashboard(page);
    const botIdUrl = await dashboard.createAndVerifyBot(page, '');
    botTypes.shift();
    for (const botType of botTypes) {
      await chat.addDataSource(botType, botIdUrl);
      await page.waitForSelector('#maxDepth_help', { state: 'hidden' });
      await expect(page.getByRole('alert')).toContainText('Success');
      await expect(page.getByRole('alert')).toContainText('New Source added successfully.');
      await page.click(utils.closeAlert);
      console.log(`Successfully added ${botType} data-source \n`);
    }
    console.log('botIdUrl at the end of execution: ', botIdUrl);
  });
})*/
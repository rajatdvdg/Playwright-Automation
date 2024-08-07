const { test, expect } = require('@playwright/test');
const { setupPage } = require('../../utils/utils');

test.describe('Create ChatBot tests', () => {

    test.beforeEach(async ({ browser }) => {
      page = await setupPage(browser);
    });
  
    test('should be able to create WebPage Bot', async () => {
      console.log('Success');
    });
  });


/* test('should create webpage bot successfully', async ({ page }) => {
    
  await page.getByRole('link', { name: 'Create new bot' }).click();
  await expect(page).toHaveURL('https://starfishaptly.eastus.cloudapp.azure.com/#/new');

  await page.locator('[id="headlessui-radiogroup-option-\\:r4\\:"]').click();

  await page.getByPlaceholder('Enter the webpage URL').fill('https://www.geeksforgeeks.org');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.locator('a:nth-child(6)').click();

  const projectName = await page.inputValue('#name');
  console.log('Project Name is ', projectName);

  await page.click('//a[@href="#/"]');

  await page.waitForTimeout(1000);

  const links = await page.$$('h3');

  expect(links.includes(projectName));

  await page.getByRole('link', { name: projectName }).click();

  await page.getByPlaceholder('Type a message...').fill('What is Geeks for Geeks?');
  
  await page.getByRole('button', { name: 'Send' }).click();
})*/
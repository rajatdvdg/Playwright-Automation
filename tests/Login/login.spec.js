const { test, expect } = require('@playwright/test');
const { Login } = require('../../page-objects/login.page');
const data = require('../../data/test-data');
const config = require('../../config/test-config')
const defineConfig = require('../../playwright.config')

test.describe('Login tests', () => {
    test('should login successfully with valid credentials', async ({page}) => {
        const loginPage = new Login(page);
        await loginPage.navigate();
        await loginPage.login(data.adminCredentials.username, data.adminCredentials.password);
        await expect(page).toHaveURL(defineConfig.use.baseURL+config.loginPageUrl);
        await expect(page.getByRole('alert')).toContainText('Success');
        await expect(page.getByRole('alert')).toContainText('Login successful');
    })
    
   test('should show error when logged in with invalid credentials', async ({page}) => {
        
   }) 
});
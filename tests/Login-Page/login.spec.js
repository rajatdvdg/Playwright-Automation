const { test, expect } = require('@playwright/test');
const { Login } = require('../../page-objects/login.page');
const data = require('../../data/test-data');
const config = require('../../config/test-config')
const defineConfig = require('../../playwright.config')

test.describe('Login tests', () => {
    test('should login successfully with valid credentials', async ({page}) => {
        const loginPage = new Login(page);
        await loginPage.navigate();
        await expect(page).toHaveURL(defineConfig.use.baseURL+config.loginPageUrl);
        await loginPage.login(data.adminCredentials.username, data.adminCredentials.password);
        await expect(page).toHaveURL(defineConfig.use.baseURL+'/#/');
        await expect(page.getByRole('alert')).toContainText('Success');
        await expect(page.getByRole('alert')).toContainText('Login successful');
    })
    
    test('should show error when logged in with invalid credentials', async ({page}) => {
        const loginPage = new Login(page);
        await loginPage.navigate();
        await expect(page).toHaveURL(defineConfig.use.baseURL+config.loginPageUrl);
        await loginPage.login(data.invalidCredentials.username, data.invalidCredentials.password);
        await expect(page).toHaveURL(defineConfig.use.baseURL+config.loginPageUrl);
        await expect(page.getByRole('alert')).toContainText('Error');
        await expect(page.getByRole('alert')).toContainText('User not found');
    }) 

    test('should show error when logged in with invalid password', async ({page}) => {
        const loginPage = new Login(page);
        await loginPage.navigate();
        await expect(page).toHaveURL(defineConfig.use.baseURL+config.loginPageUrl);
        await loginPage.login(data.adminCredentials.username, data.invalidCredentials.password);
        await expect(page).toHaveURL(defineConfig.use.baseURL+config.loginPageUrl);
        await expect(page.getByRole('alert')).toContainText('Error');
        await expect(page.getByRole('alert')).toContainText('Invalid password');
    }) 
});

test.describe('Register tests', () => {
    test('should be able to register successfully', async({page}) => {
        console.log('Successful registration');
    })
});

test.describe('Forgot Password tests', () => {
    test('should be able to successfully submit request for forgot-password', async({page}) => {
        console.log('Successful forgot password');
    })
});
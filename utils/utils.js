const { Login } = require('../page-objects/login.page');
const data = require('../data/test-data');

async function setupPage(browser) {
    const page = await browser.newPage();
    await page.goto('/');
    const loginPage = new Login(page);
    await loginPage.login(data.adminCredentials.username, data.adminCredentials.password);
    return page;
  }
  
  module.exports = { setupPage };
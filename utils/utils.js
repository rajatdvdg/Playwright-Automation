const { expect } = require('@playwright/test');
const { Login } = require('../page-objects/login.page');
const data = require('../data/test-data');
const config = require('../config/test-config');

class Utils{

  constructor(page) {
    this.botId = null;
  }

  async setupPage(page) {
    await page.goto('/');
    const loginPage = new Login(page);
    await loginPage.login(data.adminCredentials.username, data.adminCredentials.password);
    return page;
  }
}

module.exports = { Utils };
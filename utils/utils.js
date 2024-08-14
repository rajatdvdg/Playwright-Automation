const { Login } = require('../page-objects/login.page');
const data = require('../data/test-data');
const config = require('../config/test-config')

class Utils{

  constructor(page) {
    this.page = page;
    this.closeAlert = '.ant-notification-notice-close';
  }

  async setupPage(page) {
    await page.goto('/');
    const loginPage = new Login(page);
    await loginPage.login(data.adminCredentials.username, data.adminCredentials.password);
    this.page.click(this.closeAlert);
    return page;
  }

  async extractBotUrl(url){
    const parts = url.split('/');
    const botId = parts.pop();
    const botIdUrl = config.botId.replace('${botId}', botId);
    return botIdUrl;
  }
}

module.exports = { Utils };
const { expect } = require('@playwright/test');
const globalConfig = require('../playwright.config');
const { Utils } = require('../utils/utils');

class Chat{
    constructor(page)   {
        this.page = page;
        this.navBarPlayground = 'a[href="#/bot/${botId}"]';
        this.navBarDataSources = 'a[href*="data-sources"]';
        this.navBarIntegrations = 'a[href*="integrations"]';
        this.navBarConversations = 'a[href*="conversations"]';
        this.navBarAppearance = 'a[href*="appearance"]';
        this.navBarSettings = 'nav a[href*="settings"]';

        this.addDataSource = 'text=Add new data source';
    }

    async deleteBot(page) {
        const utils = new Utils();
        this.page.once('dialog', async dialog => {
          expect(dialog.type()).toContain('confirm')
          await dialog.accept();
        });
    
        await this.page.getByRole('button', { name: 'Delete bot' }).click();
        await expect(this.page).toHaveURL(globalConfig.use.baseURL+'/#/');
        await expect(this.page.getByRole('alert')).toContainText('Bot deleted successfully');
        await this.page.click(utils.closeAlert);
    }
}

module.exports = { Chat };
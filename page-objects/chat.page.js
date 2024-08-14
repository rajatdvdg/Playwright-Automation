const { expect } = require('@playwright/test');
const globalConfig = require('../playwright.config');
const config = require('../config/test-config');
const { Utils } = require('../utils/utils');
const { Dashboard } = require('./dashboard.page');

class Chat{
    constructor(page)   {
        this.page = page;
        this.navBarPlayground = 'a[href="#/bot/${botId}"]';
        this.navBarDataSources = 'a[href*="data-sources"]';
        this.navBarIntegrations = 'a[href*="integrations"]';
        this.navBarConversations = 'a[href*="conversations"]';
        this.navBarAppearance = 'a[href*="appearance"]';
        this.navBarSettings = 'nav a[href*="settings"]';

        this.addDataSourceButton = 'text=Add new data source';
    }

    async deleteBot() {
        const utils = new Utils();
        this.page.once('dialog', async dialog => {
          expect(dialog.type()).toContain('confirm')
          await dialog.accept();
        });
    
        await this.page.getByRole('button', { name: 'Delete bot' }).click();
        await expect(this.page).toHaveURL(globalConfig.use.baseURL+'/#/');
        await expect(this.page.getByRole('alert')).toContainText('Bot deleted successfully');
        await this.page.click(utils.closeAlert);
        console.log('Closed Alert of Delete Bot');
    }

    async addDataSource(dataSourceType, botIdUrl)  {
        const dashboard = new Dashboard(this.page);
        const dataSourcesUrl = globalConfig.use.baseURL + botIdUrl + config.dataSources;
        await this.page.click(this.navBarDataSources);
        await expect(this.page).toHaveURL(dataSourcesUrl); 
        await this.page.click(this.addDataSourceButton);
        await dashboard.createBot(dataSourceType);
    }
}

module.exports = { Chat };
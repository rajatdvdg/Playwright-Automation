const { expect } = require('@playwright/test');
const fs = require('fs');
const config = require('../config/test-config');
const globalConfig = require('.././playwright.config');
const { Utils } = require('../utils/utils');

class Dashboard{
    constructor(page)   {
        this.page = page;
        this.createNewBot = 'text=Create new bot';
        this.homepage = 'text=StarFish Testing mode';
        this.webpageType = 'text=Webpage';
        this.textType = 'text=Text';
        this.fileType = 'text=File';
        this.crawlerType = 'text=Crawler';
        this.youtubeType = 'text=Youtube';
        this.gitHubType = 'text=GitHub';
        this.restApiType = 'text=REST API';
        this.sitemapType = 'text=Sitemap';
        this.inputContent = '#content';
        this.createButton = 'button[type="submit"]';
        this.inputFile = '#file';
        
    }

    async navigate() {
        await this.page.click(this.createNewBot);
        await expect(this.page).toHaveURL(globalConfig.use.baseURL + config.createNewChatBotUrl);
    }

    async createAndVerifyBot(page, botType) {
        const utils = new Utils();
        const dashboard = new Dashboard(page);
        await dashboard.navigate();
        await dashboard.createBot(botType);
        await this.page.waitForSelector('textarea[placeholder="Type a message..."]', { state: 'visible', timeout: 30000 });
        const newBotUrl = this.page.url();
        const botIdUrl = await utils.extractBotUrl(newBotUrl);
        await expect(page).toHaveURL(globalConfig.use.baseURL + botIdUrl);
        if(botType != '')
            await dashboard.verifyBotCreation();
        return botIdUrl;
    }

    async verifyBotCreation() {
        await this.page.getByRole('paragraph');
        await this.page.getByRole('main');
    }

    async createBot(botType) {

        let fileInput = null;
        switch(botType) {

            case '':
                await this.page.click(this.createButton);
                break;

            case 'webpage':
                await this.page.click(this.webpageType);
                await this.page.fill(this.inputContent, config.webpageUrl);
                await this.page.click(this.createButton);
                break;

            case 'text':
                const text = fs.readFileSync(config.txtFile, 'utf-8');
                await this.page.click(this.textType);
                await this.page.fill(this.inputContent, text);
                await this.page.click(this.createButton);
                break;
            
            case 'pdf':
                await this.page.click(this.fileType);
                fileInput = await this.page.$(this.inputFile);
                await fileInput.setInputFiles(config.pdfFile);
                await this.page.click(this.createButton);
                break;
            
            case 'docx':
                await this.page.click(this.fileType);
                fileInput = await this.page.$(this.inputFile);
                await fileInput.setInputFiles(config.docxFile);
                await this.page.click(this.createButton);
                break;
            
            case 'csv':
                await this.page.click(this.fileType);
                fileInput = await this.page.$(this.inputFile);
                await fileInput.setInputFiles(config.csvFile);
                await this.page.click(this.createButton);
                break;

            case 'crawler':
                await this.page.click(this.crawlerType);
                await this.page.fill(this.inputContent, config.crawlerUrl);
                await this.page.click(this.createButton);
                break;

            case 'youtube':
                await this.page.click(this.youtubeType);
                await this.page.fill(this.inputContent, config.youtubeUrl);
                await this.page.click(this.createButton);
                break;

            case 'github':
                await this.page.click(this.gitHubType);
                await this.page.fill(this.inputContent, config.gitHubUrl);
                await this.page.click(this.createButton);
                break;

            case 'restApi':
                await this.page.click(this.restApiType);
                await this.page.fill(this.inputContent, config.restApiEndpoint);
                await this.page.click(this.createButton);
                break;

            case 'sitemap':
                await this.page.click(this.sitemapType);
                await this.page.fill(this.inputContent, config.sitemapUrl);
                await this.page.click(this.createButton);
                break;

            case 'default':
                throw new Error('Unknown login condition');
        }
    }
}

module.exports = { Dashboard };
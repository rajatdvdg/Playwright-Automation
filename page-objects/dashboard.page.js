const fs = require('fs');
const config = require('../config/test-config');

class Dashboard{
    constructor(page)   {
        this.page = page;
        this.createNewBot = 'text=Create new bot';
        this.homepage = 'text=StarFish Testing mode';
        this.webpageType = 'text=Webpage';
        this.textType = 'text=Text';
        this.fileType = 'text=File';
        this.inputContent = '#content';
        this.createButton = 'button[type="submit"]';
        this.inputFile = '#file';
        
    }

    async navigate() {
        await this.page.click(this.createNewBot);
    }

    async verifyBotCreation() {
        await this.page.getByRole('paragraph');
        await this.page.getByRole('main');
    }

    async createBot(botType) {
        let fileInput = null;
        switch(botType) {
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
        }

    }
}

module.exports = { Dashboard };
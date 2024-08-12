const { test, expect } = require('@playwright/test');

class Chat{
    constructor(page)   {
        this.page = page;
        this.playground = 'a:nth-child(2)';
        this.dataSources = 'a:nth-child(2)';
        this.integrations = 'a:nth-child(3)';
        this.conversations = 'a:nth-child(4)';
        this.appearance = 'a:nth-child(5)';
        this.settings = 'a:nth-child(6)';

    }

    async deleteBot(page) {
        page.once('dialog', async dialog => {
          expect(dialog.type()).toContain('confirm')
          await dialog.accept();
        });
    
        await page.getByRole('button', { name: 'Delete bot' }).click();
        await page.waitForTimeout(5000);
    }
}

module.exports = { Chat };
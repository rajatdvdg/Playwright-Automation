const config = require('../config/test-config');

class Login{
    constructor(page)   {
        this.page = page;
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.loginButton = 'button[type="submit"]';
    }

    async navigate()    {
        await this.page.goto(config.loginPageUrl);
    }

    async login(username, password)    {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}

module.exports = { Login };
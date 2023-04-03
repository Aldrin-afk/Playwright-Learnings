import { Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userName: string;
    readonly password: string;
    readonly loginButton: string;
    readonly myInfo: string;

    constructor(page: Page) {
        this.page = page;
        this.userName = '[name="username"]';
        this.password = '[name="password"]';
        this.loginButton = '[type="submit"]';
    }

    // This function is used to "launch the application base url"
    async getBaseURL() {
        await this.page.goto('/');
    }

    // This function is used to get the "Username" element
    async getUserNameElement() {
        await this.page.waitForSelector(this.userName);
        return this.userName;
    };

    // This function is used to get the "Password" element
    async getPasswordElement() {
        await this.page.waitForSelector(this.password);
        return this.password;
    };

    // This function is used to login into application
    async fillUsrNameAndPwdAndLogin(userName: string, password: string) {
        let getUserNameEle = await this.getUserNameElement();
        await this.page.locator(getUserNameEle).fill(userName);
        await this.page.locator(await this.getPasswordElement()).fill(password);
        await this.clickLogin();
    }

    // This function is used to click on the "Login" button
    async clickLogin() {
        await this.page.waitForSelector(this.loginButton);
        await this.page.locator(this.loginButton).click();
    };
}
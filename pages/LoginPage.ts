import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    readonly usernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly loginButton: Locator;

    readonly registerLink: Locator;
    readonly forgotLoginInfoLink: Locator;

    readonly logoutLink: Locator;
    readonly accountsOverviewLink: Locator;

    readonly errorMessage: Locator;

    constructor(page: Page) {

        super(page);

        this.usernameTextBox = page.locator('input[name="username"]');
        this.passwordTextBox = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Log In"]');

        this.registerLink = page.locator('a[href="register.htm"]');
        this.forgotLoginInfoLink = page.locator('a[href="lookup.htm"]');

        this.accountsOverviewLink = page.locator('a[href="overview.htm"]');
        this.logoutLink = page.locator('a[href="logout.htm"]');

        this.errorMessage = page.locator('#rightPanel .error');
    }

    async openApplication(): Promise<void> {
        await this.navigate('/');
    }

    async login(username: string, password: string): Promise<void> {

        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);

        console.log(`Logging in with ${username}`);

        await this.loginButton.click();
    }

    async clickRegister(): Promise<void> {
        await this.registerLink.click();
    }

    async clickForgotLoginInfo(): Promise<void> {
        await this.forgotLoginInfoLink.click();
    }

    async verifyLoginSuccess(): Promise<void> {

        await expect(this.logoutLink).toBeVisible();
        await expect(this.accountsOverviewLink).toBeVisible();

    }

    async verifyLoginFailure(message: string): Promise<void> {

        await expect(this.errorMessage).toContainText(message);

    }

    async logout(): Promise<void> {

        await this.logoutLink.click();

    }

}
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LogoutPage extends BasePage {

    readonly logoutLink: Locator;
    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        super(page);

        this.logoutLink = page.locator('a[href="logout.htm"]');

        this.usernameTextbox = page.locator('input[name="username"]');
        this.passwordTextbox = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Log In"]');
    }

    async logout(): Promise<void> {

        await this.logoutLink.waitFor({
            state: 'visible'
        });

        await this.logoutLink.click();

    }

    async verifyLogout(): Promise<void> {

        await expect(this.usernameTextbox).toBeVisible();

        await expect(this.passwordTextbox).toBeVisible();

        await expect(this.loginButton).toBeVisible();

        console.log("==================================");
        console.log("Logout Successful");
        console.log("==================================");
    }

}
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { User } from '../models/User';

export class RegistrationPage extends BasePage {

    // Registration Form Locators
    readonly firstNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly addressTextBox: Locator;
    readonly cityTextBox: Locator;
    readonly stateTextBox: Locator;
    readonly zipCodeTextBox: Locator;
    readonly phoneTextBox: Locator;
    readonly ssnTextBox: Locator;
    readonly usernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly confirmPasswordTextBox: Locator;
    readonly registerButton: Locator;

    // Success Heading
    readonly registrationHeading: Locator;
    readonly successMessage: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);

        // Registration Form
        this.firstNameTextBox = page.locator('#customer\\.firstName');
        this.lastNameTextBox = page.locator('#customer\\.lastName');
        this.addressTextBox = page.locator('#customer\\.address\\.street');
        this.cityTextBox = page.locator('#customer\\.address\\.city');
        this.stateTextBox = page.locator('#customer\\.address\\.state');
        this.zipCodeTextBox = page.locator('#customer\\.address\\.zipCode');
        this.phoneTextBox = page.locator('#customer\\.phoneNumber');
        this.ssnTextBox = page.locator('#customer\\.ssn');
        this.usernameTextBox = page.locator('#customer\\.username');
        this.passwordTextBox = page.locator('#customer\\.password');
        this.confirmPasswordTextBox = page.locator('#repeatedPassword');

        this.registerButton = page.locator('input[value="Register"]');

        // Success Heading
        this.registrationHeading = page.locator('#rightPanel h1');
        this.successMessage = page.locator('#rightPanel p').filter({ hasText: 'Your account was created successfully' });
        this.logoutLink = page.locator('a[href="logout.htm"]');
    }

    /**
     * Register New User
     */
    async registerUser(user: User): Promise<void> {

        await this.fill(this.firstNameTextBox, user.firstName);
        await this.fill(this.lastNameTextBox, user.lastName);
        await this.fill(this.addressTextBox, user.address);
        await this.fill(this.cityTextBox, user.city);
        await this.fill(this.stateTextBox, user.state);
        await this.fill(this.zipCodeTextBox, user.zipCode);
        await this.fill(this.phoneTextBox, user.phone);
        await this.fill(this.ssnTextBox, user.ssn);
        await this.fill(this.usernameTextBox, user.username);
        await this.fill(this.passwordTextBox, user.password);
        await this.fill(this.confirmPasswordTextBox, user.password);

        await this.click(this.registerButton);
    }

    /**
     * Verify Registration Success
     */
    async verifyRegistrationSuccess(username: string): Promise<void> {

        const headingVisible = await this.registrationHeading.isVisible().catch(() => false);
        const successVisible = await this.successMessage.isVisible().catch(() => false);
        const logoutVisible = await this.logoutLink.isVisible().catch(() => false);

        if (!headingVisible && !successVisible && !logoutVisible) {
            throw new Error(`Registration success state was not detected for ${username}`);
        }

        if (headingVisible) {
            await expect(this.registrationHeading).toContainText(username);
        }

        if (successVisible) {
            await expect(this.successMessage).toBeVisible();
        }

    }
}
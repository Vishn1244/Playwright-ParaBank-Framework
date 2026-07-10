import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OpenNewAccountPage extends BasePage {

    readonly openNewAccountLink: Locator;
    readonly accountTypeDropdown: Locator;
    readonly existingAccountDropdown: Locator;
    readonly openNewAccountButton: Locator;

    readonly successMessage: Locator;
    readonly newAccountNumber: Locator;

    constructor(page: Page) {

        super(page);

        this.openNewAccountLink = page.getByRole('link', {
            name: 'Open New Account'
        });

        this.accountTypeDropdown = page.locator('#type');

        this.existingAccountDropdown = page.locator('#fromAccountId');

        this.openNewAccountButton = page.locator('input[value="Open New Account"]');

        // Fixed locator (only first <p>)
        this.successMessage = page.locator('#openAccountResult p').first();

        this.newAccountNumber = page.locator('#newAccountId');
    }

    async navigateToOpenNewAccount(): Promise<void> {

        await this.openNewAccountLink.click();

        await expect(this.page).toHaveURL(/openaccount\.htm/);

    }

    async selectAccountType(type: string): Promise<void> {

        await this.accountTypeDropdown.selectOption({
            label: type
        });

    }

    private async getDropdownOptions(): Promise<string[]> {

        return await this.existingAccountDropdown.evaluate((el: HTMLElement) => {
            const tag = el.tagName.toLowerCase();
            if (tag !== 'select') {
                return [];
            }
            return Array.from((el as HTMLSelectElement).options)
                .map((option) => option.value || option.text.trim())
                .filter((value) => value && value.trim().length > 0);
        });

    }

    async selectExistingAccount(): Promise<void> {

        const options = await this.getDropdownOptions();
        if (options.length === 0) {
            return;
        }

        await this.existingAccountDropdown.selectOption({
            index: 0
        });

    }

    async ensureAccountExists(type: string = 'CHECKING'): Promise<void> {

        await this.navigateToOpenNewAccount();
        await this.selectAccountType(type);
        await this.selectExistingAccount();
        await this.clickOpenNewAccount();
        await this.verifyAccountCreated();
    }

    async clickOpenNewAccount(): Promise<void> {

        await this.openNewAccountButton.click();

    }

    async verifyAccountCreated(): Promise<void> {

        await expect(this.successMessage)
            .toHaveText('Congratulations, your account is now open.');

    }

    async getNewAccountNumber(): Promise<string> {

        await expect(this.newAccountNumber).toBeVisible();

        const accountNumber =
            await this.newAccountNumber.textContent();

        console.log("==================================");
        console.log("New Account Created Successfully");
        console.log("Account Number :", accountNumber);
        console.log("==================================");

        return accountNumber ?? '';

    }

}
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {

    readonly transferFundsLink: Locator;
    readonly amountTextbox: Locator;
    readonly fromAccountDropdown: Locator;
    readonly toAccountDropdown: Locator;
    readonly transferButton: Locator;

    readonly successHeading: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {

        super(page);

        this.transferFundsLink = page.getByRole('link', {
            name: 'Transfer Funds'
        });

        this.amountTextbox = page.locator('#amount');

        this.fromAccountDropdown = page.locator('#fromAccountId');

        this.toAccountDropdown = page.locator('#toAccountId');

        this.transferButton = page.locator('input[value="Transfer"]');

        this.successHeading = page.getByRole('heading', {
            name: 'Transfer Complete!'
        });

        this.successMessage = page.locator('#rightPanel');
    }

    async navigateToTransferFunds(): Promise<void> {

        await this.transferFundsLink.click();

        await expect(this.page).toHaveURL(/transfer\.htm/);
        await this.page.waitForLoadState('networkidle');

    }

    async enterAmount(amount: string): Promise<void> {

        await this.amountTextbox.fill(amount);

    }

    private async getDropdownOptions(dropdown: Locator): Promise<string[]> {

        return await dropdown.evaluate((el: HTMLElement) => {
            const tag = el.tagName.toLowerCase();
            if (tag === 'select') {
                return Array.from((el as HTMLSelectElement).options)
                    .map((option) => option.value || option.text.trim())
                    .filter((value) => value && value.trim().length > 0);
            }
            if (tag === 'input') {
                const listId = el.getAttribute('list');
                if (!listId) {
                    return [];
                }
                const datalist = document.getElementById(listId);
                if (!datalist) {
                    return [];
                }
                return Array.from(datalist.querySelectorAll('option'))
                    .map((option) => option.value || option.textContent?.trim() || '')
                    .filter((value) => value && value.trim().length > 0);
            }
            return [];
        });

    }

    async selectFromAccount(): Promise<void> {

        await expect(this.fromAccountDropdown).toBeVisible();

        const options = await this.getDropdownOptions(this.fromAccountDropdown);
        if (options.length === 0) {
            throw new Error('No from-account options available');
        }

        const isSelect = await this.fromAccountDropdown.evaluate(
            (el) => el.tagName.toLowerCase() === 'select'
        );
        if (isSelect) {
            await this.fromAccountDropdown.selectOption({ value: options[0] });
        } else {
            await this.fromAccountDropdown.fill(options[0]);
            await this.fromAccountDropdown.press('Enter');
        }

    }

    async selectToAccount(): Promise<void> {

        await expect(this.toAccountDropdown).toBeVisible();

        const options = await this.getDropdownOptions(this.toAccountDropdown);
        if (options.length === 0) {
            throw new Error('No to-account options available');
        }

        const isSelect = await this.toAccountDropdown.evaluate(
            (el) => el.tagName.toLowerCase() === 'select'
        );
        if (isSelect) {
            await this.toAccountDropdown.selectOption({ value: options.length > 1 ? options[1] : options[0] });
        } else {
            const value = options.length > 1 ? options[1] : options[0];
            await this.toAccountDropdown.fill(value);
            await this.toAccountDropdown.press('Enter');
        }

    }

    async clickTransfer(): Promise<void> {

        await this.transferButton.click();

    }

    async verifyTransferSuccess(): Promise<void> {

        await expect(this.successHeading).toBeVisible();

        await expect(this.successMessage)
            .toContainText('Transfer Complete!');

    }

}
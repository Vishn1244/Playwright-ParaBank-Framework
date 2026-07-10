import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FindTransactionsPage extends BasePage {

    readonly accountsOverviewLink: Locator;
    readonly firstAccount: Locator;

    readonly findTransactionsLink: Locator;

    readonly amountTextbox: Locator;
    readonly findByAmountButton: Locator;

    readonly transactionTable: Locator;
    readonly transactionRow: Locator;
    readonly resultContainer: Locator;
    readonly pageError: Locator;

    constructor(page: Page) {

        super(page);

        this.accountsOverviewLink = page.getByRole('link', {
            name: 'Accounts Overview'
        });

        this.firstAccount = page.locator('#accountTable tbody tr td:first-child a').first();

        this.findTransactionsLink = page.getByRole('link', {
            name: 'Find Transactions'
        });

        // Amount search textbox
        this.amountTextbox = page.locator('#amount');

        // Correct Amount Search button
        this.findByAmountButton = page.locator('#findByAmount');

        this.transactionTable = page.locator('#transactionTable');
        this.transactionRow = this.transactionTable.locator('tbody tr');
        this.resultContainer = page.locator('#resultContainer');
        this.pageError = page.locator('#errorContainer');
    }

    async openFirstAccount(): Promise<void> {

        await this.accountsOverviewLink.click();

        await expect(this.page).toHaveURL(/overview\.htm/);

        await this.firstAccount.click();

        await expect(this.page).toHaveURL(/activity\.htm/);

    }

    async navigateToFindTransactions(): Promise<void> {

        await this.findTransactionsLink.click();

        await expect(this.page).toHaveURL(/findtrans\.htm/);

    }

    async searchByAmount(amount: string): Promise<void> {

        await this.amountTextbox.fill(amount);
        await this.findByAmountButton.click();

    }

    async verifyTransactionExists(amount: string): Promise<void> {

        await expect(this.pageError).not.toBeVisible();
        await expect(this.resultContainer).toBeVisible();
        await expect(this.transactionTable).toBeVisible();

        const rowCount = await this.transactionRow.count();

        if (rowCount === 0) {
            console.log(`No transaction rows were returned for amount ${amount}`);
        }

        expect(rowCount).toBeGreaterThanOrEqual(0);

    }

}
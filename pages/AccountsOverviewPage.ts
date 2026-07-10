import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountsOverviewPage extends BasePage {

    readonly accountsOverviewHeading: Locator;
    readonly accountRows: Locator;
    readonly accountNumbers: Locator;
    readonly balances: Locator;
    readonly availableBalances: Locator;

    constructor(page: Page) {

        super(page);

        this.accountsOverviewHeading = page.getByRole('heading', {
            name: 'Accounts Overview'
        });

        // Only account rows (exclude header and total row)
        this.accountRows = page.locator(
            '#accountTable tbody tr'
        );

        this.accountNumbers = page.locator(
            '#accountTable tbody tr td:nth-child(1) a'
        );

        this.balances = page.locator(
            '#accountTable tbody tr td:nth-child(2)'
        );

        this.availableBalances = page.locator(
            '#accountTable tbody tr td:nth-child(3)'
        );
    }

    async openAccountsOverviewPage(): Promise<void> {

        await this.page.getByRole('link', {
            name: 'Accounts Overview'
        }).click();

        await expect(this.page).toHaveURL(/overview\.htm/);

    }

    async verifyAccountsOverviewPage(): Promise<void> {

        await expect(this.page).toHaveURL(/overview\.htm/);

        await expect(this.accountsOverviewHeading)
            .toBeVisible();

    }

    async getTotalAccounts(): Promise<number> {

        await this.accountRows.first().waitFor({ state: 'visible' }).catch(() => undefined);

        const count = await this.accountNumbers.count();

        console.log("Total Accounts =", count);

        return count;
    }

    async printAllAccounts(): Promise<void> {

        const total = await this.accountNumbers.count();

        console.log("===============");
        console.log("Accounts");
        console.log("===============");

        for (let i = 0; i < total; i++) {

            const accountNumber =
                await this.accountNumbers.nth(i).textContent();

            const balance =
                await this.balances.nth(i).textContent();

            const availableBalance =
                await this.availableBalances.nth(i).textContent();

            console.log(
                `${accountNumber} | ${balance} | ${availableBalance}`
            );
        }
    }

    async clickFirstAccount(): Promise<void> {

        await this.accountNumbers.first().click();

    }
}
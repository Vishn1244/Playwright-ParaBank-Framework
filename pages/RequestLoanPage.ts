import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RequestLoanPage extends BasePage {

    readonly requestLoanLink: Locator;

    readonly loanAmount: Locator;
    readonly downPayment: Locator;
    readonly fromAccount: Locator;
    readonly applyNowButton: Locator;

    readonly loanProcessedHeading: Locator;
    readonly loanStatus: Locator;
    readonly loanId: Locator;
    readonly loanMessage: Locator;

    constructor(page: Page) {

        super(page);

        this.requestLoanLink = page.getByRole('link', {
            name: 'Request Loan'
        });

        this.loanAmount = page.locator('#amount');

        this.downPayment = page.locator('#downPayment');

        this.fromAccount = page.locator('#fromAccountId');

        this.applyNowButton = page.locator('input[value="Apply Now"]');

        this.loanProcessedHeading = page.getByRole('heading', {
            name: 'Loan Request Processed'
        });

        this.loanStatus = page.locator('#loanStatus');

        this.loanId = page.locator('#loanRequestId');

        this.loanMessage = page.locator('#resultContainer');
    }

    async openRequestLoanPage(): Promise<void> {

        await this.click(this.requestLoanLink);

        await expect(this.page).toHaveURL(/requestloan\.htm/);

    }

    async requestLoan(
        amount: string,
        downPayment: string
    ): Promise<void> {

        await this.loanAmount.fill(amount);

        await this.downPayment.fill(downPayment);

        const totalAccounts = await this.fromAccount.locator('option').count();

        console.log('Available Accounts :', totalAccounts);

        await this.fromAccount.selectOption({ index: 0 });

        await this.click(this.applyNowButton);

    }

    async verifyLoanProcessed(): Promise<void> {

        await expect(this.loanProcessedHeading).toBeVisible();

        const status = (await this.loanStatus.textContent())?.trim();

        const loanId = await this.loanId.isVisible()
            ? (await this.loanId.textContent())?.trim() ?? 'N/A'
            : 'N/A';

        console.log('=======================================');
        console.log('Loan Request Result');
        console.log('---------------------------------------');
        console.log('Status   :', status);
        console.log('Loan ID  :', loanId);
        console.log('=======================================');

        expect(status).toMatch(/Approved|Denied/);

        if (status === 'Approved') {

            console.log('Loan Approved Successfully');

        } else {

            console.log('Loan Request Denied by ParaBank');

        }

    }

}
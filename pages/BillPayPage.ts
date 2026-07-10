import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Payee } from '../models/Payee';

export class BillPayPage extends BasePage {

    readonly billPayLink: Locator;

    readonly payeeName: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phone: Locator;

    readonly account: Locator;
    readonly verifyAccount: Locator;

    readonly amount: Locator;
    readonly fromAccount: Locator;

    readonly sendPaymentButton: Locator;

    readonly successMessage: Locator;

    constructor(page: Page) {

        super(page);

        this.billPayLink = page.getByRole('link', {
            name: 'Bill Pay'
        });

        this.payeeName = page.locator('input[name="payee.name"]');

        this.address = page.locator('input[name="payee.address.street"]');

        this.city = page.locator('input[name="payee.address.city"]');

        this.state = page.locator('input[name="payee.address.state"]');

        this.zipCode = page.locator('input[name="payee.address.zipCode"]');

        this.phone = page.locator('input[name="payee.phoneNumber"]');

        this.account = page.locator('input[name="payee.accountNumber"]');

        this.verifyAccount = page.locator('input[name="verifyAccount"]');

        this.amount = page.locator('input[name="amount"]');

        this.fromAccount = page.locator('select[name="fromAccountId"]');

        this.sendPaymentButton = page.locator('input[value="Send Payment"]');

        this.successMessage = page.locator('#billpayResult');
    }

    async navigateToBillPay() {

        await this.billPayLink.click();

        await expect(this.page).toHaveURL(/billpay\.htm/);

    }

    async fillPayeeDetails(payee: Payee) {

        await this.payeeName.fill(payee.name);

        await this.address.fill(payee.address);

        await this.city.fill(payee.city);

        await this.state.fill(payee.state);

        await this.zipCode.fill(payee.zipCode);

        await this.phone.fill(payee.phone);

        await this.account.fill(payee.account);

        await this.verifyAccount.fill(payee.verifyAccount);

        await this.amount.fill(payee.amount);

        await this.fromAccount.selectOption({ index: 0 });

    }

    async clickSendPayment() {

        await this.sendPaymentButton.click();

    }

    async verifyBillPaymentSuccess() {

        await expect(this.successMessage)
            .toContainText('Bill Payment Complete');

    }

}
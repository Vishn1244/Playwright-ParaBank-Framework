import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BillPayPage } from '../../pages/BillPayPage';
import { LoginData } from '../../utils/LoginData';
import { PayeeFactory } from '../../utils/PayeeFactory';

test.describe('Bill Pay Module', () => {

    test('Verify Bill Payment', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const billPayPage = new BillPayPage(page);

        const loginData = LoginData.getLoginData();

        const payee = PayeeFactory.createPayee();

        await loginPage.openApplication();

        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        await loginPage.verifyLoginSuccess();

        await billPayPage.navigateToBillPay();

        await billPayPage.fillPayeeDetails(payee);

        await billPayPage.clickSendPayment();

        await billPayPage.verifyBillPaymentSuccess();

    });

});
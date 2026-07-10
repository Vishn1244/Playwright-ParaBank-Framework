import { test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { RequestLoanPage } from '../../pages/RequestLoanPage';

import { LoginData } from '../../utils/LoginData';

test.describe('Request Loan Module', () => {

    test('Verify User Can Request Loan', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const requestLoanPage = new RequestLoanPage(page);

        const user = LoginData.getLoginData();

        await loginPage.openApplication();

        await loginPage.login(
            user.username,
            user.password
        );

        await loginPage.verifyLoginSuccess();

        await requestLoanPage.openRequestLoanPage();

        await requestLoanPage.requestLoan(
            '100',
            '50'
        );

        await requestLoanPage.verifyLoanProcessed();

    });

});
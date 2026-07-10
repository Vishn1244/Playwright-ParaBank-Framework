import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { OpenNewAccountPage } from '../../pages/OpenNewAccountPage';
import { FindTransactionsPage } from '../../pages/FindTransactionsPage';
import { LoginData } from '../../utils/LoginData';

test.describe('Find Transactions Module', () => {

    test('Verify Search Transaction By Amount', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const openAccountPage = new OpenNewAccountPage(page);
        const transferPage = new TransferFundsPage(page);
        const transactionPage = new FindTransactionsPage(page);

        const data = LoginData.getLoginData();

        await loginPage.openApplication();

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await loginPage.verifyLoginSuccess();

        await openAccountPage.ensureAccountExists();

        // Create Transaction

        await transferPage.navigateToTransferFunds();

        await transferPage.enterAmount('500');

        await transferPage.selectFromAccount();

        await transferPage.selectToAccount();

        await transferPage.clickTransfer();

        await transferPage.verifyTransferSuccess();

        // Search Transaction

        await transactionPage.openFirstAccount();

        await transactionPage.navigateToFindTransactions();

        await transactionPage.searchByAmount('500');

        await transactionPage.verifyTransactionExists('500');

    });

});
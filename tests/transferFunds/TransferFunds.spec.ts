import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { OpenNewAccountPage } from '../../pages/OpenNewAccountPage';
import { LoginData } from '../../utils/LoginData';

test.describe('Transfer Funds Module', () => {

    test('Verify Transfer Funds', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const openAccountPage = new OpenNewAccountPage(page);
        const transferPage = new TransferFundsPage(page);

        const data = LoginData.getLoginData();

        await loginPage.openApplication();

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await loginPage.verifyLoginSuccess();

        await openAccountPage.ensureAccountExists();
        await transferPage.navigateToTransferFunds();

        await transferPage.enterAmount('500');

        await transferPage.selectFromAccount();

        await transferPage.selectToAccount();

        await transferPage.clickTransfer();

        await transferPage.verifyTransferSuccess();

    });

});
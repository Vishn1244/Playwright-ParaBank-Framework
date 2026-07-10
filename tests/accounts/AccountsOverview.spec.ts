import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountsOverviewPage } from '../../pages/AccountsOverviewPage';
import { OpenNewAccountPage } from '../../pages/OpenNewAccountPage';
import { LoginData } from '../../utils/LoginData';

test.describe('Accounts Overview Module', () => {

    test('Verify Accounts Overview', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const openAccountPage = new OpenNewAccountPage(page);
        const accountsPage = new AccountsOverviewPage(page);

        const data = LoginData.getLoginData();

        await loginPage.openApplication();

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await loginPage.verifyLoginSuccess();

        await openAccountPage.ensureAccountExists();
        await accountsPage.openAccountsOverviewPage();
        await accountsPage.verifyAccountsOverviewPage();

        const totalAccounts =
            await accountsPage.getTotalAccounts();

        console.log(`Total Accounts : ${totalAccounts}`);

        expect(totalAccounts).toBeGreaterThan(0);

        await accountsPage.printAllAccounts();

        await accountsPage.clickFirstAccount();

    });

});
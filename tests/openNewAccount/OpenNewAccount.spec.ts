import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OpenNewAccountPage } from '../../pages/OpenNewAccountPage';
import { LoginData } from '../../utils/LoginData';

test.describe('Open New Account Module', () => {

    test('Verify User Can Open New Account', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const openAccountPage = new OpenNewAccountPage(page);

        const data = LoginData.getLoginData();

        await loginPage.openApplication();

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await loginPage.verifyLoginSuccess();

        await openAccountPage.ensureAccountExists('SAVINGS');

        const accountNumber = await openAccountPage.getNewAccountNumber();

        expect(accountNumber).not.toBe('');

    });

});
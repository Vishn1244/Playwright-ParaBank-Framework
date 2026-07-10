import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LoginData } from '../../utils/LoginData';

test.describe('ParaBank Login Module', () => {

    test('Verify Valid Login', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const data = LoginData.getLoginData();

        await loginPage.openApplication();

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await loginPage.verifyLoginSuccess();

    });

    test('Verify Invalid Login', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const data = LoginData.getLoginData();

        await loginPage.openApplication();

        await loginPage.login(
            data.invalidUser.username,
            data.invalidUser.password
        );

        await loginPage.verifyLoginFailure(
            'The username and password could not be verified.'
        );

    });

});
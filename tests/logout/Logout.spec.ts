import { test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { LoginData } from '../../utils/LoginData';

test.describe('Logout Module', () => {

    test('Verify User Logout', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const logoutPage = new LogoutPage(page);

        const login = LoginData.getLoginData();

        console.log("Username:", login.validUser.username);
        console.log("Password:", login.validUser.password);

        await loginPage.openApplication();

        await loginPage.login(
            login.validUser.username,
            login.validUser.password
        );

        await logoutPage.logout();

        await logoutPage.verifyLogout();

    });

});
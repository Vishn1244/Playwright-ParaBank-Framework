import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ForgotLoginInfoPage } from '../../pages/ForgotLoginInfoPage';

test.describe('Forgot Login Information Module', () => {

    test('Verify Forgot Login Information', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const forgotPage = new ForgotLoginInfoPage(page);

        await loginPage.openApplication();

        // Verify login page
        await expect(page).toHaveURL(/index\.htm|login\.htm/);

        // Click Forgot Login Info
        await loginPage.clickForgotLoginInfo();

        // Wait for lookup page
        await page.waitForURL(/lookup\.htm/, { timeout: 10000 });

        console.log("Current URL:", page.url());

        await forgotPage.findLoginInformation();

        await forgotPage.verifyResult();

    });

});
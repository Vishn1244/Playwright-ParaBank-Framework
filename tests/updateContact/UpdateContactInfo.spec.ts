import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { UpdateContactInfoPage } from '../../pages/UpdateContactInfoPage';
import { LoginData } from '../../utils/LoginData';

test.describe('Update Contact Information Module', () => {

    test('Verify Update Contact Information', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const updatePage = new UpdateContactInfoPage(page);

        const user = LoginData.getLoginData();

        await loginPage.openApplication();

        await loginPage.login(
            user.username,
            user.password
        );

        await loginPage.verifyLoginSuccess();

        await updatePage.openUpdateContactPage();

        await updatePage.updateContactDetails();

        await updatePage.verifyProfileUpdated();

    });

});
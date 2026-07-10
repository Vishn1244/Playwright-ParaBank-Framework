import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { TestDataFactory } from '../../utils/TestDataFactory';
import { JsonUtility } from '../../utils/JsonUtility';

test.describe('ParaBank Registration Module', () => {

    test('Verify New User Registration', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);

        const user = TestDataFactory.createUser();

        await loginPage.openApplication();

        await loginPage.clickRegister();

        await registrationPage.registerUser(user);

        await registrationPage.verifyRegistrationSuccess(user.username);

        // Save generated credentials
        JsonUtility.saveUser(
            user.username,
            user.password
        );

        console.log('====================================');
        console.log('Registration Successful');
        console.log(`Username : ${user.username}`);
        console.log(`Password : ${user.password}`);
        console.log('====================================');

    });

});
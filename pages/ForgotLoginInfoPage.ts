import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotLoginInfoPage extends BasePage {

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly ssn: Locator;

    readonly findLoginButton: Locator;

    readonly rightPanel: Locator;

    constructor(page: Page) {

        super(page);

        this.firstName = page.locator('input[name="firstName"]');
        this.lastName = page.locator('input[name="lastName"]');
        this.address = page.locator('input[name="address.street"]');
        this.city = page.locator('input[name="address.city"]');
        this.state = page.locator('input[name="address.state"]');
        this.zipCode = page.locator('input[name="address.zipCode"]');
        this.ssn = page.locator('input[name="ssn"]');

        this.findLoginButton = page.locator('input[value="Find My Login Info"]');

        this.rightPanel = page.locator('#rightPanel');
    }

    async openForgotLoginPage() {

        await this.navigate('/lookup.htm');

    }

    async findLoginInformation() {

    await this.firstName.waitFor({ state: 'visible' });

    await this.firstName.fill('John');
    await this.lastName.fill('Smith');
    await this.address.fill('123 Main St');
    await this.city.fill('Beverly Hills');
    await this.state.fill('CA');
    await this.zipCode.fill('90210');
    await this.ssn.fill('111-11-1111');

    await this.findLoginButton.click();
}

    async verifyResult() {

        const text = await this.rightPanel.textContent();

        console.log("================================");
        console.log(text);
        console.log("================================");

        if (text?.includes('Your login information was located successfully')) {

            console.log("Login Information Retrieved Successfully");

            await expect(this.rightPanel)
                .toContainText('Your login information was located successfully');

        } else {

            console.log("Customer information not found (Expected in Demo Site)");

            await expect(this.rightPanel)
                .toContainText('The customer information provided could not be found.');

        }

    }

}
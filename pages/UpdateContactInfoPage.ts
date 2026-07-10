import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class UpdateContactInfoPage extends BasePage {

    readonly updateContactLink: Locator;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phone: Locator;

    readonly updateProfileButton: Locator;

    readonly successHeading: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {

        super(page);

        this.updateContactLink = page.getByRole('link', {
            name: 'Update Contact Info'
        });

        this.firstName = page.locator('#customer\\.firstName');

        this.lastName = page.locator('#customer\\.lastName');

        this.address = page.locator('#customer\\.address\\.street');

        this.city = page.locator('#customer\\.address\\.city');

        this.state = page.locator('#customer\\.address\\.state');

        this.zipCode = page.locator('#customer\\.address\\.zipCode');

        this.phone = page.locator('#customer\\.phoneNumber');

        this.updateProfileButton = page.locator('input[value="Update Profile"]');

        this.successHeading = page.getByRole('heading', {
            name: 'Profile Updated'
        });

        this.successMessage = page.locator('#rightPanel p').first();

    }

    async openUpdateContactPage(): Promise<void> {

        await this.click(this.updateContactLink);

        await expect(this.page).toHaveURL(/updateprofile\.htm/);

        await expect(this.address).toBeVisible();

    }

    async updateContactDetails(): Promise<void> {

        await this.address.clear();
        await this.address.fill('Madhapur');

        await this.city.clear();
        await this.city.fill('Hyderabad');

        await this.state.clear();
        await this.state.fill('Telangana');

        await this.zipCode.clear();
        await this.zipCode.fill('500081');

        await this.phone.clear();
        await this.phone.fill('9876543210');

        await this.click(this.updateProfileButton);

    }

    async verifyProfileUpdated(): Promise<void> {

        await expect(this.successHeading).toBeVisible();

        await expect(this.successMessage)
            .toContainText('Your updated address and phone number have been added');

        console.log("=================================");
        console.log("Profile Updated Successfully");
        console.log("=================================");

    }

}
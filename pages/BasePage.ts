import { expect, Locator, Page } from '@playwright/test';

export class BasePage {

    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void> {
        const maxAttempts = 3;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                await this.page.goto(url, {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                return;
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);

                if (attempt < maxAttempts && /ERR_INTERNET_DISCONNECTED|ERR_NETWORK_CHANGED|net::ERR|timed out/i.test(message)) {
                    console.warn(`Navigation attempt ${attempt} failed for ${url}: ${message}. Retrying...`);
                    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => undefined);
                    continue;
                }

                throw error;
            }
        }
    }

    async click(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value);
    }

    async clearAndFill(locator: Locator, value: string): Promise<void> {
        await locator.clear();
        await locator.fill(value);
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() || '';
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async waitForElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async verifyPageTitle(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async verifyUrl(expectedUrl: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(expectedUrl);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async takeScreenshot(fileName: string): Promise<void> {
        await this.page.screenshot({
            path: `screenshots/${fileName}.png`,
            fullPage: true
        });
    }
}
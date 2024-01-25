import { Page, Locator, expect } from '@playwright/test';
import { MainPage } from './mainPage';

export class LoggedInMainPage {
    readonly LOGOUT_BUTTON: Locator;
    readonly LOGGED_IN_DOC: Locator;

    constructor(public readonly page: Page) {
        this.LOGOUT_BUTTON = this.page.getByText('Log Out');
        this.LOGGED_IN_DOC = this.page.locator('#loginInfo');
    }

    async logoutDoc(page: Page) {
        // Navigate to the web page
        await this.LOGOUT_BUTTON.click();
    }

    async getLoginInfo(): Promise<Locator> {
        await expect(this.LOGGED_IN_DOC).toBeVisible();
        return this.LOGGED_IN_DOC;
    }
}
import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { docData } from '../../../fixtures/loginSetup';

export class MainPage {
    readonly PASSWORD_INPUT: Locator;
    readonly EMAIL_INPUT: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly MAIN_FORM_INFO: Locator;
    readonly INVALID_LOGIN_DIALOG: Locator;

    

    constructor(public readonly page: Page) {
        this.LOGIN_BUTTON = this.page.getByText('Log In');
        this.EMAIL_INPUT = this.page.getByPlaceholder('email');
        this.PASSWORD_INPUT = this.page.getByPlaceholder('password');
        this.MAIN_FORM_INFO = this.page.locator('#contentInfo');
        this.INVALID_LOGIN_DIALOG = this.page.locator('.swal2-popup');
    }

    async navigateToWebPage(baseUrl: string){
        // Navigate to the web page
        await this.page.goto(baseUrl);
    }

    async docLogin(docData: docData) {
        // Fill user infos up
        await this.EMAIL_INPUT.fill(docData.email);
        await this.PASSWORD_INPUT.fill(docData.password);
        await this.LOGIN_BUTTON.click();
    }

    async getMainForm(): Promise<Locator>{
        return this.MAIN_FORM_INFO;
    }

    async getFailedLoginDialog(): Promise<Locator>{
        return this.INVALID_LOGIN_DIALOG;
    }

    async getFailedLoginDialogPhrase(): Promise<Locator>{
        return this.INVALID_LOGIN_DIALOG.locator('.swal2-content');
    }

    async ackLoginFailedDialog() {
        await this.INVALID_LOGIN_DIALOG.locator('.swal2-confirm').click();
    }
}
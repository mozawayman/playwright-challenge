import { Page, Locator, expect } from '@playwright/test';

export class LoggedInMainPage {
    readonly LOGOUT_BUTTON: Locator;
    readonly LOGGED_IN_DOC: Locator;
    readonly CASE_DESCRIPTION_BOX: Locator;
    readonly CONDITION_SELECTOR: Locator;
    readonly NEXT_CASE_BUTTON: Locator;
    readonly MAIN_FORM_INFO: Locator;

    constructor(public readonly page: Page) {
        this.LOGOUT_BUTTON = this.page.getByText('Log Out');
        this.LOGGED_IN_DOC = this.page.locator('#loginInfo');
        this.CASE_DESCRIPTION_BOX = this.page.locator('#case');
        this.CONDITION_SELECTOR = this.page.locator('#conditions');
        this.NEXT_CASE_BUTTON = this.page.getByText('Next Case');
        this.MAIN_FORM_INFO = this.page.locator('#contentInfo');
    }

    /**
     * Click on the logout button
     */
    async logoutDoc() {
        // Navigate to the web page
        await this.LOGOUT_BUTTON.click();
    }

    /**
     * Getting the reference for logged in welcome message
     * @returns locator to the text 
     */
    async getLoginInfo(): Promise<Locator> {
        await expect(this.LOGGED_IN_DOC).toBeVisible();
        return this.LOGGED_IN_DOC;
    }

    /**
     * Getting the reference to the case text
     * @returns locator to the text
     */
    async getCaseDescription(): Promise<Locator> {
        await expect(this.CASE_DESCRIPTION_BOX).toBeVisible();
        return this.CASE_DESCRIPTION_BOX;
    }

    /**
     * Select the condition from the select structure
     * @param conditionoption option string
     */
    async selectCondition(conditionoption: string){
        await expect(this.CONDITION_SELECTOR).toBeEnabled()
        await this.CONDITION_SELECTOR.selectOption({label: conditionoption});
    }

    /**
     * Click on the next case button
     */
    async proceedToNextCase() {
        await this.NEXT_CASE_BUTTON.click();
    }

    /**
     * 
     * @returns Get Main form info
     */
    async getMainForm(): Promise<Locator>{
        return this.MAIN_FORM_INFO;
    }

}
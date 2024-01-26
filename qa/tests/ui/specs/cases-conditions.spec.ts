import { test, expect } from '@playwright/test'
import { totalSetup } from '../../../fixtures/combinedFixtures';
import { MainPage } from '../pageObjects/mainPage';
import { LoggedInMainPage } from '../pageObjects/loggedInMainPage';

test.describe('@DoctorWorking tests', () => {

  totalSetup('@e2eFlow User should be able to login and Finish work', async ({ page, loginSetup, caseSetup, baseURL }) => {
    if (!baseURL) {
      throw new Error("BASE_URL environment variable is not set")
    }
    const mainPage: MainPage = new MainPage(page);
    mainPage.navigateToWebPage(baseURL);
    await mainPage.docLogin(loginSetup.userData);
    const loggedInPageRef: LoggedInMainPage = new LoggedInMainPage(page);
    await loggedInPageRef.selectCondition('B302 Viral pharyngoconjunctivitis');
    await loggedInPageRef.proceedToNextCase();
    await loggedInPageRef.selectCondition('F340 Cyclothymic disorder');
    await loggedInPageRef.proceedToNextCase();
    await loggedInPageRef.selectCondition('F418 Other specified anxiety disorders');
    await loggedInPageRef.proceedToNextCase();
    await expect(await loggedInPageRef.getMainForm()).toHaveText('You are done.');
  });
  
  totalSetup('@NextCaseButton User should not be able to proceed without selecting a condition', async ({ page, loginSetup, caseSetup, baseURL }) => {
    if (!baseURL) {
      throw new Error("BASE_URL environment variable is not set")
    }
    const mainPage: MainPage = new MainPage(page);
    mainPage.navigateToWebPage(baseURL);
    await mainPage.docLogin(loginSetup.userData);
    const loggedInPageRef: LoggedInMainPage = new LoggedInMainPage(page);
    await loggedInPageRef.selectCondition('B302 Viral pharyngoconjunctivitis');
    await loggedInPageRef.proceedToNextCase();
    await expect(loggedInPageRef.NEXT_CASE_BUTTON).toBeDisabled();
  });

});
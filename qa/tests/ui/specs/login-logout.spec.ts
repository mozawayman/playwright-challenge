import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'; 
import { testLoginFixture } from '../../../fixtures/loginSetup';
import { MainPage } from '../pageObjects/mainPage';
import { docData } from '../../../fixtures/loginSetup';
import { LoggedInMainPage } from '../pageObjects/loggedInMainPage';

test.describe('@LoginAndLogout tests', () => {

  testLoginFixture('@Login @ui User should be able to login successfully', async ({ page, loginSetup, baseURL  }) => {
    if (!baseURL) {
      throw new Error("BASE_URL environment variable is not set")
    }
    const mainPage = new MainPage(page);
    mainPage.navigateToWebPage(baseURL);
    await mainPage.docLogin(loginSetup.userData);
    const loggedInPageRef: LoggedInMainPage = new LoggedInMainPage(page);
    await expect(await loggedInPageRef.getLoginInfo()).toHaveText('Logged in as: ' + loginSetup.userData.name);
  });
  
  testLoginFixture('@Logout @ui User should be able to logout successfully', async ({ page, loginSetup, baseURL  }) => {
    if (!baseURL) {
      throw new Error("BASE_URL environment variable is not set")
    }
    const mainPage = new MainPage(page);
    mainPage.navigateToWebPage(baseURL);
    await mainPage.docLogin(loginSetup.userData);
    const loggedInPageRef: LoggedInMainPage = new LoggedInMainPage(page);
    await expect(await loggedInPageRef.getLoginInfo()).toHaveText('Logged in as: ' + loginSetup.userData.name);
    await loggedInPageRef.logoutDoc();
    await expect(await mainPage.getMainForm()).toHaveText('Please Login to review cases.');
  });

  test('@FailedLogin @ui Failed Login with Unregistered user', async ({ page, baseURL }) => {
    let userData: docData = 
      {
        'email': faker.internet.email(),
        'password': faker.internet.password()
      };
    if (!baseURL) {
      throw new Error("BASE_URL environment variable is not set")
    }
    const mainPage = new MainPage(page);
    // Navigate to the web page
    await mainPage.navigateToWebPage(baseURL);
    await mainPage.docLogin(userData);
    await expect(await mainPage.getFailedLoginDialog()).toBeVisible();
    await expect(await mainPage.getFailedLoginDialogPhrase()).toHaveText('User with email: ' + '"'+userData.email+'"' + ' not found.');
    await mainPage.ackLoginFailedDialog();
  });

});
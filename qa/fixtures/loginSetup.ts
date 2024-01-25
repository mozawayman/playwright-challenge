import { test as base } from '@playwright/test';
import { request, expect  } from '@playwright/test';
import { faker } from '@faker-js/faker'; 
import { consola } from "consola";
import { MainPage } from '../tests/ui/pageObjects/mainPage';

export type docData = {
    name?: string;
    email: string;
    password: string;
};

// Extend base test by providing
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const testLoginFixture = base.extend({
  loginSetup: async ({ page }, use) => {
    consola.start("Starting User creation...");
    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL environment variable is not set")
    }
    // Set up the fixture.
    // Create a context that will issue http requests.
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  let userData: docData = 
    {
    'name': faker.internet.userName(),
    'email': faker.internet.email(),
    'password': faker.internet.password()
    };

  // Create a new doctor user with random Info
  const newDoctor = await context.post('/users/register', {
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    data: userData
  });

  expect(newDoctor.ok()).toBeTruthy();
  consola.success('User '+ userData.name +' created');
  consola.success('Moving on to the Main Page');
  const mainPage = await new MainPage(page).navigateToWebPage(process.env.BASE_URL);

  await use({userData,mainPage});
  }
});

export { expect } from '@playwright/test';
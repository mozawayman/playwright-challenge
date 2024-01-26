import { test as base } from '@playwright/test';
import { request, expect  } from '@playwright/test';
import { consola } from "consola";


// Setup for the user interaction tests
export const LoadUpPreConditions = base.extend({
  caseSetup: async ({}, use) => {
    // Set up the fixture.
    // Create a context that will issue http requests.
  const context = await request.newContext({});

    // Afterall delete cases
    consola.start('Cleaning any cases leftovers');
    await context.post('/cases', {
      headers: {
        'Accept': 'application/json',
      },
    });

    consola.success('Done...');

  // Importing cases to be reviewed
  consola.start("Importing cases...");
  const newCases = await context.post('/cases/import', {
    headers: {
      'Accept': 'application/json',
    },
  });

  expect(newCases.ok()).toBeTruthy();
  consola.success('List of Cases imported');

  // Importing conditions
  consola.start("Importing conditions...");
  const conditionsList = await context.post('/conditions/import', {
    headers: {
      'Accept': 'application/json',
    },
  });

  expect(conditionsList.ok()).toBeTruthy();
  consola.success('List of Conditions imported');
  
  await use({});

  // Afterall delete cases
  consola.start("Importing conditions...");
  await context.post('/cases', {
    headers: {
      'Accept': 'application/json',
    },
  });

  consola.success('List of Cases has been deleted');
  }

});

export { expect } from '@playwright/test';
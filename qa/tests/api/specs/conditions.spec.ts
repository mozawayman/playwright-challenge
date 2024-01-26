import { test, request, expect  } from '@playwright/test';
import { APIActions } from '../utils/api-helpers';

const apiActions = new APIActions();

test.describe('@ConditionsApi Import and get conditions', () => {

  test(`@API @ConditionsImport Import Conditionsq`, async ({}) => {
      const response = await apiActions.requestSetup('post','/conditions/import',{});
      await apiActions.verifyStatusCode(response);
  });

  test(`@API @ConditionsGet Get conditions List`, async ({}) => {

    await apiActions.requestSetup('post','/conditions/import',{});
    const listOfConditionsResponse = await apiActions.requestSetup('get','/conditions/',{});

    await apiActions.verifyStatusCode(listOfConditionsResponse);
    const gotAllConditions = await apiActions.checkResponseAgainstFileRef(await listOfConditionsResponse.json(), '../groundTruth/conditions.json');
    expect(gotAllConditions).toBeTruthy();
  });

});
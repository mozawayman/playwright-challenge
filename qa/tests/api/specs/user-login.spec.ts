import { test, request, expect  } from '@playwright/test';
import { APIActions } from '../utils/api-helpers';
import { faker } from '@faker-js/faker';
import { docData } from '../../../fixtures/loginSetup';

  const apiActions = new APIActions();

  test.describe('@UserApi @API Register and Login User', () => {

    test(`@API Register a new User`, async ({}) => {
        
        const userRegisterFields: string[] = ['_id', 'name', 'email', 'password', '__v'];

        const userData: docData = 
        {
        'name': faker.internet.userName(),
        'email': faker.internet.email(),
        'password': faker.internet.password()
        };

        const response = await apiActions.requestSetup('post','/users/register',userData);
        await apiActions.verifyStatusCode(response);
        await apiActions.verifyResponseBodyParams(userRegisterFields, await response.json());
    });

    test(`@API Login with freshly created user`, async ({}) => {
        
        const userloginFields: string[] = ['id', 'name', 'email'];

        const userData: docData = 
        {
        'name': faker.internet.userName(),
        'email': faker.internet.email(),
        'password': faker.internet.password()
        };

        await apiActions.requestSetup('post','/users/register',userData);
        
        const userToLoginData: docData = 
        {
        'email': userData.email,
        'password': userData.password
        };

        const loginResponse = await apiActions.requestSetup('post','/users/login',userToLoginData);

        await apiActions.verifyStatusCode(loginResponse);
        await apiActions.verifyResponseBodyParams(userloginFields, await loginResponse.json());
    });
  });
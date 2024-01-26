// import { test, request, expect  } from '@playwright/test';
// import { consola } from "consola";


// test.beforeAll(async ({ request }) => {
//     // Create a new repository
//     const response = await request.post('/user/repos', {
//       data: {
//         name: REPO
//       }
//     });
//     expect(response.ok()).toBeTruthy();
//   });

//   import { APIActions } from '@lib/APIActions';
//   import { test } from '@playwright/test';
  
//   const apiActions = new APIActions();
  
//   test(`@API getUsers`, async ({ request }) => {
//       const response = await request.get(`/api/users?per_page=1`);
//       await apiActions.verifyStatusCode(response);
  
//       //* Body Response Params and Body Response Headers are stored in single text file separated by #
//       const responseBodyParams = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[0];
//       await apiActions.verifyResponseBody(responseBodyParams, await response.json(), `Response Body`);
  
//       const responseBodyHeaders = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[1];
//       await apiActions.verifyResponseHeader(responseBodyHeaders, response.headersArray(), `Response Headers`);
//   });
  
//   test('should create a feature request', async ({ request }) => {
//     const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
//       data: {
//         title: '[Feature] request 1',
//         body: 'Feature description',
//       }
//     });
//     expect(newIssue.ok()).toBeTruthy();
  
//     const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
//     expect(issues.ok()).toBeTruthy();
//     expect(await issues.json()).toContainEqual(expect.objectContaining({
//       title: '[Feature] request 1',
//       body: 'Feature description'
//     }));
//   });

  
//   test.afterAll(async ({ request }) => {
//     // Delete the repository
//     const response = await request.delete(`/repos/${USER}/${REPO}`);
//     expect(response.ok()).toBeTruthy();
//   });
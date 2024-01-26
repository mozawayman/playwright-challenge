import { APIRequestContext, APIResponse, expect, request } from '@playwright/test';
import path from 'path';
import { consola } from 'consola';
import { Item, JsonHelper } from './json-helpers';


export class APIActions {

    /**
     * Return positive assertion on the http 200-299 range 
     * @param response 
     */
    async verifyStatusCode(response: APIResponse): Promise<void> {
        expect(response.ok()).toBeTruthy();
    }

    /**
     * Verify reponse parameters agaisn a list of fields
     * @param expectedResponseBodyParams 
     * @param responsePart 
     */
    async verifyResponseBodyParams(expectedResponseBodyParams: string[], responsePart: JSON): Promise<void> {
        let status = true;
        let fieldNames = `Parameter`;
        const responseToString = JSON.stringify(responsePart).trim();
        for (let headerKey of expectedResponseBodyParams) {
            if (!(responseToString.includes(headerKey.trim()))) {
                status = false;
                fieldNames = fieldNames + `, ` + headerKey;
                break;
            }
        }
        expect(status, `${fieldNames} was not present in the response body`).toBe(true);
    }

    /**
     * Blueprint for all API requests
     * @param method 
     * @param endpoint 
     * @param body 
     * @returns 
     */
    async requestSetup( method: string, endpoint:string, body?: object): Promise<APIResponse> {
        consola.start('Setting up ' +method+ ' request for ' +endpoint+ '...');
        const apiRequestContext: APIRequestContext = await request.newContext();
        const res = await apiRequestContext[method](endpoint, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                },
                data: body,
            });
            consola.success('Done!');
          return res;
    }


    /**
     * compares body with ground truth file
     * @param method 
     * @param endpoint 
     * @param body 
     * @returns 
     */
    async checkResponseAgainstFileRef(body: Item[], filePath:string): Promise<Boolean> {
        // Read the array from the file
        let fileArray: Item[] = JsonHelper.readFromFile(path.resolve(__dirname, filePath));
        if (fileArray.length !== body.length) {
            return false;
        }
        for (let i = 0; i < fileArray.length; i++) {
            if (body[i].code !== fileArray[i].code || body[i].description !== fileArray[i].description) {
              return false;
            }
        }
        return true;
    }
}
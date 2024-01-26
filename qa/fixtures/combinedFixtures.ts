import { mergeTests } from '@playwright/test';
import { testLoginFixture as loginSetup } from './loginSetup';
import { LoadUpPreConditions as loadData } from './userOpSetup';

export const totalSetup = mergeTests(loginSetup, loadData);
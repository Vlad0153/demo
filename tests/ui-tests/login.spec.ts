// runt this test 
//headless: npm run test ./tests/ui-tests/login.spec.ts
//headed: npm run testH ./tests/ui-tests/login.spec.ts
//headed in Chrome: npm run testC ./tests/ui-tests/login.spec.ts

import { test,expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';
import{ InventoryPage } from'../../pageObjects/inventoryPage';
import { standardUser,lockedUser } from "../../testData/userData";

test.describe('Login feature',()=>{    
    test('test simple login happy flow',async({page})=>{
        const loginPage = new LoginPage(page);
        const homePage = new InventoryPage(page);

        await loginPage.simpleLogin(standardUser.userName,standardUser.password);
        await expect(page).toHaveTitle(/Swag Labs/);
        await homePage.logOut(); 
    });
    test('test locked user login',async({page})=>{
        const loginPage = new LoginPage(page);

        await loginPage.lockedUserLogin(lockedUser.userName,lockedUser.password);
        await expect(page).toHaveTitle(/Swag Labs/);
    });

    test('test login password missing error message',async({page})=>{
        const loginPage = new LoginPage(page);

        await loginPage.openApplication();
        await expect(page).toHaveTitle(/Swag Labs/);
        await loginPage.imputUser(standardUser.userName)
        await loginPage.clickLoginNoPassword();            
    });
});
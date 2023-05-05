//commands to run this test 
//headless: npm run test ./tests/ui-tests/addToCart.spec.ts
//headed: npm run testH ./tests/ui-tests/addToCart.spec.ts
//headed in Chrome: npm run testC ./tests/ui-tests/addToCart.spec.ts

import { test,expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';
import{ InventoryPage } from'../../pageObjects/inventoryPage';
import { standardUser } from "../../testData/userData";

test.describe('Login feature',()=>{    
    test('add to items in cart and verify them ',async({page})=>{
        const loginPage = new LoginPage(page);
        const homePage = new InventoryPage(page);

        await loginPage.simpleLogin(standardUser.userName,standardUser.password);
        await expect(page).toHaveTitle(/Swag Labs/);
        await homePage.addToCartBackpack();
        await homePage.addToCartBikeLight();
        await homePage.itemsInCart();
        await homePage.logOut();
    });    
});
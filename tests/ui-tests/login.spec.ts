// runt this test 
import { test,expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';
import{InventoryPage} from'../../pageObjects/inventoryPage';
import { WebActions } from "../../lib/webActions";
import { standardUser } from "../../testData/userData";

test.describe('Login feature',()=>{    
    test.only('test simple login',async({page})=>{

        const loginPage = new LoginPage(page);
        const homePage = new InventoryPage(page);

        await test.step('Simple login happy flow',async() => {
            await loginPage.simpleLogin(standardUser.userName,standardUser.password);
            await expect(page).toHaveTitle(/Swag Labs/);
            await homePage.logOut();         
            await page.pause();        
        });
    });

    test('test login imput fields',async({page})=>{
        const loginPage = new LoginPage(page); 
        
        await loginPage.openApplication();
            await expect(page).toHaveTitle(/Swag Labs/);
            await loginPage.imputUser(standardUser.userName)
            await loginPage.imputPassword(standardUser.password)        
            

            await page.pause(); 
        
    
    
    })
});
import { Page, expect } from '@playwright/test';
import { WebActions } from '../lib/webActions';

let webActions:WebActions;

export class InventoryPage{

    //LoginPage locators:
  
    menu = this.page.getByRole('button', { name: 'Open Menu' });
    logout = this.page.getByRole('link', { name: 'Logout' });
    shoppingCartButton = this.page.locator('.shopping_cart_link');
    shoppingCartList = this.page.locator('[class="cart_list"]');
    sauceLabsBackpack = this.page.locator('#item_4_img_link');
    addBackpackToCart = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    bikeLight = this.page.locator('#item_0_img_link');
    addBikeLightToCart = this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');        
  
    constructor(private page: Page) {
  
      webActions = new WebActions(this.page);
    };     
    async logOut():Promise<void>{
        await this.menu.isVisible()
        await this.menu.isEnabled()
        await this.menu.click();
        await this.logout.isVisible()
        await this.logout.isEnabled()
        await this.logout.click();
    };
    async addToCartBackpack():Promise<void>{
        await this.addBackpackToCart.isVisible()
        await this.addBackpackToCart.isEnabled()
        await this.addBackpackToCart.click();
    };
    async addToCartBikeLight():Promise<void>{
        await this.addBikeLightToCart.isVisible()
        await this.addBikeLightToCart.isEnabled()
        await this.addBikeLightToCart.click();
    }; 
    async itemsInCart():Promise<void>{
        await webActions.verifyElementIsDisplayed(this.shoppingCartButton);
        await this.shoppingCartButton.click();
        await webActions.verifyElementIsDisplayed(this.shoppingCartList);
        await expect(this.shoppingCartList).toContainText('Sauce Labs Backpack');
        await expect(this.shoppingCartList).toContainText('Sauce Labs Bike Light');
    };
}
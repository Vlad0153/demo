import { Page, expect } from '@playwright/test';
import { WebActions } from '../lib/webActions';
import envUrl from '../testData/envUrls.json';

let webActions:WebActions;

export class LoginPage{

  //LoginPage locators:

  userName = this.page.locator('[data-test="username"]');
  password = this.page.locator('[data-test="password"]');
  loginButton = this.page.locator('[data-test="login-button"]');
  loginError = this.page.locator('[data-test="error"]');

  constructor(private page: Page) {

    webActions = new WebActions(this.page);
  };
  
  async openApplication():Promise<void>{
    await webActions.navigateToURL(envUrl.testEnv)
  };
  async imputUser(name: string):Promise<void>{
    await webActions.verifyElementIsDisplayed(this.userName);
    await webActions.enterElementText(this.userName, name);
  };
  async imputPassword(password: string):Promise<void>{
    await webActions.verifyElementIsDisplayed(this.password);
    await webActions.enterElementText(this.password,password);
  };
  async clickLogin():Promise<void>{
    await this.loginButton.click();
  };
  async clickLoginNoPassword():Promise<void>{
    await this.loginButton.click();
    await webActions.verifyElementIsDisplayed(this.loginError)
    await expect(this.loginError).toContainText('Password is required')
  };
  async simpleLogin(name:string,password:string): Promise<void> {
    await this.page.goto(envUrl.testEnv);
    await webActions.verifyElementIsDisplayed(this.userName);
    await webActions.enterElementText(this.userName,name);
    await webActions.verifyElementIsDisplayed(this.password);
    await webActions.enterElementText(this.password,password);
    await webActions.clickElement(this.loginButton);
  };
  async lockedUserLogin(name:string,password:string): Promise<void> {
    await this.page.goto(envUrl.testEnv);
    await webActions.verifyElementIsDisplayed(this.userName);
    await webActions.enterElementText(this.userName,name);
    await webActions.verifyElementIsDisplayed(this.password);
    await webActions.enterElementText(this.password,password);
    await webActions.clickElement(this.loginButton);
    await webActions.verifyElementIsDisplayed(this.loginError);
    await expect(this.loginError).toContainText('this user has been locked out');
  }; 
}
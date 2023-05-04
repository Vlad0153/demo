//run test command: npx playwright test login.spec.ts --ui
import { test, expect } from '@playwright/test';

test('test login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');  
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('button#react-burger-menu-btn').click();
  page.pause()
  //await page.locator('.shopping_cart_link').click();

  ///.shopping_cart_link
});
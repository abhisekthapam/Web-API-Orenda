import { chromium, expect, test } from '@playwright/test';

test('"Order Now" button is present on the homepage', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/');
  const orderNowButton = page.locator('button:has-text("Order Now")');
  await expect(orderNowButton).toBeVisible();
  await expect(orderNowButton).toBeEnabled();
  await browser.close();
});

test('"Place Order" button is present on the menu page', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/menu');
  const placeOrderButton = page.locator('button:has-text("Place Order")');
  await expect(placeOrderButton).toBeVisible();
  await expect(placeOrderButton).toBeEnabled();
  await browser.close();
});


test('"Login" button is present on the login page', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/login');
    const placeOrderButton = page.locator('button:has-text("Login")');
    await expect(placeOrderButton).toBeVisible();
    await expect(placeOrderButton).toBeEnabled();
    await browser.close();
  });
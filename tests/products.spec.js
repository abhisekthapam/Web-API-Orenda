import { chromium, expect, test } from '@playwright/test';

test('Return items successfully', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const response = await page.request.get('http://localhost:4000/api/v1/menu/allitems');
    expect(response.status()).toBe(200);
    await browser.close();
});

test('Return data in JSON format', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const response = await page.request.get('http://localhost:4000/api/v1/menu/allitems');
    expect(response.headers()['content-type']).toContain('application/json');
    await browser.close();
});

test('Return items with correct structure', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const response = await page.request.get('http://localhost:4000/api/v1/menu/allitems');
    const data = await response.json();
    data.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('price');
    });

    await browser.close();
});


import { chromium, expect, test } from '@playwright/test';

test.setTimeout(60000); 

test('Table exists on the admin page', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6ImFiaGlzZWsiLCJlbWFpbCI6ImFiaGlzZWtAZ21haWwuY29tIiwicGhvbmUiOiI5NzQ1MjU4NDAzIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyNC0xMi0xNlQwMTo0MzoxNy45OTZaIiwiaWF0IjoxNzQwOTAyMTQ0LCJleHAiOjE3NDA5MDU3NDR9.VRp4PXuHJ4uDSeIxdSm4XZ8ADTTepIkTKQUU_4kCdLc';
    await page.goto('http://localhost:5173/admin-product', { waitUntil: 'networkidle' }); 
    const response = await page.request.get('http://localhost:4000/api/v1/user/all', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    if (response.status() !== 200) {
        console.log('Access Denied:', await response.text()); 
    }
    expect(response.status()).toBe(200);
    await page.waitForSelector('table', { state: 'visible' });
    await page.waitForSelector('tbody', { state: 'visible' });
    const tableExists = await page.locator('table').isVisible();
    const tbodyExists = await page.locator('tbody').isVisible();
    expect(tableExists).toBe(true);
    expect(tbodyExists).toBe(true);
    await browser.close();
});

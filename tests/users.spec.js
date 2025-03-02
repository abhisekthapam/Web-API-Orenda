import { chromium, expect, test } from '@playwright/test';

test('Return users successfully', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6ImFiaGlzZWsiLCJlbWFpbCI6ImFiaGlzZWtAZ21haWwuY29tIiwicGhvbmUiOiI5NzQ1MjU4NDAzIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyNC0xMi0xNlQwMTo0MzoxNy45OTZaIiwiaWF0IjoxNzQwOTAyMTQ0LCJleHAiOjE3NDA5MDU3NDR9.VRp4PXuHJ4uDSeIxdSm4XZ8ADTTepIkTKQUU_4kCdLc';
    const response = await page.request.get('http://localhost:4000/api/v1/user/all', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    expect(response.status()).toBe(200);
    await browser.close();
});

test('Return data in JSON format', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6ImFiaGlzZWsiLCJlbWFpbCI6ImFiaGlzZWtAZ21haWwuY29tIiwicGhvbmUiOiI5NzQ1MjU4NDAzIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyNC0xMi0xNlQwMTo0MzoxNy45OTZaIiwiaWF0IjoxNzQwOTAyMTQ0LCJleHAiOjE3NDA5MDU3NDR9.VRp4PXuHJ4uDSeIxdSm4XZ8ADTTepIkTKQUU_4kCdLc';
    const response = await page.request.get('http://localhost:4000/api/v1/user/all', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    expect(response.headers()['content-type']).toContain('application/json');
    await browser.close();
});

test('Return users with correct structure', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6ImFiaGlzZWsiLCJlbWFpbCI6ImFiaGlzZWtAZ21haWwuY29tIiwicGhvbmUiOiI5NzQ1MjU4NDAzIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyNC0xMi0xNlQwMTo0MzoxNy45OTZaIiwiaWF0IjoxNzQwOTAyMTQ0LCJleHAiOjE3NDA5MDU3NDR9.VRp4PXuHJ4uDSeIxdSm4XZ8ADTTepIkTKQUU_4kCdLc';
    const response = await page.request.get('http://localhost:4000/api/v1/user/all', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const data = await response.json();
    data.forEach(user => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password');
        expect(user).toHaveProperty('phone');
        expect(user).toHaveProperty('role');
        expect(user).toHaveProperty('createdAt');
    });
    await browser.close();
});

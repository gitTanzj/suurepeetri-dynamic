import { test, expect } from '@playwright/test';

test.describe('Admin panel testing', () => {
  test.beforeEach(async ({ page }) => {

    // Navigeerib lehele
    await page.goto("http://localhost:5173/");
  
    // Sisestab korrektse kasutajanime ja parooli ning vajutab submit nuppu.
    await page.fill('input[name=username]', 'suurepeetriadmin')
    await page.fill('input[name=password]', 'qwerty')
    await page.click('button[type=submit]')
  });
  
  test('Admin is logged in and can see the admin panel', async ({ page }) => {
    // Ootab kuni leht laeb ja võrdleb lehe url'i.
    await page.waitForNavigation();
    expect(page.url()).toBe('http://localhost:5173/#/contents/about');
  });

  test('Data is fetched from API', async ({ page }) => {
    // Leiab üles Edit nupu selle labeli järgi ja teeb kindlaks, et see on nähtav. Sellest võib järeldada, et API-st on andmed kätte saadud.
    const editButton = page.getByLabel('Edit')
    await expect(editButton).toBeVisible();
  });

  test('Admin can change content', async ({ page }) => {
    await page.getByLabel('Edit').click()
    // Sisestab uue pealkirja koos suvalise numbriga, et vältida konflikte testide vahel.
    await page.fill('input[name=title]', `Uus pealkiri ${Math.random()}`)

    // Salvestab muudatused
    await page.getByLabel('Save').click()
    await page.waitForNavigation();
    expect(page.url()).toBe('http://localhost:5173/#/contents/about');
  });
});
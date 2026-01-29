import { test, expect } from '@playwright/test'

test('demo login opens dashboard', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    await page.getByRole('button', { name: /demo login|демо-вход/i }).click()
    await expect(page).toHaveURL(/\/(\?|$)/)
    await expect(page.getByRole('heading', { name: /welcome back|с возвращением/i })).toBeVisible()
})

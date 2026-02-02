import { test, expect } from '@playwright/test'

test.describe('demo flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: /demo login|демо-вход/i }).click()
        await expect(page.getByRole('heading', { name: /welcome back|с возвращением/i })).toBeVisible()
    })

    test('demo login opens dashboard', async ({ page }) => {
        await expect(page).toHaveURL(/\/(\?|$)/)
    })

    test('navigate to Items', async ({ page }) => {
        await page.getByRole('link', { name: /items|элементы/i }).click()
        await expect(page).toHaveURL(/\/items/)
        await expect(page.getByRole('heading', { name: /^items$|^элементы$/i })).toBeVisible()
    })

    test('navigate to Settings', async ({ page }) => {
        await page.getByRole('link', { name: /settings|настройки/i }).click()
        await expect(page).toHaveURL(/\/settings/)
        await expect(page.getByRole('heading', { name: /^settings$|^настройки$/i })).toBeVisible()
    })

    test('logout returns to login', async ({ page }) => {
        await page.getByRole('button', { name: /demo user|user|пользователь/i }).click()
        await page.getByRole('menuitem', { name: /log out|выйти/i }).click()
        await expect(page).toHaveURL(/\//)
        await expect(page.getByRole('heading', { name: /sign in|вход/i })).toBeVisible()
    })
})

test.describe('Items CRUD', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: /demo login|демо-вход/i }).click()
        await expect(page.getByRole('heading', { name: /welcome back|с возвращением/i })).toBeVisible()
        await page.getByRole('link', { name: /items|элементы/i }).click()
        await expect(page).toHaveURL(/\/items/)
    })

    test('create item opens modal and submits', async ({ page }) => {
        await page.getByRole('button', { name: /create item|создать элемент/i }).click()
        await expect(page.getByRole('dialog')).toBeVisible()
        await expect(page.getByRole('heading', { name: /create item|создать элемент/i })).toBeVisible()

        const titleInput = page.getByRole('textbox', { name: /title|название/i })
        await titleInput.fill('E2E test item')
        await page.getByRole('button', { name: /^create$|^создать$/i }).click()

        await expect(page.getByRole('dialog')).not.toBeVisible()
        // New item is appended by MSW — with limit 10 it's on page 2
        const nextBtn = page.getByRole('button', { name: /next|вперёд/i })
        if (await nextBtn.isVisible()) await nextBtn.click()
        await expect(page.getByRole('link', { name: 'E2E test item' })).toBeVisible()
    })

    test('navigate to item detail and back', async ({ page }) => {
        const tableLink = page.getByRole('table').getByRole('link').first()
        await tableLink.click()
        await expect(page).toHaveURL(/\/items\/[^/]+/)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

        await page.getByRole('link', { name: /back to list|назад к списку/i }).click()
        await expect(page).toHaveURL(/\/items/)
    })
})

test.describe('Components page (dev)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: /demo login|демо-вход/i }).click()
        await expect(page.getByRole('heading', { name: /welcome back|с возвращением/i })).toBeVisible()
    })

    test('components page shows UI reference', async ({ page }) => {
        await page.goto('/components')
        await expect(page).toHaveURL(/\/components/)
        await expect(page.getByRole('heading', { name: /components|компоненты/i })).toBeVisible()
        // Button section: CardTitle is a div; check for an example button
        await expect(page.getByRole('button', { name: /^default$/i }).first()).toBeVisible()
    })
})

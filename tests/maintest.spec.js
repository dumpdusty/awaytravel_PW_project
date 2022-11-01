import {test, expect} from "@playwright/test";

test('test_1.0', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await expect(page.locator('[aria-label="homepage"]')).toBeVisible()
})

test('test_1.1', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await expect(page.locator('[class="header--search"]',{hasText: 'Log in'})).toBeVisible()
})

test('test_2.0', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await page.locator('[class="nav_desktop_item_anchorContent__Nl3LP"]', {hasText: 'Stores'}).click()
    await expect(page).toHaveURL('https://www.awaytravel.com/stores')
})

test('test_2.1', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await page.locator('[class="nav_desktop_item_anchorContent__Nl3LP"]', {hasText: 'Stores'}).click()
    await expect(page.locator('[class="masthead_title__lp08b"]')).toHaveText('Visit us IRL')
})

test('test_3.0', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await page.locator('[class="nav_desktop_item_anchorContent__Nl3LP"]', {hasText: 'Stores'}).click()
    await expect(page.locator('[class="content_tile_medium_diptych_head__HZtjM"]', {hasText: 'Chicago'})).toBeVisible()
})
//It`s my first experience with Playwright, so it could be really weird )))


import {expect, test} from "@playwright/test";

test('test_1.0 Check the logo', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await page.getByRole('button', { name: 'Close email subscription dialog' }).click();
    await expect(page.locator('[aria-label="homepage"]')).toBeVisible()
})

test('test_1.1 Check the "Log in" btn', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await page.getByRole('button', { name: 'Close email subscription dialog' }).click();
    test.setTimeout(50000);
    await expect(page.locator('[class="header--search"]', {hasText: 'Log in'})).toBeVisible()
})

test('test_2.0 Check the URL', async function ({page}) {
    await page.goto('https://www.awaytravel.com/');
    await page.getByRole('button', { name: 'Close email subscription dialog' }).click();
    await page.getByRole('link', { name: 'Stores' }).click();
    test.setTimeout(50000);
    await expect(page).toHaveURL('https://www.awaytravel.com/stores');
})

test('test_2.1 Check the title', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await page.locator('[class^="nav_desktop_item_anchorContent"]', {hasText: 'Stores'}).click()
    test.setTimeout(50000);
    await expect(page).toHaveTitle('VISIT US IRL')
})


test('test_3.0 Check the store city', async function ({page}) {
    const cityArray = ['Austin', 'Boston', 'Chicago', 'Dallas', 'Houston', 'LA: Venice Beach', 'LA: West Hollywood', 'London', 'NYC: NoHo', 'NYC: Williamsburg', 'San Francisco', 'Seattle', 'Toronto']
    await page.goto('https://www.awaytravel.com/')
    await page.locator('[class^="nav_desktop_item_anchorContent"]', {hasText: 'Stores'}).click()
    for (let i = 0; i < cityArray.length; i++) {
        await expect(page.locator('[class="content_tile_medium_diptych_head__HZtjM"]', {hasText: `${cityArray[i]}`}))
            .toBeVisible()
    }
})

test('test_3.1 Check the store address', async function ({page}) {
    const addressArray = ['TX 78758', 'MA 02210', 'IL 60610', 'TX 75205', 'TX 77027', 'CA 90291', 'CA 90069', 'WC2H 9LL', 'NY 10012', 'NY 11249', 'CA 94102', 'WA 98105', 'ON M6A 2T9']
    await page.goto('https://www.awaytravel.com/')
    await page.locator('[class^="nav_desktop_item_anchorContent"]', {hasText: 'Stores'}).click()
    for (let i = 0; i < addressArray.length; i++) {
        await expect(page.locator('[class^="content_tile_medium_diptych_dek"]', {hasText: `${addressArray[i]}`}))
            .toBeVisible()
    }
})

test('test_3.2 Check the "SEE STORE" CTA', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await page.locator('[class^="nav_desktop_item_anchorContent"]', {hasText: 'Stores'}).click()
    const ctaCount = await page.locator('div[data-attr="content-tile-diptych"]').count()
    for (let i = 0; i < ctaCount; i++) {
        await expect(page.locator('div[data-attr="content-tile-diptych"]')).toHaveJSProperty('data-link', '/stores/*')
    }
})

test('test_5.0 Given store`s title', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await page.locator('[class^="nav_desktop_item_anchorContent"]', {hasText: 'Stores'}).click()
    await page.locator('[data-link="/stores/chicago"]').click()
    await expect(page.locator('[itemprop="description"]')).toBeVisible()
    await expect(page.locator('[itemprop="name"]')).toHaveText('Away in Chicago: Gold Coast')
})

test('test_5.1 store descriptions has the links', async function ({page}) {
    await page.goto('https://www.awaytravel.com/')
    await page.locator('[class^="nav_desktop_item_anchorContent"]', {hasText: 'Stores'}).click()
    await page.locator('[data-link="/stores/chicago"]').click()
    await page.locator('[href="tel:6466493191"]')
    await page.locator('[href="mailto:goldcoast@awaytravel.com"]')
    await page.locator('[href="/help/our-stores"]').click()
    await expect(page).toHaveURL('https://www.awaytravel.com/help/our-stores')
})

test('test_6.0 Additional store information', async function ({page}) {
    await page.goto('https://www.awaytravel.com/stores/austin')
    await expect.soft(page.locator('text=Sanitizing stations')).toHaveCount(1)
    await expect.soft(page.locator('text=Payment Options')).toBeVisible()
    await page.locator('text=Curbside pickup')
})

test('test_6.1', async function ({page}) {
    await page.goto('https://www.awaytravel.com/stores/austin')
    await expect.soft(page.locator('#main-content svg >> nth=0'))
        .toHaveAttribute('height', '80')
    await expect.soft(page.locator('#main-content svg >> nth=1'))
        .toHaveAttribute('height', '80')
    await expect.soft(page.locator('#main-content svg >> nth=1'))
        .toHaveAttribute('height', '80')
})

test('test_7.0 Gallery tests', async function ({page}) {

    await page.goto('https://www.awaytravel.com/stores/austin')
    await page.getByRole('button', { name: 'Close email subscription dialog' }).click();

    await page.locator('div:nth-child(2) > .store_location_gallery_slideImage__hmQua > span > .image_component__IJv7W')
    await page.locator('[class^="store_location_gallery_nextButton"]').click();
    await page.locator('div:nth-child(3) > .store_location_gallery_slideImage__hmQua > span > .image_component__IJv7W')
    await page.locator('[class^="store_location_gallery_prevButton"]').click();
    await page.locator('div:nth-child(2) > .store_location_gallery_slideImage__hmQua > span > .image_component__IJv7W')
    await page.locator('[class^="store_location_gallery_prevButton"]').click();
})

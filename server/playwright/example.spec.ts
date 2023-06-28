import { test, expect } from '@playwright/test'

test('completes a session solo', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByTestId('first-create-room-button').click()
  await expect(page.getByRole('heading', { name: "Your team's room code", exact: true })).toBeVisible()
})

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/')

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click()

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/)
// })

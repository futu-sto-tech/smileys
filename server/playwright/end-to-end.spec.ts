import { test, expect } from '@playwright/test'

test('host completes a session without participants', async ({ page }) => {
  // Arrange
  const userName = 'John Doe'

  // Act & Assert
  await page.goto('http://localhost:3000/')
  await page.getByRole('button', { name: 'Accept' }).click()
  await page.getByTestId('first-create-room-button').click()
  await expect(page.getByRole('heading', { name: "Your team's room code", exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Copy link' }).click()
  await page.getByRole('button', { name: 'Join room!' }).click()
  await page.getByRole('textbox').fill(userName)
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('textbox').fill('happy')
  await page
    .getByAltText(/^GIPHY.*/)
    .first()
    .click()
  await page.getByRole('button', { name: 'Choose Gif' }).click()
  await expect(page.getByText(userName)).toBeVisible()
  await page.getByRole('button', { name: 'Start' }).click()
  await expect(page.getByTestId('user-gif')).toBeVisible()
  await page.getByRole('button', { name: 'End Session' }).click()
  await expect(page.getByRole('heading', { name: 'Thanks for joining!', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Go to homepage' }).click()
  await expect(page.getByRole('heading', { name: 'A way for your remote', exact: true })).toBeVisible()
})

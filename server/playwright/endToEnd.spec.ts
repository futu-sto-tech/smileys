import { test, expect } from '@playwright/test'

test('host completes a session without participants', async ({ page }) => {
  // Arrange
  const userName = 'John Doe'

  // Act & Assert
  await page.goto('http://localhost:3000/')
  const clicksOnAccept = await page.getByRole('button', { name: 'Accept' }).click()
  const clicksOnCreateRoom = await page.getByTestId('first-create-room-button').click()
  const checksIfRoomWasCreated = await expect(
    page.getByRole('heading', { name: "Your team's room code", exact: true })
  ).toBeVisible()

  const clicksOnJoinRoom = await page.getByRole('button', { name: 'Join room!' }).click()
  const fillsUsername = await page.getByRole('textbox').fill(userName)
  const clicksOnContine = await page.getByRole('button', { name: 'Continue' }).click()
  const searchesGifForHappy = await page.getByRole('textbox').fill('happy')
  const clicksOnFirstGif = await page
    .getByAltText(/^GIPHY.*/)
    .first()
    .click()

  const clicksOnChooseGifAndLeavesLobby = await page.getByRole('button', { name: 'Choose' }).click()
  const checksIfnameIsCorrect = await expect(page.getByText(userName)).toBeVisible()
  const startsTheGame = await page.getByRole('button', { name: 'Start' }).click()
  const checksIfGifIsDisplayed = await expect(page.getByTestId('user-gif')).toBeVisible()
  const endsTheSession = await page.getByRole('button', { name: 'End Session' }).click()
  const checksIfOnEndPage = await expect(
    page.getByRole('heading', { name: 'Thanks for joining!', exact: true })
  ).toBeVisible()

  const clicksOnGoToHomePage = await page.getByRole('button', { name: 'Go to homepage' }).click()
  const checksIfOnHomepage = await expect(
    page.getByRole('heading', { name: 'A way for your remote', exact: true })
  ).toBeVisible()
})

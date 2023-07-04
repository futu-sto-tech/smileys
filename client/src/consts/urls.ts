import { VITE_SERVER_ADDRESS } from './envs'

const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs'
const GIPHY_BASE_URL_SEARCH = 'https://api.giphy.com/v1/gifs/search'
const GIPHY_BASE_URL_TRENDING = 'https://api.giphy.com/v1/gifs/trending'

const BASE_SERVER_URL = VITE_SERVER_ADDRESS

export const SERVER_URLS = {
  SESSION_EXISTS: BASE_SERVER_URL + 'session-exists',
  SEND_FEEDBACK: BASE_SERVER_URL + 'session-exists',
}

export const GIPHY_URLS = {
  GIPHY_BASE_URL,
  GIPHY_BASE_URL_TRENDING,
  GIPHY_BASE_URL_SEARCH,
}

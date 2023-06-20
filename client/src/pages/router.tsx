/* existing imports */
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import HomePage from '../pages/HomePage'
import BrowseGifPage from '../pages/BrowseGifPage'
import EnterNamePage from '../pages/EnterNamePage'
import ShareRoomPage from '../pages/ShareRoomPage'
import SelectGifPage from '../pages/SelectGifPage'
import PresentGifPage from '../pages/PresentGifPage'
import RedirectManager from '../components/RedirectManager'
import ErrorPage from './ErrorPage/ErrorPage'
import EndGamePage from './EndGamePage'
import NotFoundPage from './NotFoundPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="name/:roomId" element={<EnterNamePage />} />
      <Route path="create/:roomId" element={<ShareRoomPage />} />
      <Route path="browse/:roomId" element={<RedirectManager Component={BrowseGifPage} page="BrowseGifPage" />} />
      <Route path=":roomId/:gifId" element={<RedirectManager Component={SelectGifPage} page="SelectGifPage" />} />
      <Route path=":roomId" element={<RedirectManager Component={PresentGifPage} page="PresentGifPage" />} />
      <Route path="end" element={<EndGamePage />} />
      <Route path="*" element={<RedirectManager Component={NotFoundPage} page="NotFoundPage" />} />
    </Route>
  )
)

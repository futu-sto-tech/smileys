/* existing imports */
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import HomePage from '../pages/HomePage'
import RoomPage from '../pages/RoomPage'
import EnterNamePage from '../pages/EnterNamePage'
import ShareRoomPage from '../pages/ShareRoomPage'
import SelectGifPage from '../pages/SelectGifPage'
import GifPresentationPage from './GifPresentationPage'
import SuspendSessionRoute from '../components/ProtectedRouteBySession'
import ErrorPage from './ErrorPage/ErrorPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="name/:roomId" element={<EnterNamePage />} />
      <Route path="create/:roomId" element={<ShareRoomPage />} />
      <Route path=":roomId" element={<SuspendSessionRoute Component={RoomPage} />} />
      <Route path=":roomId/:gifId" element={<SuspendSessionRoute Component={SelectGifPage} />} />
      <Route path="present/:roomId" element={<SuspendSessionRoute Component={GifPresentationPage} />} />
      {/* <Route path="*" element={<p>Page not found 😢</p>} /> */}
    </Route>
  )
)

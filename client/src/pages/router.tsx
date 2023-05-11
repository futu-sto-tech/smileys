/* existing imports */
import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import HomePage from '../pages/HomePage'
import RoomPage from '../pages/RoomPage'
import EnterNamePage from '../pages/EnterNamePage'
import ShareRoomPage from '../pages/ShareRoomPage'
import SelectGifPage from '../pages/SelectGifPage'
import GifPresentationPage from './GifPresentationPage'
import SuspendSessionRoute from '../components/ProtectedRouteBySession'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/name/:roomId',
    element: <EnterNamePage />,
  },
  {
    path: '/create/:roomId',
    element: <ShareRoomPage />,
  },

  {
    path: '/:roomId',
    element: <SuspendSessionRoute Component={RoomPage} />,
  },
  {
    path: '/:roomId/:gifId',
    element: <SuspendSessionRoute Component={SelectGifPage} />,
  },
  {
    path: '/present/:roomId',
    element: <SuspendSessionRoute Component={GifPresentationPage} />,
  },
])

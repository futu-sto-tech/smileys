/* existing imports */
import { createBrowserRouter } from 'react-router-dom'
import Layout from './HomePage/Layout'
import HomePage from '../pages/HomePage'
import RoomPage from '../pages/RoomPage'
import EnterNamePage from '../pages/EnterNamePage'
import ShareRoomPage from '../pages/ShareRoomPage'
import SelectGifPage from '../pages/SelectGifPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/name/:id',
    element: <EnterNamePage />,
  },

  {
    path: '/create/:id',
    element: <ShareRoomPage />,
  },

  {
    path: '/:id',
    element: <RoomPage />,
  },

  {
    path: '/:id/:gifId',
    element: <SelectGifPage />,
  },
])

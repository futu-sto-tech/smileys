/* existing imports */
import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
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
    element: (
      <Layout>
        <EnterNamePage />
      </Layout>
    ),
  },

  {
    path: '/create/:id',
    element: (
      <Layout>
        <ShareRoomPage />
      </Layout>
    ),
  },

  {
    path: '/:id',
    element: (
      <Layout>
        <RoomPage />
      </Layout>
    ),
  },

  {
    path: '/:id/:gifId',

    element: (
      <Layout>
        <SelectGifPage />
      </Layout>
    ),
  },
])

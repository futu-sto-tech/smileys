/* existing imports */
import { createBrowserRouter } from 'react-router-dom'
import Layout from './HomePage/Layout'
import HomePage from './HomePage'
import RoomPage from './RoomPage'

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
    path: '/:id',
    element: <RoomPage />,
  },
])

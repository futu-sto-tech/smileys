/* existing imports */
import { createBrowserRouter } from 'react-router-dom'
import Layout from './HomePage/Layout'
import HomePage from './HomePage'
import RoomPage from './RoomPage'
import { AppProvider } from '../shared/AppContext'

export const router = createBrowserRouter([
  {
    element: <AppProvider children={undefined} />,
    children: [
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
    ],
  },
])

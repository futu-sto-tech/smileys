import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import { AppProvider } from './shared/AppContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { router } from './pages/router'
import Layout from './pages/Layout'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

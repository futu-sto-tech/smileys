import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom'
import { AppProvider } from './shared/AppContext'
import Layout from './pages/HomePage/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'

import { router } from './pages/router'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

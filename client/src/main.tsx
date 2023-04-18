import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import { AppProvider } from './shared/AppContext'
import Layout from './pages/HomePage/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import SelectGifPage from './pages/SelectGifPage'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route path="/:roomId" element={<RoomPage />} />
            <Route path="/:roomId/:gifId" element={<SelectGifPage />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)

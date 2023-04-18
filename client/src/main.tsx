import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import { AppProvider } from './shared/AppContext'
import Layout from './pages/HomePage/Layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
          <Route
            path="/:id"
            element={
              <Layout>
                <RoomPage />
              </Layout>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import { WebSocketProvider } from './shared/WebSocketContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <WebSocketProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<RoomPage />} />
        </Routes>
      </WebSocketProvider>
    </BrowserRouter>
  </React.StrictMode>
)

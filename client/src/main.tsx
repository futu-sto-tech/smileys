import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './pages/HomePage/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { routes } from './pages/router'
import { AppProvider } from './shared/AppContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppProvider>
          <Layout>
            <Routes>{routes}</Routes>
          </Layout>
        </AppProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
)

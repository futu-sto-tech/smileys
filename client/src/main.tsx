import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { router } from './pages/router'
import AppDependencies from './shared/AppDependencies'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppDependencies />
    </QueryClientProvider>
  </React.StrictMode>
)

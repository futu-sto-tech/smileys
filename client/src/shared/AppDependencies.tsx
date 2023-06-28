/* existing imports */
import { AppProvider } from './AppContext'
import CustomRouter from '../pages/router'
import { useState } from 'react'

function AppDependencies() {
  const [router, setRouter] = useState()

  return (
    <AppProvider router={router}>
      <CustomRouter setRouter={setRouter}></CustomRouter>
    </AppProvider>
  )
}

export default AppDependencies

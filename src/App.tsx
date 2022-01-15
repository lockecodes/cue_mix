import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { StoreProvider } from 'services/store'
import MainLayout from './MainLayout'

const App: React.FC = () => {
  return (
    <StoreProvider>
      <CssBaseline />
      <MainLayout />
    </StoreProvider>
  )
}

export default App

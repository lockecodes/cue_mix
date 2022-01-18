import React, { useState } from 'react'
import { CssBaseline } from '@material-ui/core'
import { StoreProvider } from 'services/store'
import MainView from './views/MainView'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cue from './views/Cue'
import styled from 'styled-components'
import { AppBar, Toolbar, Typography } from '@mui/material'

export default function App() {
  return (
    <StoreProvider>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Reaper Cue Mix</Typography>
        </Toolbar>
      </AppBar>
      <ViewWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="cue" element={<Cue />}>
              <Route path=":trackNumber" element={<Cue />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ViewWrapper>
    </StoreProvider>
  )
}

const ViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 0;
  background-color: black;
`

import React from 'react'
import { StoreProvider } from 'services/store'
import MainView from './views/MainView'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Cue from './views/Cue'
import styled from 'styled-components'

export default function App() {
  return (
    <StoreProvider>
      <ViewWrapper>
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="cue" element={<Cue />}>
              <Route path=":trackNumber" element={<Cue />} />
            </Route>
          </Routes>
        </HashRouter>
      </ViewWrapper>
    </StoreProvider>
  )
}

const ViewWrapper = styled.div`
  // background-color: black;
  background-color: #333333;
  color: #a9abab;
  font-family: 'Open Sans', sans-serif;
  font-size: 1em;
  text-align: center;
  margin: 0px;
  user-select: none;
  cursor: default;
`

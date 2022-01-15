import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import MainView from './views/MainView'
import styled from 'styled-components'

const MainLayout: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">App Title</Typography>
        </Toolbar>
      </AppBar>
      <ViewWrapper>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={MainView} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </ViewWrapper>
      )
    </>
  )
}

const ViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 0;
`

export default MainLayout

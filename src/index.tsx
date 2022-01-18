import { render } from 'react-dom'
import App from './App'
import React from 'react'
import { makeServer } from './server'

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' })
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'App'
import { BrowserRouter } from 'react-router-dom'
import './assets/scss/main.scss'
import './assets/scss/themes/_fonts.scss'

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

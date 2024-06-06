import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DesktopOnly from './components/DesktopOnly.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <DesktopOnly>
    <App />
    </DesktopOnly>
    </BrowserRouter>
  </React.StrictMode>,
)

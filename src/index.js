import React from 'react'
import { createRoot } from 'react-dom/client'

import ToastContextProvider from './context/ToastContextProvider'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <ToastContextProvider>
      <App />
    </ToastContextProvider>
  </React.StrictMode>,
)

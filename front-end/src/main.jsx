import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// No topo do arquivo (antes do ReactDOM.render)
document.documentElement.classList.add('dark')
document.documentElement.style.backgroundColor = '#0f172a' // bg-gray-900
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

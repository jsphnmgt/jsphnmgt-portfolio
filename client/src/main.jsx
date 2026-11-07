import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './styles/creative.css'
import './styles/project-showcase.css'
import './styles/professional-mobile.css'
import './styles/professional-details.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

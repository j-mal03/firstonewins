import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TheEntrepreneur from './components/TheEntrepreneur'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TheEntrepreneur />
  </StrictMode>,
)

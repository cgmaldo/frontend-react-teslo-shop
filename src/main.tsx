import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TestloShopApp } from './TestloShopApp'
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TestloShopApp />
  </StrictMode>,
)

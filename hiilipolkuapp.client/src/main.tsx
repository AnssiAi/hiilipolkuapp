import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap-icons/font/bootstrap-icons.css";
import "./i18n/config.ts"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Suspense fallback={<div>Loading...</div> }>
            <App />
        </Suspense>
  </StrictMode>,
)

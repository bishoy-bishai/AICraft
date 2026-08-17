import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const media = window.matchMedia('(prefers-color-scheme: dark)')
const applyTheme = (isDark: boolean) => {
  document.documentElement.classList.toggle('dark', isDark)
}
applyTheme(media.matches)
media.addEventListener('change', (e) => applyTheme(e.matches))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

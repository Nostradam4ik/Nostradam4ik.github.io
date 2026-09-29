import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/App'
import { I18nProvider } from '@/lib/i18n'
import '@/styles/index.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root container #root is missing from index.html')

createRoot(container).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)

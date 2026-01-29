import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { CombineProvider } from '@app/providers'
import { App } from '@app/App'
import './app/styles/index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CombineProvider>
            <App />
        </CombineProvider>
    </StrictMode>
)

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { CombineProvider } from '@app/providers'
import { App } from '@app/App'
import '@app/styles/index.css'

const useMsw = import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true'

async function bootstrap() {
    if (useMsw) {
        try {
            const { worker } = await import('./mocks/browser')
            await Promise.race([
                worker.start({ onUnhandledRequest: 'bypass', quiet: true }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('MSW start timeout')), 5000)),
            ])
        } catch (e) {
            console.warn('[MSW] Failed to start, running without mocks.', e)
        }
    }
    const root = document.getElementById('root')!
    createRoot(root).render(
        <StrictMode>
            <CombineProvider>
                <App />
            </CombineProvider>
        </StrictMode>
    )
}

void bootstrap()

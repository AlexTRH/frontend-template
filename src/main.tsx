import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { CombineProvider } from '@app/providers'
import { App } from '@app/App'
import '@app/styles/index.css'

const useMsw = import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true'

async function bootstrap() {
    if (useMsw) {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- dynamic MSW worker */
        const { worker } = await import('./mocks/browser')
        await worker.start({ onUnhandledRequest: 'bypass', quiet: true })
        /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
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

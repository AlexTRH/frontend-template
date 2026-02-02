import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { validateEnv } from '@shared/lib/validate-env'
import { CombineProvider } from '@app/providers'
import { App } from '@app/App'
import '@app/styles/index.css'

// MSW включается только в dev и только при явном флаге — иначе запросы идут на реальный API.
const useMsw = import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true'

async function bootstrap() {
    const envCheck = validateEnv()
    if (!envCheck.valid) {
        const root = document.getElementById('root')!
        root.innerHTML = `<div style="padding: 2rem; font-family: system-ui; max-width: 480px; margin: 0 auto;"><h1 style="color: #b91c1c;">Configuration required</h1><p>${envCheck.message}</p></div>`
        return
    }
    if (useMsw) {
        try {
            const { worker } = await import('./mocks/browser')
            await Promise.race([
                worker.start({ onUnhandledRequest: 'bypass', quiet: true }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('MSW start timeout')), 5000)),
            ])
        } catch (e) {
            // Таймаут или ошибка — рендерим приложение без моков, чтобы не зависнуть на белом экране.
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

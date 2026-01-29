import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@shared/ui/sonner'
import type { WithChildren } from '@shared/types'
import { ThemeProvider } from '@app/providers/theme'
import { QueryProvider } from '@app/providers/query'
import { I18nProvider } from '@app/providers/i18n'
import { ErrorBoundary } from '@app/providers/errorBoundary'

export function CombineProvider({ children }: WithChildren) {
    return (
        <BrowserRouter>
            <I18nProvider>
                <ThemeProvider>
                    <ErrorBoundary>
                        <QueryProvider>
                            {children}
                            <Toaster />
                        </QueryProvider>
                    </ErrorBoundary>
                </ThemeProvider>
            </I18nProvider>
        </BrowserRouter>
    )
}

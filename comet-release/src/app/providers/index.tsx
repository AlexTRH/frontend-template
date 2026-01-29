import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from '@shared/ui/sidebar'
import type { WithChildren } from '@shared/types'
import { ThemeProvider } from '@app/providers/theme'
import { QueryProvider } from '@app/providers/query'
import { ErrorBoundary } from '@app/providers/errorBoundary'
import { AuthProvider } from '@app/providers/auth'

export function CombineProvider({ children }: WithChildren) {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <ErrorBoundary>
                    <AuthProvider>
                        <QueryProvider>
                            <SidebarProvider>{children}</SidebarProvider>
                        </QueryProvider>
                    </AuthProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </BrowserRouter>
    )
}

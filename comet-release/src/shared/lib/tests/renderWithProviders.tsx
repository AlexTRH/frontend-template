import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { QueryProvider } from '@app/providers/query'
import { AuthProvider } from '@app/providers/auth'

export type RenderWithProviders = {
    path?: string
}
export const renderWithProviders = (children: ReactNode, options: RenderWithProviders = {}) => {
    const { path = '/' } = options

    render(
        <MemoryRouter initialEntries={[path]}>
            <AuthProvider>
                <QueryProvider>{children}</QueryProvider>
            </AuthProvider>
        </MemoryRouter>
    )
}

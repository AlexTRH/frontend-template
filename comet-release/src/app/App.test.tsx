import { describe, expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '@shared/lib/tests/renderWithProviders'

import { App } from './App'

describe('App', () => {
    test('a truthy statement', () => {
        expect(1 + 1).toEqual(2)
    })

    test('check home route', async () => {
        renderWithProviders(<App />)
        screen.debug()
        await waitFor(() => expect(screen.getByText(/Please log in with/)).toBeInTheDocument())
    })

    test('check to render NotFoundPage on non-existing route', () => {
        const path = '/bad/route'
        renderWithProviders(<App />, { path })
        expect(screen.getByText(/page not found/)).toBeDefined()
    })
})

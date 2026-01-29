import { toast } from 'sonner'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { WithChildren } from '@shared/types'

export function QueryProvider({ children }: WithChildren) {
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => toast.error(error.message),
        }),
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
            },
            mutations: {
                onError: (error) => {
                    toast.error(error.message)
                },
                retry: false,
            },
        },
    })
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

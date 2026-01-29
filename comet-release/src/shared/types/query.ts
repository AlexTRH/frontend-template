import type { UseMutateFunction } from '@tanstack/react-query'
import type { CatalogItem, UuId, WithDisabled } from '@shared/types'

export type UseSearchFromCatalogFunction = ({ search, disabled }: { search?: string } & WithDisabled) => {
    data: CatalogItem[] | undefined
    error: Error | null
    isPending: boolean
    isFetching: boolean
    isPlaceholderData: boolean
}

export type UseCreateCatalogItemMutation = ({ onMutate }: { onMutate: (title: string) => void }) => {
    mutate: UseMutateFunction<UuId, Error, string, void>
    isPending: boolean
    data: string | undefined
}

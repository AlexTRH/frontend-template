import type { MutationFunction, QueryKey } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import type { UuId } from '@shared/types'

type Props = {
    mutationFn: MutationFunction<UuId, string>
    queryKey: QueryKey
    onMutate: (title: string) => void
}
export const useCreateCatalogItemMutation = ({ onMutate, mutationFn, queryKey }: Props) => {
    const queryClient = useQueryClient()
    const { mutate, isPending, data } = useMutation<UuId, DefaultError, string, void>({
        mutationFn,
        onMutate: onMutate,
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })
    return { mutate, isPending, data }
}

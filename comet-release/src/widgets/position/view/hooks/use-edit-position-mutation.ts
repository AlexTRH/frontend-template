import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DefaultError } from '@tanstack/query-core'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import type { EditedPositionFormValue } from '../model/types'
import { editPosition } from '../api'

export const useEditPositionMutation = ({ request_uuid, uuid }: { request_uuid: UuId; uuid: UuId }) => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation<void, DefaultError, EditedPositionFormValue>({
        mutationFn: (body) => editPosition({ request_uuid, uuid, body }),
        onSuccess: () => {
            toast.success('Changes saved')
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSITIONS, uuid] }),
    })
    return { mutate, isPending }
}

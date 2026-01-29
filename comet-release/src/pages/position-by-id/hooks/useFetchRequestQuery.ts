import { useQuery } from '@tanstack/react-query'
import type { UuId } from '@shared/types'
import { QUERY_KEYS } from '@shared/constants'

import { fetchPositionByID } from '../api'

export const useFetchPositionByIdQuery = ({ request_id, position_id }: { request_id: UuId; position_id: UuId }) => {
    const { error, data, isPending } = useQuery({
        queryKey: [QUERY_KEYS.POSITIONS, position_id],
        queryFn: () => fetchPositionByID({ request_id, position_id }),
        enabled: !!(request_id && position_id),
    })
    return { error, data, isPending }
}

import { useState } from 'react'
import type { UuId } from '@shared/types'
import { DEFAULT_PAGINATION_LIMIT } from '@shared/constants'
import { LogsCard } from '@entities/logs'

import { useFetchRequestLogsQuery } from './hooks'

type Props = {
    request_uuid: UuId
}
export const RequestLogs = ({ request_uuid }: Props) => {
    const [limit, setLimit] = useState<number>(DEFAULT_PAGINATION_LIMIT)
    const { data, isPending, error } = useFetchRequestLogsQuery({ request_uuid, limit })
    return <LogsCard data={data} isPending={isPending} error={error} setLimit={setLimit} />
}

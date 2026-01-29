import { useParams } from 'react-router-dom'
import { RequestCard } from '@widgets/request/view'
import { RequestLogs } from '@widgets/request/logs'
import { CardSkeleton } from '@shared/ui/skeletons'
import { Error } from '@shared/ui/errors/error'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { RoutePath } from '@shared/config/router'

import { useFetchRequestQuery } from '../hooks/useFetchRequestQuery'

export function RequestByIDPage() {
    const { id } = useParams()
    const { error, data, isPending } = useFetchRequestQuery(id!)

    const paths = [
        { title: 'Requests', to: RoutePath.requests },
        { title: data?.project_name, current: true },
    ]

    return (
        <>
            <Breadcrumbs paths={paths} />
            {data && <RequestCard request={data} />}
            {isPending && <CardSkeleton />}
            {error && <Error title="Error" description={error.message} />}
            <RequestLogs request_uuid={id!} />
        </>
    )
}

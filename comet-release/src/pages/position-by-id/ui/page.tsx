import { useLocation, useParams } from 'react-router-dom'
import { PositionCard } from '@widgets/position/view'
import { PositionLogs } from '@widgets/position/logs'
import { InterviewLogs } from '@widgets/interview/logs'
import { InterviewFlow } from '@widgets/interview/flow'
import { CardSkeleton } from '@shared/ui/skeletons'
import { Error } from '@shared/ui/errors/error'
import { Breadcrumbs } from '@shared/ui/breadcrumbs'
import { extractFullNameFromEmail } from '@shared/lib/email'
import { RoutePath } from '@shared/config/router'
import { checkIfPositionDisabled } from '@entities/position'

import { useFetchPositionByIdQuery } from '../hooks/useFetchRequestQuery'

export function PositionByIDPage() {
    const param = useParams()
    const { search } = useLocation()

    const query = new URLSearchParams(search)
    const request_id = query.get('request_id') || ''
    const position_id = param.position_id || ''

    const { error, data, isPending } = useFetchPositionByIdQuery({ request_id, position_id })
    const fullName = extractFullNameFromEmail(data?.candidate_email) || ''
    const candidate_email = data?.candidate_email || ''

    const paths = data
        ? [
              { title: 'Requests', to: RoutePath.requests },
              { title: data?.project_name, to: RoutePath.requests + request_id },
              {
                  title: 'Request positions',
                  to:
                      RoutePath.positions_by_request_id +
                      `?request_id=${request_id}&project_name=${data?.project_name}`,
              },
              { title: fullName, current: true },
          ]
        : [{ title: 'Requests', to: RoutePath.requests }]

    return (
        <>
            <Breadcrumbs paths={paths} />
            {data && (
                <PositionCard
                    data={data}
                    renderLogs={(isLogsOpen, setLogsOpen) => (
                        <PositionLogs
                            request_uuid={request_id}
                            position_uuid={position_id}
                            open={isLogsOpen}
                            onOpenChange={setLogsOpen}
                        />
                    )}
                />
            )}
            {isPending && <CardSkeleton />}
            {data && (
                <InterviewFlow
                    request_id={request_id}
                    position_id={position_id}
                    candidate_email={candidate_email}
                    isPositionDisabled={checkIfPositionDisabled(data)}
                    renderLogs={(interview_uuid, isLogsOpen, setLogsOpen) => (
                        <InterviewLogs
                            interview_uuid={interview_uuid}
                            request_uuid={request_id}
                            position_uuid={position_id}
                            open={isLogsOpen}
                            onOpenChange={setLogsOpen}
                        />
                    )}
                />
            )}
            {error && <Error />}
        </>
    )
}

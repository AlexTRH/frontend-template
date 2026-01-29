import { Link } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
import { CardHeader, CardTitle } from '@shared/ui/card'
import { buttonVariants } from '@shared/ui/button'
import { Badge } from '@shared/ui/badge'
import type { UuId } from '@shared/types'
import { RoutePath } from '@shared/config/router'
import { CreatePositionModal } from '@features/position'
import { getRequestBadgeVariant, RequestStatus, RequestStatusConfig } from '@entities/request'

type Props = {
    request_uuid: UuId
    project_name: string
    status: RequestStatus
    is_successful: boolean
    google_chat_link: string | null
}
export function RequestCardHeader({ request_uuid, project_name, status, is_successful, google_chat_link }: Props) {
    return (
        <CardHeader className="flex flex-col lg:flex-row justify-between gap-4">
            <CardTitle className="text-3xl">
                {project_name}
                <Badge
                    variant={getRequestBadgeVariant(status, is_successful)}
                    className="relative -top-3 -right-2"
                    animate="pulse"
                >
                    {RequestStatusConfig[status]}
                </Badge>
            </CardTitle>

            <div className="flex flex-wrap gap-4">
                {google_chat_link && (
                    <a
                        href={google_chat_link}
                        target="_blank"
                        className={buttonVariants({ variant: 'link', size: 'sm' })}
                        rel="noreferrer"
                    >
                        Google chat <MessageSquare />
                    </a>
                )}
                {status !== RequestStatus.CLOSED && <CreatePositionModal request_id={request_uuid} />}
                <Link
                    to={RoutePath.positions_by_request_id + `?request_id=${request_uuid}&project_name=${project_name}`}
                    className={buttonVariants({ variant: 'outline' })}
                >
                    Related request positions
                </Link>
            </div>
        </CardHeader>
    )
}

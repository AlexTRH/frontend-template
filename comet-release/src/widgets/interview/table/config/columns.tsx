import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu'
import { CopyText } from '@shared/ui/copy-text'
import { Button } from '@shared/ui/button'
import { Badge } from '@shared/ui/badge'
import { extractFullNameFromEmail } from '@shared/lib/email'
import { formatDTOtoClient } from '@shared/lib/date'
import { RoutePath } from '@shared/config/router'
import type { InterviewStage } from '@entities/interview/stage'
import { InterviewDurationConfig, InterviewStatusConfig, InterviewTypeConfig } from '@entities/interview/stage'

export const columns: ColumnDef<InterviewStage>[] = [
    {
        accessorKey: 'candidate_email',
        header: 'Name',
        cell: ({ row }) => {
            const { candidate_email } = row.original
            return extractFullNameFromEmail(candidate_email)
        },
    },
    {
        accessorKey: 'stage_name',
        header: 'Stage name',
    },
    {
        accessorKey: 'types',
        header: 'Type',
        cell: ({ row }) => {
            const { types } = row.original
            return InterviewTypeConfig[types]
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const { status } = row.original

            return (
                <Badge variant={InterviewStatusConfig[status].badgeVariant}>{InterviewStatusConfig[status].en}</Badge>
            )
        },
    },
    {
        accessorKey: 'duration',
        header: 'Duration',
        cell: ({ row }) => {
            const { duration } = row.original
            return InterviewDurationConfig[duration]
        },
    },
    {
        accessorKey: 'meeting_link',
        header: 'Meeting link',
        cell: ({ row }) => {
            const { meeting_link } = row.original
            if (!meeting_link) return null
            return (
                <CopyText copiedText={meeting_link} toastText="Meeting link copied" tooltipText="Copy meeting link" />
            )
        },
    },
    {
        accessorKey: 'start_datetime',
        header: 'Start datetime',
        cell: ({ row }) => {
            const { start_datetime } = row.original
            return formatDTOtoClient(start_datetime)
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { uuid, request_uuid, request_positions_id } = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link
                                to={{
                                    pathname: RoutePath.positions + request_positions_id,
                                    search: `?request_id=${request_uuid}&scrollToUuid=${uuid}`,
                                }}
                            >
                                View interview stage
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

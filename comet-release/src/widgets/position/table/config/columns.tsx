import { Link } from 'react-router-dom'
import { ArrowUpRight, MoreHorizontal } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { WithTooltip } from '@shared/ui/with'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu'
import { CopyText } from '@shared/ui/copy-text'
import { Button, buttonVariants } from '@shared/ui/button'
import { Badge } from '@shared/ui/badge'
import { extractFullNameFromEmail } from '@shared/lib/email'
import { RoutePath } from '@shared/config/router'
import type { Position } from '@entities/position'

export const columns: ColumnDef<Position>[] = [
    {
        accessorKey: 'project_name',
        header: 'Project name',
        cell: ({ row }) => {
            const { project_name, request_uuid } = row.original
            return (
                <Link to={RoutePath.requests + request_uuid} className="hover-underline">
                    {project_name}
                </Link>
            )
        },
    },
    {
        accessorKey: 'candidate_email',
        header: 'Name',
        cell: ({ row }) => {
            const { candidate_email } = row.original
            return extractFullNameFromEmail(candidate_email)
        },
    },
    {
        accessorKey: 'cv_link',
        header: 'CV link',
        cell: ({ row }) => {
            const { cv_link, candidate_email } = row.original
            if (!cv_link) return null
            const name = extractFullNameFromEmail(candidate_email)
            return (
                <div className="flex items-center">
                    <CopyText
                        copiedText={cv_link}
                        toastText={`Link to ${name}'s CV copied`}
                        tooltipText="Copy resume link"
                    />
                    <WithTooltip tooltip="View resume in drive">
                        <a
                            href={cv_link}
                            target="_blank"
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                            rel="noreferrer"
                        >
                            <ArrowUpRight className="size-5" />
                        </a>
                    </WithTooltip>
                </div>
            )
        },
    },
    {
        accessorKey: 'customer_name',
        header: 'Customer',
    },
    {
        accessorKey: 'intermediary_name',
        header: 'Intermediary',
    },
    {
        accessorKey: 'is_open',
        header: 'Is open',
        cell: ({ row }) => {
            const { is_open } = row.original
            return <Badge variant={is_open ? 'green' : 'destructive'}>{is_open ? 'Yes' : 'No'}</Badge>
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { uuid, request_uuid } = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only ">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link
                                to={{
                                    pathname: RoutePath.positions + uuid,
                                    search: `?request_id=${request_uuid}`,
                                }}
                            >
                                View request position
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

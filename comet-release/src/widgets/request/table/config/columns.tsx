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
import { Button } from '@shared/ui/button'
import { Badge } from '@shared/ui/badge'
import { formatDTOtoClient } from '@shared/lib/date'
import { RoutePath } from '@shared/config/router'
import { CreatePositionModal } from '@features/position'
import type { Request } from '@entities/request'
import { RequestStatus } from '@entities/request'
import { getRequestBadgeVariant, RequestStatusConfig } from '@entities/request'
import { DepartmentConfig } from '@entities/catalogs/department'

export const columns: ColumnDef<Request>[] = [
    {
        accessorKey: 'project_name',
        header: 'Project name',
        cell: ({ row }) => {
            const { project_name, uuid } = row.original
            return (
                <Link to={RoutePath.requests + uuid} className="hover-underline">
                    {project_name}
                </Link>
            )
        },
    },
    {
        accessorKey: 'customers',
        header: 'Customer',
        cell: ({ row }) => {
            const { customer } = row.original
            return customer?.title
        },
    },
    {
        accessorKey: 'intermediaries',
        header: 'Intermediary',
        cell: ({ row }) => {
            const { intermediary } = row.original
            return intermediary?.title
        },
    },
    {
        accessorKey: 'rate',
        header: 'Rate',
        cell: ({ row }) => {
            const { rate, rate_currency } = row.original
            if (!rate || !rate_currency) {
                return null
            }

            return (
                <span>
                    {rate} {rate_currency}
                </span>
            )
        },
    },
    {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ row }) => {
            const { department } = row.original
            return DepartmentConfig[department]
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const { status, is_successful } = row.original
            return <Badge variant={getRequestBadgeVariant(status, is_successful)}>{RequestStatusConfig[status]}</Badge>
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Created',
        cell: ({ row }) => {
            const { created_at } = row.original
            return formatDTOtoClient(created_at)
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const request = row.original

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
                            <Link to={RoutePath.requests + request.uuid}> View request</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                to={
                                    RoutePath.positions_by_request_id +
                                    `?request_id=${request.uuid}&project_name=${request.project_name}`
                                }
                            >
                                View request positions
                            </Link>
                        </DropdownMenuItem>
                        {request.status !== RequestStatus.CLOSED && (
                            <DropdownMenuItem asChild>
                                <CreatePositionModal
                                    request_id={request.uuid}
                                    btnTriggerVariant={{ variant: 'menu_item', size: 'menu_item' }}
                                />
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

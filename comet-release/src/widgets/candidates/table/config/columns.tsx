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
import type { Candidate } from '@entities/candidate'

export const columns: ColumnDef<Candidate>[] = [
    {
        accessorKey: 'last_name_en',
        header: 'Last name',
    },
    {
        accessorKey: 'first_name_en',
        header: 'First name',
    },
    {
        accessorKey: 'is_on_sale',
        header: 'Is on sale',
        cell: ({ row }) => {
            const { is_selling } = row.original
            return <Badge variant={is_selling ? 'destructive' : 'default'}>{is_selling ? 'Yes' : 'No'}</Badge>
        },
    },
    {
        accessorKey: 'is_on_bench',
        header: 'Is on bench',
        cell: ({ row }) => {
            const { is_on_bench } = row.original
            return <Badge variant={is_on_bench ? 'destructive' : 'default'}>{is_on_bench ? 'Yes' : 'No'}</Badge>
        },
    },
    {
        id: 'actions',
        cell: () => {
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
                        <DropdownMenuItem>View candidate</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

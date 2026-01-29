import type { ReactElement } from 'react'
import { EllipsisVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/ui/dropdown-menu'
import { Button } from '@shared/ui/button'

export type MenuOption = { title: string; icon: ReactElement<SVGSVGElement>; onClick: () => void }

type Props = {
    options: MenuOption[]
    disabled?: boolean
}
export function CardMenu({ options, disabled }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={disabled}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only ">Open menu</span>
                    <EllipsisVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {options.map((option) => (
                    <DropdownMenuItem key={option.title}>
                        {option.icon}
                        <Button variant="none" onClick={option.onClick}>
                            {option.title}
                        </Button>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

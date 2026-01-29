import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui/tooltip'
import type { WithChildren } from '@shared/types'

type Props = {
    tooltip: string
    open?: boolean
}
export function WithTooltip({ children, tooltip, open }: Props & WithChildren) {
    return (
        <TooltipProvider>
            <Tooltip open={open}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

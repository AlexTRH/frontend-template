import type { ReactElement } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/lib/ui/cn'

type Props = {
    title: string
    count?: string
    icon: ReactElement<SVGSVGElement>
    className?: string
    //category?: string
}

const averageVariants = cva('rounded-xl p-3 grid gap-2', {
    variants: {
        variant: {
            destructive: 'bg-error text-destructive-foreground',
            success: 'bg-success text-success-foreground',
            info: 'bg-info text-info-foreground',
        },
    },
    defaultVariants: {
        variant: 'info',
    },
})
export function Average({
    title,
    count = '0',
    variant,
    className,
    icon,
    //category = 'd 0h 0m',
}: Props & VariantProps<typeof averageVariants>) {
    return (
        <div className={cn(averageVariants({ variant, className }))}>
            <p className="text-sm leading-none font-medium">{title}</p>
            <p className="flex gap-2">
                {icon}
                <span className="text-[22px] leading-6 font-semibold">{count}</span>
            </p>
        </div>
    )
}

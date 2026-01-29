import type { ComponentProps } from 'react'
import { X } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from '@shared/ui/button'
import { Button } from '@shared/ui/button'
import type { badgeVariants } from '@shared/ui/badge'
import { Badge } from '@shared/ui/badge'

type Props = VariantProps<typeof badgeVariants> &
    ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
        closable?: boolean
    }
export function BadgeClosable({ variant, children, closable = true, className, ...buttonProps }: Props) {
    return (
        <Badge variant={variant} className={className}>
            {children}
            {closable && (
                <Button variant="badge_icon" size="auto" {...buttonProps} className="cursor-pointer disabled:opacity-1">
                    <X className="ml-1" />
                </Button>
            )}
        </Badge>
    )
}

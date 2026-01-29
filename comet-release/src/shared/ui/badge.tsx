import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/lib/ui/cn'
import { Slot } from '@radix-ui/react-slot'

export type BadgeVariant =
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'lime'
    | 'teal'
    | 'indigo'
    | 'neutral'
    | 'green'
    | 'gray'
    | 'light-blue'
    | 'blue'
    | 'yellow'
    | 'orange'
    | 'light-green'

const badgeVariants = cva<{ variant: Record<BadgeVariant, string>; animate: Record<'pulse', string> }>(
    'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                destructive:
                    'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
                outline:
                    'border-ring bg-background text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
                lime: 'border-transparent bg-lime-700 text-primary-foreground [a&]:hover:bg-primary/90',
                teal: 'border-transparent bg-teal-700 text-primary-foreground [a&]:hover:bg-primary/90',
                indigo: 'border-transparent bg-indigo-700 text-primary-foreground [a&]:hover:bg-primary/90',
                neutral: 'border-transparent bg-neutral-700 text-primary-foreground [a&]:hover:bg-primary/90',
                green: 'border-transparent bg-green-700 text-primary-foreground [a&]:hover:bg-primary/90',
                gray: 'border-transparent bg-gray text-primary-foreground [a&]:hover:bg-primary/90',
                orange: 'border-transparent bg-orange text-primary-foreground [a&]:hover:bg-primary/90',
                blue: 'border-transparent bg-blue text-primary-foreground [a&]:hover:bg-primary/90',
                yellow: 'border-transparent bg-yellow text-primary-foreground [a&]:hover:bg-primary/90',
                'light-blue': 'border-transparent bg-light-blue text-primary-foreground [a&]:hover:bg-primary/90',
                'light-green': 'border-transparent bg-light-green text-primary-foreground [a&]:hover:bg-primary/90',
            },
            animate: {
                pulse: 'animate-pulse',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

function Badge({
    className,
    variant,
    animate,
    asChild = false,
    ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : 'span'

    return <Comp data-slot="badge" className={cn(badgeVariants({ variant, animate }), className)} {...props} />
}

export { Badge, badgeVariants }

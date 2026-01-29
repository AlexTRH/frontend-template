import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/lib/ui/cn'
import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive select-none",
    {
        variants: {
            variant: {
                default:
                    "border-none bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 [&_svg:not([class*='text-'])]:text-primary-foreground",
                destructive:
                    'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
                border: 'border bg-none text-secondary-foreground shadow-xs hover:bg-accent hover:text-accent-foreground',
                outline: 'border border-primary bg-none shadow-xs hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-primary hover:text-primary-foreground',
                link: 'text-primary hover-underline',
                badge_icon:
                    "rounded-full text-secondary-foreground hover:text-foreground disabled:text-secondary-foreground [&_svg:not([class*='size-'])]:size-3",
                none: 'bg-none text-foreground hover:text-accent-foreground',
                menu_item: 'bg-none text-foreground hover:text-accent-foreground hover:bg-accent font-normal',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon_lg: 'size-9',
                auto: 'h-auto',
                menu_item: 'px-2 py-1.5 rounded-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : 'button'

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }

import type { ReactNode } from 'react'
import { Button } from '@shared/ui/button'

type Props = {
    title?: string
    description?: string
    slot?: ReactNode
}

const reload = () => {
    window.location.reload()
}

export function Error({
    title = 'Something went wrong',
    description = 'Please try to reload the page.',
    slot = <Button onClick={reload}>Reload</Button>,
}: Props) {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <h1>{title}</h1>
            <p className="text-secondary-foreground text-2xl">{description}</p>
            {slot}
        </div>
    )
}

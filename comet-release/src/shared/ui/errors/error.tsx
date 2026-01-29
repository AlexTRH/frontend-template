import type { ReactNode } from 'react'
import { Button } from '@shared/ui/button'

import { ErrorSVG } from './error-svg'

type Props = {
    title?: string
    description?: string
    slot?: ReactNode
}

const reload = () => {
    window.location.reload()
}

export function Error({
    title = 'Ooops! Something went wrong.',
    description = 'Please try to update the page.',
    slot = <Button onClick={reload}>Update</Button>,
}: Props) {
    return (
        <div className="flex flex-col gap-3 justify-center items-center h-full text-center">
            <ErrorSVG className="max-w-[500px]" />
            <h1>{title}</h1>
            <p className="text-2xl text-secondary-foreground">{description}</p>
            {slot}
        </div>
    )
}

import type { WithChildren } from '@shared/types'

type Props = {
    title: string
}

export function TitledContainer({ title, children }: Props & WithChildren) {
    return (
        <div className="flex flex-col gap-4">
            <h4>{title}</h4>
            {children}
        </div>
    )
}

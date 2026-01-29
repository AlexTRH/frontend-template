import { Label } from '@shared/ui/label'
import type { WithChildren } from '@shared/types'
import { cn } from '@shared/lib/ui/cn'

type Props = {
    id?: string
    label: string
    columnClass?: string
    required?: boolean
}

export function LabeledColumn({ id, label, children, columnClass, required }: Props & WithChildren) {
    return (
        <div className={cn('flex flex-col space-y-1.5 group', columnClass)}>
            <Label htmlFor={id}>
                <p>
                    {label}
                    {required && <span className="text-primary ml-1">*</span>}
                </p>
            </Label>
            {children}
        </div>
    )
}

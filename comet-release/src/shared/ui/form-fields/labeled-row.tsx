import { Label } from '@shared/ui/label'
import type { WithChildren } from '@shared/types'

type Props = {
    id: string
    label: string
    required?: boolean
    childrenClass?: string
}
export function LabeledRow({ id, label, required, children, childrenClass = 'col-span-3' }: Props & WithChildren) {
    return (
        <div className="flex flex-col md:grid md:grid-cols-4 md:items-start gap-4 group">
            <Label htmlFor={id} className="text-start md:pt-2">
                <p>
                    {label}
                    {required && <span className="text-primary ml-1">*</span>}
                </p>
            </Label>
            <div className={childrenClass}>{children}</div>
        </div>
    )
}

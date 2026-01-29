import { type InputHTMLAttributes, type ReactElement } from 'react'
import { Input } from '@shared/ui/input'
import { cn } from '@shared/lib/ui'

type InputWithIconProps = InputHTMLAttributes<HTMLInputElement> & {
    icon?: ReactElement<SVGSVGElement>
    iconPosition?: 'left' | 'right'
}

export const InputWithIcon = ({ icon, iconPosition = 'right', className, ...props }: InputWithIconProps) => {
    return (
        <div className="relative w-full">
            {icon && (
                <div
                    className={cn(
                        'absolute inset-y-0 flex items-center px-3 text-muted-foreground pointer-events-none',
                        iconPosition === 'left' ? 'left-0' : 'right-0'
                    )}
                >
                    {icon}
                </div>
            )}
            <Input className={cn(icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '', className)} {...props} />
        </div>
    )
}

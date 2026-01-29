import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { InputHTMLAttributes } from 'react'
import { Textarea } from '@shared/ui/textarea'
import type { ControlledFieldProps } from '@shared/types/form'
import { noDataValue } from '@shared/constants/form'

export const TextareaControlled = <T extends FieldValues>({
    control,
    name,
    disabled,
    placeholder,
    className = 'min-h-[100px]',
    ...rest
}: ControlledFieldProps<T> & InputHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <>
                    <Textarea
                        id={name}
                        disabled={disabled}
                        placeholder={disabled ? noDataValue : placeholder}
                        className={className}
                        {...field}
                        {...rest}
                    />
                    <p className="field-error">{fieldState.error?.message}</p>
                </>
            )}
        />
    )
}

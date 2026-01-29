import type { FieldPath, FieldPathValue, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { InputHTMLAttributes } from 'react'
import { Input } from '@shared/ui/input'
import type { ControlledFieldProps } from '@shared/types/form'
import { noDataValue } from '@shared/constants/form'

export const InputControlled = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
    control,
    name,
    placeholder,
    disabled,
    defaultValue = '' as FieldPathValue<TFieldValues, TName>,
    ...rest
}: ControlledFieldProps<TFieldValues> & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <>
                    <Input
                        id={name}
                        disabled={disabled}
                        placeholder={disabled ? noDataValue : placeholder}
                        {...field}
                        {...rest}
                    />
                    <p className="field-error">{fieldState.error?.message}</p>
                </>
            )}
        />
    )
}

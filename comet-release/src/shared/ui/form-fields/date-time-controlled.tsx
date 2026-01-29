import { Controller, type FieldValues } from 'react-hook-form'
import { DateTimePicker } from '@shared/ui/date-picker'
import type { ControlledFieldProps, WithDisabled } from '@shared/types'

export function DateTimeControlled<T extends FieldValues>({
    control,
    name,
    ...rest
}: ControlledFieldProps<T> & WithDisabled) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <DateTimePicker id={field.name} {...field} {...rest} />
                    <p className="field-error">{fieldState.error?.message}</p>
                </>
            )}
        />
    )
}

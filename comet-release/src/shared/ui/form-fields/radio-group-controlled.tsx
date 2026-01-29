import { Controller, type FieldValues } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@shared/ui/radio-group'
import { Label } from '@shared/ui/label'
import type { ControlledFieldProps } from '@shared/types'
import type { RadioGroupProps } from '@radix-ui/react-radio-group'

export const RadioGroupControlled = <TFieldValues extends FieldValues>({
    control,
    name,
    disabled,
    options,
    ...rest
}: ControlledFieldProps<TFieldValues> &
    RadioGroupProps & {
        options: { value: string; label: string }[]
    }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <>
                    <RadioGroup disabled={disabled} onValueChange={field.onChange} {...field} {...rest}>
                        {options.map(({ value, label }) => (
                            <div key={value} className="flex items-center space-x-2">
                                <RadioGroupItem value={value} id={value} />
                                <Label htmlFor={value}>{label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                    <p className="field-error">{fieldState.error?.message}</p>
                </>
            )}
        />
    )
}

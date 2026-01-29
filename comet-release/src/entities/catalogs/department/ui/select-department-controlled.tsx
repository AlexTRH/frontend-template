import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { ControlledFieldProps } from '@shared/types/form'
import type { SelectProps } from '@radix-ui/react-select'

import { SelectDepartment } from './select-department'

export function SelectDepartmentControlled<T extends FieldValues>({
    control,
    name,
    ...rest
}: ControlledFieldProps<T> & SelectProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <SelectDepartment {...field} {...rest} />
                    <p className="field-error">{fieldState.error?.message}</p>
                </>
            )}
        />
    )
}

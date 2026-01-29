import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { ControlledFieldProps } from '@shared/types/form'

import { SelectChannel } from './select-channel'

export function SelectChannelControlled<T extends FieldValues>({
    control,
    name,
    disabled,
}: ControlledFieldProps<T> & { disabled?: boolean }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <SelectChannel onChange={field.onChange} value={field.value} disabled={disabled} />
                    <p className="field-error">{fieldState.error?.message}</p>
                </>
            )}
        />
    )
}

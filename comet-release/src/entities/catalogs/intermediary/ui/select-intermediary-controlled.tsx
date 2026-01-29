import type { FieldValues } from 'react-hook-form'
import { ControlledCreatableSelectAsync } from '@shared/ui/form-fields'
import type { ControlledFieldProps } from '@shared/types/form'
import type { WithDisabled } from '@shared/types'

import { useFetchIntermediaryQuery, useCreateIntermediaryMutation } from '../hooks'

export const SelectIntermediaryControlled = <T extends FieldValues>({
    control,
    name,
    ...rest
}: ControlledFieldProps<T> & WithDisabled) => {
    return (
        <ControlledCreatableSelectAsync
            control={control}
            name={name}
            {...rest}
            useCreateItemMutation={useCreateIntermediaryMutation}
            useFetchQuery={useFetchIntermediaryQuery}
        />
    )
}

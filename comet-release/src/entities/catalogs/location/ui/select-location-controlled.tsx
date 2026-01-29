import type { FieldValues } from 'react-hook-form'
import { ControlledCreatableSelectAsync } from '@shared/ui/form-fields'
import type { ControlledFieldProps } from '@shared/types/form'
import type { WithDisabled } from '@shared/types'

import { useFetchLocationsQuery, useCreateLocationMutation } from '../hooks'

export const SelectLocationControlled = <T extends FieldValues>({
    control,
    name,
    ...rest
}: ControlledFieldProps<T> & WithDisabled) => {
    return (
        <ControlledCreatableSelectAsync
            control={control}
            name={name}
            {...rest}
            useCreateItemMutation={useCreateLocationMutation}
            useFetchQuery={useFetchLocationsQuery}
        />
    )
}

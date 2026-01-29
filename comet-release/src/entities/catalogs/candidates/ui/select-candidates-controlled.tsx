import type { FieldValues } from 'react-hook-form'
import { ControlledMultiSelectAsync } from '@shared/ui/form-fields'
import type { ControlledFieldProps, WithDisabled } from '@shared/types'

import { useFetchCandidatesEmailQuery } from '../hooks'

export const SelectCandidatesControlled = <T extends FieldValues>({
    control,
    name,
    ...rest
}: ControlledFieldProps<T> & WithDisabled) => {
    return (
        <ControlledMultiSelectAsync
            control={control}
            name={name}
            {...rest}
            useFetchQuery={useFetchCandidatesEmailQuery}
        />
    )
}

import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { CreatableSelectAsync } from '@shared/ui/selects'
import type { UseCreateCatalogItemMutation, UseSearchFromCatalogFunction } from '@shared/types/query'

interface Props<FormValues extends FieldValues> {
    control: Control<FormValues>
    name: Path<FormValues>
    useFetchQuery: UseSearchFromCatalogFunction
    useCreateItemMutation: UseCreateCatalogItemMutation
}

export function ControlledCreatableSelectAsync<T extends FieldValues>({ control, name, ...rest }: Props<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <>
                        <CreatableSelectAsync {...field} {...rest} />
                        <p className="field-error">{fieldState.error?.message}</p>
                    </>
                )
            }}
        />
    )
}

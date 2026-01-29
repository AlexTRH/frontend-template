import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { MultiSelectAsync } from '@shared/ui/selects'
import type { UseSearchFromCatalogFunction } from '@shared/types/query'

interface Props<FormValues extends FieldValues> {
    control: Control<FormValues>
    name: Path<FormValues>
    useFetchQuery: UseSearchFromCatalogFunction
}

export function ControlledMultiSelectAsync<T extends FieldValues>({ control, name, ...rest }: Props<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <>
                        <MultiSelectAsync {...field} {...rest} />
                        <p className="field-error">{fieldState.error?.message}</p>
                    </>
                )
            }}
        />
    )
}

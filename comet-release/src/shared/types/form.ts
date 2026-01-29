import type { Control, FieldPath, FieldPathValue, FieldValues, Path } from 'react-hook-form'

export interface ControlledFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    control: Control<TFieldValues>
    name: Path<TFieldValues>
    defaultValue?: FieldPathValue<TFieldValues, TName>
}

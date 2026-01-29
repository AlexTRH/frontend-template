import { SelectId } from '@shared/ui/selects'

import { languageCatalog } from '../model'

export function SelectLanguage({
    value,
    onChange,
    disabled,
}: {
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
}) {
    return (
        <SelectId
            placeholder="Select language"
            label="Language"
            list={languageCatalog}
            id="language"
            onChange={onChange}
            value={value}
            disabled={disabled}
        />
    )
}

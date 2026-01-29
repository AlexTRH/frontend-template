import { SelectTitle } from '@shared/ui/selects'

import { currencyCatalog } from '../model'

export function SelectCurrency({
    value,
    onChange,
    disabled,
}: {
    value?: string
    onChange?: (val: string) => void
    disabled?: boolean
}) {
    return (
        <SelectTitle
            placeholder="Currency"
            label="Currencies"
            list={currencyCatalog}
            id="rate_currency"
            onChange={onChange}
            value={value}
            disabled={disabled}
        />
    )
}

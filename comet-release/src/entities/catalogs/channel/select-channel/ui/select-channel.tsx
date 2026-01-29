import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@shared/ui/select'

import { AcquisitionChannel } from '../model/constants'

export function SelectChannel({
    value,
    onChange,
    disabled,
}: {
    value?: boolean
    onChange: (val: boolean) => void
    disabled?: boolean
}) {
    const visibleValue =
        value === undefined ? undefined : value ? AcquisitionChannel.INBOUND : AcquisitionChannel.OUTBOUND
    const onValueChange = (value: AcquisitionChannel) => {
        onChange(value === AcquisitionChannel.INBOUND)
    }

    return (
        <Select onValueChange={onValueChange} value={visibleValue} disabled={disabled}>
            <SelectTrigger className="w-full" id="is_internal_acquisition_channel">
                <SelectValue placeholder="Select an acquisition channel" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Acquisition channel</SelectLabel>
                    <SelectItem value={AcquisitionChannel.OUTBOUND}>{AcquisitionChannel.OUTBOUND}</SelectItem>
                    <SelectItem value={AcquisitionChannel.INBOUND}>{AcquisitionChannel.INBOUND}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

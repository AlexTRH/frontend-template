import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@shared/ui/radio-group'
import { Label } from '@shared/ui/label'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu'
import { Button } from '@shared/ui/button'
import type { QueryParamsPayload } from '@shared/types'

import { useFetchRequestCreatorsQuery } from '../hooks'

type Props = {
    request_creator: string
    setParams: (params: QueryParamsPayload) => void
}
export function FilterByCreator({ request_creator, setParams }: Props) {
    const { creators } = useFetchRequestCreatorsQuery()
    const [open, setOpen] = useState<boolean>(false)
    const [checkedList, setCheckedList] = useState<string[]>(
        request_creator.split(',').filter((creator) => creator !== 'my' && creator !== 'all')
    )
    const onRadioValueChange = (value: string) => {
        setCheckedList([])
        setParams({ request_creator: value })
    }

    const onCheckedChange = (checked: boolean, creator: string) => {
        setCheckedList((prev) => (checked ? [...prev, creator] : prev.filter((email) => email !== creator)))
    }

    const applyChecked = () => {
        setParams({ request_creator: checkedList.length ? checkedList.join(',') : 'my' })
        setOpen((prev) => !prev)
    }

    const resetChecked = () => {
        setCheckedList([])
        onRadioValueChange('my')
        setOpen((prev) => !prev)
    }

    return (
        <div className="space-y-4">
            <RadioGroup defaultValue="option-one" onValueChange={onRadioValueChange} value={request_creator}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="my" id="my" />
                    <Label htmlFor="my">My</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All</Label>
                </div>
            </RadioGroup>
            <DropdownMenu onOpenChange={setOpen} open={open}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        Specify...
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="bottom">
                    {creators?.map((creator) => (
                        <DropdownMenuCheckboxItem
                            key={creator}
                            checked={checkedList.includes(creator)}
                            onCheckedChange={(checked) => onCheckedChange(checked, creator)}
                            onSelect={(e) => e.preventDefault()}
                        >
                            {creator}
                        </DropdownMenuCheckboxItem>
                    ))}

                    <div className="flex justify-evenly">
                        <Button variant="link" size="sm" onClick={resetChecked}>
                            Reset
                        </Button>
                        <Button variant="link" size="sm" onClick={applyChecked}>
                            Apply
                        </Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

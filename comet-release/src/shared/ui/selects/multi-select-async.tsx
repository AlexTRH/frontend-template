import type { KeyboardEvent } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@shared/ui/command'
import { BadgeClosable } from '@shared/ui/badge-closable'
import type { UseSearchFromCatalogFunction } from '@shared/types/query'
import type { CatalogItem } from '@shared/types'
import { useDebounce } from '@shared/hooks/use-debounce'
import { noDataValue } from '@shared/constants/form'

type Props = {
    useFetchQuery: UseSearchFromCatalogFunction
    onChange: (value: CatalogItem[]) => void
    value: CatalogItem[]
    disabled?: boolean
}

export function MultiSelectAsync({ useFetchQuery, value = [], onChange, disabled }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const debouncedInputValue = useDebounce(inputValue, 500)

    const { data } = useFetchQuery({ search: debouncedInputValue, disabled })

    const handleUnselect = useCallback(
        (item: CatalogItem) => {
            const filteredValue = value.filter((s) => s.title !== item.title)
            onChange(filteredValue)
        },
        [value]
    )

    const handleSelect = useCallback(
        (item: CatalogItem) => {
            setInputValue('')
            onChange([...value, item])
        },
        [value]
    )

    const getSelectables = useCallback((allItems: CatalogItem[] = [], selectedItems: CatalogItem[]): CatalogItem[] => {
        const selectedIds = new Set(selectedItems.map((item) => item.uuid))
        return allItems.filter((item) => !selectedIds.has(item.uuid))
    }, [])

    const selectables = useMemo(() => getSelectables(data, value), [data, value])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current
            if (input) {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    if (input.value === '') {
                        const newSelected = [...value]
                        newSelected.pop()
                        onChange(newSelected)
                    }
                }
                if (e.key === 'Escape') {
                    input.blur()
                }
            }
        },
        [data, value]
    )

    return (
        <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
            <div className="group-hover:bg-accent group rounded-md border border-input px-3 py-1.5 min-h-9 text-sm ring-offset-background hover:bg-accent shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
                <div className="flex flex-wrap gap-2">
                    {value.map((item) => {
                        return (
                            <BadgeClosable
                                key={item.uuid}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUnselect(item)
                                    }
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}
                                onClick={() => handleUnselect(item)}
                                disabled={disabled}
                            >
                                {item.title}
                            </BadgeClosable>
                        )
                    })}

                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={
                            disabled && !value.length ? noDataValue : disabled ? undefined : 'Select from catalog'
                        }
                        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                        disabled={disabled}
                    />
                </div>
            </div>
            {open ? (
                <div className="relative top-2">
                    <CommandList>
                        {selectables.length ? (
                            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-xs outline-none animate-in">
                                <CommandGroup className="h-full overflow-auto">
                                    {selectables.map((item) => {
                                        return (
                                            <CommandItem
                                                key={item.uuid}
                                                onMouseDown={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                }}
                                                onSelect={() => handleSelect(item)}
                                                className="cursor-pointer"
                                            >
                                                {item.title}
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </div>
                        ) : (
                            <CommandEmpty className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-xs outline-none animate-in">
                                <span className="flex justify-center px-2 py-2 text-sm text-muted-foreground">
                                    No results found.
                                </span>
                            </CommandEmpty>
                        )}
                    </CommandList>
                </div>
            ) : null}
        </Command>
    )
}

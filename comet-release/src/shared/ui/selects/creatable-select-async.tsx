import type { KeyboardEvent } from 'react'
import { useMemo, useRef, useState } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { WithTooltip } from '@shared/ui/with'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@shared/ui/command'
import { BadgeClosable } from '@shared/ui/badge-closable'
import type { UseCreateCatalogItemMutation, UseSearchFromCatalogFunction } from '@shared/types/query'
import type { CatalogItem, UuId } from '@shared/types'
import { cn } from '@shared/lib/ui'
import { useDebounce } from '@shared/hooks/use-debounce'
import { noDataValue } from '@shared/constants/form'

type Props = {
    useFetchQuery: UseSearchFromCatalogFunction
    useCreateItemMutation: UseCreateCatalogItemMutation
    onChange: (value: CatalogItem | null) => void
    value: CatalogItem | null
    disabled?: boolean
}

export function CreatableSelectAsync({ useFetchQuery, useCreateItemMutation, value, onChange, disabled }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const debouncedInputValue = useDebounce(inputValue, 500)

    const handleSelect = (item: CatalogItem) => {
        setInputValue('')
        onChange(item)
    }

    const handleUnselect = () => {
        onChange(null)
    }

    const handleMutate = (title: string) => {
        setInputValue('')
        onChange({ uuid: 'uuid', title })
    }

    const handleSuccess = (uuid: UuId, title: string) => {
        onChange({ uuid, title })
    }

    const { data, isFetching } = useFetchQuery({ search: debouncedInputValue, disabled })
    const { mutate, isPending } = useCreateItemMutation({ onMutate: handleMutate })

    const selectables = useMemo(() => data?.filter((item) => item.uuid !== value?.uuid), [data, value]) || []
    const isCreationPossible = !!inputValue.trim().length && !data?.length && !isFetching && !isPending
    const isCompleted = !!value

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current
        if (input) {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (input.value === '') {
                    onChange(null)
                }
            }
            // This is not a default behaviour of the <input /> field
            if (e.key === 'Escape') {
                input.blur()
            }
            if (e.key === 'Enter' && isCreationPossible) {
                mutate(input.value, {
                    onSuccess: handleSuccess,
                    onError: handleUnselect,
                })
            }
        }
    }

    return (
        <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
            <div
                className={cn(
                    'group-hover:bg-accent group rounded-md border border-input px-3 py-1.5 min-h-9 text-sm ring-offset-background hover:bg-accent shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
                    {
                        'pointer-events-none cursor-not-allowed opacity-50': disabled,
                    }
                )}
            >
                <div className="flex flex-wrap gap-2">
                    {value && (
                        <BadgeClosable
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleUnselect()
                                }
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}
                            onClick={() => handleUnselect()}
                            disabled={disabled}
                        >
                            {value.title}
                        </BadgeClosable>
                    )}

                    <WithTooltip tooltip="Press Enter to create" open={isCreationPossible}>
                        <CommandPrimitive.Input
                            ref={inputRef}
                            value={inputValue}
                            onValueChange={isCompleted ? undefined : setInputValue}
                            onBlur={() => setOpen(false)}
                            onFocus={() => setOpen(true)}
                            placeholder={
                                disabled && !value ? noDataValue : disabled ? undefined : 'Select from catalog'
                            }
                            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground placeholder:text-sm"
                            disabled={disabled}
                        />
                    </WithTooltip>
                </div>
            </div>
            {open && !isCompleted ? (
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

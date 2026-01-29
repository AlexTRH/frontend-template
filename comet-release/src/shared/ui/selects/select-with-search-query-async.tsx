import { useSearchParams } from 'react-router-dom'
import { useCallback, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Command as CommandPrimitive } from 'cmdk'
import { Button, Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@shared/ui'
import type { UseSearchFromCatalogFunction } from '@shared/types'
import { cn } from '@shared/lib/ui'
import { useDebounce } from '@shared/hooks'

type SelectWithSearchProps = {
    query: string
    placeholder?: string
    useFetchQuery: UseSearchFromCatalogFunction
}

export function SelectWithSearchQueryAsync({ query, placeholder = 'Search', useFetchQuery }: SelectWithSearchProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const debouncedInputValue = useDebounce(inputValue, 500)

    const { data } = useFetchQuery({ search: debouncedInputValue })

    const handleSelect = useCallback(
        (value: string) => {
            setInputValue('')
            searchParams.set(query, value)
            setSearchParams(searchParams)
            setOpen(false)
            inputRef.current?.blur()
        },
        [query]
    )

    return (
        <Command shouldFilter={false} className="overflow-visible bg-transparent mb-4 md:max-w-[400px]">
            <div className="rounded-md border border-1.5 border-transparent px-3 py-1.5 min-h-9 text-sm ring-offset-background bg-secondary shadow-input transition-[color,box-shadow] focus-within:border-input focus-within:ring-input/50 focus-within:input-[3px] transition-all">
                <div className="flex flex-wrap gap-2 relative">
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={placeholder}
                        className={cn(
                            'flex-1 bg-transparent outline-none placeholder:text-muted-foreground h-8 px-8 placeholder:text-base'
                        )}
                    />
                    <div className="left-0 absolute inset-y-0 flex items-center text-muted-foreground pointer-events-none">
                        <Search className="h-6 w-6" />
                    </div>

                    {inputValue.length ? (
                        <Button
                            onClick={() => setInputValue('')}
                            variant="none"
                            size="auto"
                            className="right-0 inset-y-0 absolute flex items-center text-muted-foreground"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    ) : null}
                </div>
            </div>
            {open ? (
                <div className="relative top-2">
                    <CommandList>
                        {data?.length ? (
                            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-xs outline-none animate-in">
                                <CommandGroup className="h-[130px] overflow-auto">
                                    {data.map((item) => {
                                        return (
                                            <CommandItem
                                                key={item.title}
                                                onMouseDown={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                }}
                                                onSelect={() => handleSelect(item.title)}
                                                className={cn('cursor-pointer')}
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
                                    No results found
                                </span>
                            </CommandEmpty>
                        )}
                    </CommandList>
                </div>
            ) : null}
        </Command>
    )
}

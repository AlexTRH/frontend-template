import type { CSSProperties, ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card'

type GridCell = {
    title?: string
    description?: string
    card?: ReactNode
    average?: ReactNode
}

type GridRow = {
    columns: GridCell[]
}

type GridMapperProps<T> = {
    data: T
    getConfig: (data: T) => GridRow[]
}

export function GridMapper<T>({ data, getConfig }: GridMapperProps<T>) {
    const config = getConfig(data)
    return (
        <div className="flex flex-col gap-4">
            {config.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid grid-cols-1 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-4"
                    style={{ '--cols': row.columns.length } as CSSProperties}
                >
                    {row.columns.map((cell, colIndex) => (
                        <div key={colIndex} className="flex flex-col h-full">
                            {cell.average && <div className="mb-2">{cell.average}</div>}
                            {cell.card && (
                                <Card className="h-full max-h-[320px] md:max-h-none overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>{cell.title}</CardTitle>
                                        {cell.description && <CardDescription>{cell.description}</CardDescription>}
                                    </CardHeader>
                                    <CardContent className="h-full">{cell.card}</CardContent>
                                </Card>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

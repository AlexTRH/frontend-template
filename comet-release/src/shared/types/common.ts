import type { ReactNode } from 'react'
import type { BadgeVariant } from '@shared/ui/badge'

export type CatalogItem = {
    uuid: string
    title: string
}

export type CatalogItemInteger = {
    uuid: number
    title: string
}

export type UuId = string
export type Email = string

export type WithChildren = {
    children: ReactNode
}

export type WithQueryKey = {
    queryKey?: string[]
}

export type WithClassName = {
    className?: string
}

export type WithDisabled = {
    disabled?: boolean
}

export type PaginationQueryParams = {
    limit?: number
    offset?: number
}

export type TranslationBadgedCatalogItem = {
    en: string
    badgeVariant?: BadgeVariant
}

export type CatalogConfig<K extends string> = Record<K, string>

export type Verdict = 'Approved' | 'Rejected'

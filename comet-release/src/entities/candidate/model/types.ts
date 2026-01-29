import type { Email, UuId } from '@shared/types'

export interface Candidate {
    uuid: UuId
    first_name: string
    last_name: string
    first_name_en: string
    last_name_en: string
    short_last_name: string
    short_last_name_en: string
    email: Email
    is_on_bench: boolean
    is_selling: boolean
}

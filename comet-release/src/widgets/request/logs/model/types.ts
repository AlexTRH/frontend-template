import type { Request } from '@entities/request'
import type { GenericLog } from '@entities/logs'

export type RequestChangedFields = Partial<
    Omit<Request, 'customer_id' | 'intermediary_id' | 'location_id'> & {
        customer?: string
        intermediary?: string
        location: string
    }
>

export type RequestLog = GenericLog<RequestChangedFields>

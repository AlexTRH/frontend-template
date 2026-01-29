import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { QueryParamsPayload } from '@shared/types'
import type { Department } from '@shared/constants'
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from '@shared/constants'

import type { RequestStatus } from '../model'

export interface RequestsParams extends QueryParamsPayload {
    limit: number
    offset: number
    request_creator: string
    search?: string
    date_from?: string
    date_to?: string
    status?: RequestStatus
    department?: Department
}

type RequestsState = {
    params: RequestsParams
}

type RequestsAction = {
    setParams: (param: Partial<RequestsState['params']>) => void
}

export const useRequestsStore = create<RequestsState & RequestsAction>()(
    devtools(
        persist(
            (set) => ({
                params: {
                    limit: DEFAULT_PAGINATION_LIMIT,
                    offset: DEFAULT_PAGINATION_OFFSET,
                    request_creator: 'my',
                    search: undefined,
                    date_from: undefined,
                    date_to: undefined,
                    status: undefined,
                    department: undefined,
                },
                setParams: (partialParams) => {
                    set((state) => ({
                        params: {
                            ...state.params,
                            ...partialParams,
                        },
                    }))
                },
            }),
            { name: 'requests' }
        )
    )
)

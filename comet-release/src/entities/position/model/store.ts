import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { QueryParamsPayload } from '@shared/types'
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from '@shared/constants'

interface PositionsParams extends QueryParamsPayload {
    limit: number
    offset: number
    search?: string
}

type PositionsState = {
    params: PositionsParams
}

type PositionsAction = {
    setParams: (param: Partial<PositionsState['params']>) => void
}

export const usePositionsStore = create<PositionsState & PositionsAction>()(
    devtools(
        persist(
            (set) => ({
                params: {
                    limit: DEFAULT_PAGINATION_LIMIT,
                    offset: DEFAULT_PAGINATION_OFFSET,
                    search: undefined,
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
            { name: 'positions' }
        )
    )
)

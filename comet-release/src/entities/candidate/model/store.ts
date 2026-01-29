import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { QueryParamsPayload } from '@shared/types'
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from '@shared/constants'

interface CandidatesParams extends QueryParamsPayload {
    limit: number
    offset: number
    search?: string
}

type CandidatesState = {
    params: CandidatesParams
}

type CandidatesAction = {
    setParams: (param: Partial<CandidatesState['params']>) => void
}

export const useCandidatesStore = create<CandidatesState & CandidatesAction>()(
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
            { name: 'candidates' }
        )
    )
)

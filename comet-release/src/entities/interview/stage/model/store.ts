import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { QueryParamsPayload } from '@shared/types'
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from '@shared/constants'

interface InterviewsParams extends QueryParamsPayload {
    limit: number
    offset: number
    search?: string
}

type InterviewsState = {
    params: InterviewsParams
}

type InterviewsAction = {
    setParams: (param: Partial<InterviewsState['params']>) => void
}

export const useInterviewsStore = create<InterviewsState & InterviewsAction>()(
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
            { name: 'interviews' }
        )
    )
)

export type ResponseList<ListTitle extends string, ListItem> = {
    total: number
} & Record<ListTitle, ListItem[]>

export type ResponseError<T> = {
    detail: T
}

export type ClientResponseError = ResponseError<{ message: string }>

export type ValidationResponseError = ResponseError<ResponseErrorDetail[]>

type ResponseErrorDetail = {
    type: string
    loc: string[]
    msg: string
    input: number
}

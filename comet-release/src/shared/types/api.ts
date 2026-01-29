export type QueryParamValue = string | Date | number | boolean | Array<string | Date | number>

export type QueryParamsPayload = Record<string, QueryParamValue | undefined>

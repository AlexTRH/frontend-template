import { format, parseISO } from 'date-fns'

export type DateRange = {
    date_from: string
    date_to: string
}

const DATE_DTO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss"
const DATE_CLIENT_FORMAT = 'dd.MM.yyyy HH:mm'
const DATE_LOG_FORMAT = "MMM d 'at' hh:mm a"
const DATE_RANGE_QUERY = 'yyyy-MM-dd'

export const formatDateToDTO = (date: Date): string => {
    return format(date, DATE_DTO_FORMAT)
}

export const formatDTOtoClient = (dateDTO: string): string => {
    const parsedDate = parseISO(dateDTO)
    return format(parsedDate, DATE_CLIENT_FORMAT)
}

export const formatDTOtoLog = (dateDTO: string): string => {
    const parsedDate = parseISO(dateDTO)
    return format(parsedDate, DATE_LOG_FORMAT)
}

export const getCurrentDateTime = () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes())
}

export const parseDate = (dateString?: string | Date): Date | undefined => {
    if (!dateString) return undefined
    return typeof dateString === 'string' ? new Date(dateString) : dateString
}

export const getWeekDateRange = (): DateRange => {
    const now = new Date()
    const dateFrom = new Date(now)
    dateFrom.setDate(now.getDate() - 6)

    return {
        date_from: format(dateFrom, DATE_RANGE_QUERY),
        date_to: format(now, DATE_RANGE_QUERY),
    }
}

export const getMonthDateRange = (): DateRange => {
    const now = new Date()
    const dateFrom = new Date(now)
    dateFrom.setDate(now.getDate() + 1)
    dateFrom.setMonth(dateFrom.getMonth() - 1)

    return {
        date_from: format(dateFrom, DATE_RANGE_QUERY),
        date_to: format(now, DATE_RANGE_QUERY),
    }
}

export const getYearDateRange = (): DateRange => {
    const now = new Date()
    const dateFrom = new Date(now)
    dateFrom.setDate(now.getDate() - 364)

    return {
        date_from: format(dateFrom, DATE_RANGE_QUERY),
        date_to: format(now, DATE_RANGE_QUERY),
    }
}

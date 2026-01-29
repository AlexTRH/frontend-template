export const createLogMessage = (type: 'request' | 'position' | 'interview', author: string): string => {
    return `${author} created this ${type}`
}

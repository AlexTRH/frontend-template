export const formatToDays = (count: number): string => {
    return count + (count < 2 ? ' day' : ' days')
}

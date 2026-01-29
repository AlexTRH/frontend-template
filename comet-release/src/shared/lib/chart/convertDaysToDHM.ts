export const convertDaysToDHM = (daysStr: string = '0'): string => {
    const daysNumber = parseFloat(daysStr)
    if (isNaN(daysNumber)) {
        return 'Invalid input'
    }

    const totalDays = Math.floor(daysNumber)
    const fractionalDay = daysNumber - totalDays

    const totalHours = fractionalDay * 24
    const hours = Math.floor(totalHours)

    const minutes = Math.round((totalHours - hours) * 60)

    return `${totalDays}d ${hours}h ${minutes}m`
}

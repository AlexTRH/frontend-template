export const extractFullNameFromEmail = (email?: string) => {
    if (!email) return null
    const match = email.match(/^([^.@]+)\.([^@]+)@/)
    if (!match) return null

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

    const first_name = capitalize(match[1])
    const last_name = capitalize(match[2])

    return last_name + ' ' + first_name
}

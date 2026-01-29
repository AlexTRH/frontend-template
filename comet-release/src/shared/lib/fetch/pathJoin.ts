export function pathJoin(parts: string[], sep: string = '/'): string {
    const regexSep = `\\${sep}`
    parts = parts.map((part, index) => {
        if (index) {
            part = part.replace(new RegExp(`^${regexSep}`), '')
        }
        if (index !== parts.length - 1) {
            part = part.replace(new RegExp(`${regexSep}$`), '')
        }
        return part
    })
    return parts.join(sep)
}

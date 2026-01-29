import type { UpdateChangeLogChanges } from '../model'

export const mapLogChanges = <TEntity>(
    type: 'request' | 'position' | 'interview',
    formatFn: (key: keyof TEntity, value: unknown) => string,
    changes: UpdateChangeLogChanges<TEntity>,
    author: string
): string[] => {
    const messages: string[] = []

    for (const key in changes) {
        const fieldChange = changes[key as keyof TEntity]
        if (fieldChange) {
            const { old_state, new_state } = fieldChange
            const oldVal = formatFn(key as keyof TEntity, old_state)
            const newVal = formatFn(key as keyof TEntity, new_state)
            messages.push(`${author} changed ${type} ${key} from ${oldVal || 'null'} to ${newVal}`)
        }
    }
    return messages
}

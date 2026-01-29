import type { Email } from '@shared/types'
import { formatDTOtoLog } from '@shared/lib/date'

import { mapLogChanges } from './map-log-changes'
import { getAuthorOfLog } from './get-author-of-log'
import { createLogMessage } from './create-log-message'

import type { GenericLog, Log } from '../model'

export const parseLogs = <TEntity>({
    type,
    formatFn,
    myEmail,
    logs,
}: {
    type: 'request' | 'position' | 'interview'
    formatFn: (key: keyof TEntity, value: unknown) => string
    myEmail: Email
    logs?: GenericLog<TEntity>[]
}): Log[] => {
    return (
        logs?.flatMap(({ operation_type, changes, created_at, updated_by }) => {
            const author = getAuthorOfLog({ myEmail, updated_by })
            if (operation_type === 'UPDATE') {
                return mapLogChanges(type, formatFn, changes, author).map((change) => ({
                    message: change,
                    date: formatDTOtoLog(created_at),
                }))
            }
            return [
                {
                    message: createLogMessage(type, author),
                    date: formatDTOtoLog(created_at),
                },
            ]
        }) ?? []
    )
}

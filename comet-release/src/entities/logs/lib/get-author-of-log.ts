import type { Email } from '@shared/types'
import { extractFullNameFromEmail } from '@shared/lib/email'

export const getAuthorOfLog = ({ myEmail, updated_by }: { myEmail: Email; updated_by?: Email }): string => {
    return !updated_by || myEmail === updated_by ? 'You' : extractFullNameFromEmail(updated_by) || ''
}

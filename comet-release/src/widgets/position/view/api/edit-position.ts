import type { UuId } from '@shared/types'
import { customFetchJson } from '@shared/lib/fetch'

import type { EditedPositionFormValue } from '../model'

export const editPosition = ({
    request_uuid,
    uuid,
    body,
}: {
    request_uuid: UuId
    uuid: UuId
    body: EditedPositionFormValue
}): Promise<void> => {
    return customFetchJson(`/v1/requests/${request_uuid}/positions/${uuid}`, {
        method: 'PATCH',
        body,
    })
}

import type * as yup from 'yup'

import type { editedPositionStageSchema } from './edit-schema'

export type EditedPositionFormValue = yup.InferType<typeof editedPositionStageSchema>

import type { Position } from '../model'
import { PositionStatusConfig } from '../config'

export const checkIfPositionDisabled = (data: Position): boolean => {
    return PositionStatusConfig[data.status].disabled
}

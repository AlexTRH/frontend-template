import type { Position } from '@entities/position'
import type { GenericLog } from '@entities/logs'

export type PositionLog = GenericLog<Partial<Position>>

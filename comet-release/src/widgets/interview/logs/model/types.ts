import type { GenericLog } from '@entities/logs'
import type { InterviewStage } from '@entities/interview/stage'

export type InterviewStageLog = GenericLog<Partial<InterviewStage>>

import type { ReactNode } from 'react'
import type { UuId } from '@shared/types'
import { useScrollToElement } from '@shared/hooks'
import { CreateInterviewStage, FeedbackAction } from '@features/interview'
import type { InterviewStageMode } from '@entities/interview/stage'
import { InterviewStageCard, InterviewStatus } from '@entities/interview/stage'

import { useFetchInterviewStagesQuery } from './hooks'

type Props = {
    position_id: UuId
    request_id: UuId
    candidate_email: string
    isPositionDisabled: boolean
    renderLogs?: (interview_uuid: UuId, isLogsOpen: boolean, setLogsOpen: (v: boolean) => void) => ReactNode
}
export function InterviewFlow({ position_id, isPositionDisabled, request_id, candidate_email, renderLogs }: Props) {
    const { data } = useFetchInterviewStagesQuery({ request_id, position_id })
    const registerElementRef = useScrollToElement<HTMLFormElement>(data?.map((stage) => stage.uuid) || [])
    const getInitialMode = (status: InterviewStatus): InterviewStageMode => {
        if (
            status === InterviewStatus.CANCELED ||
            status === InterviewStatus.FAILED ||
            status === InterviewStatus.SUCCESSFUL
        ) {
            return 'disabled'
        } else return 'view'
    }

    return (
        <div className="flex flex-col gap-4 mt-8">
            <h2 className="text-center">Interview flow</h2>
            <div className="flex flex-col gap-4">
                {data?.map((stage) => (
                    <InterviewStageCard
                        key={stage.uuid}
                        ref={registerElementRef(stage.uuid)}
                        interview_stage={stage}
                        request_id={request_id}
                        position_id={position_id}
                        candidate_email={candidate_email}
                        initialMode={getInitialMode(stage.status)}
                        renderLogs={(isLogsOpen, setLogsOpen) =>
                            renderLogs && renderLogs(stage.uuid, isLogsOpen, setLogsOpen)
                        }
                        actionsSlot={
                            getInitialMode(stage.status) === 'view' ? (
                                <FeedbackAction
                                    interview_id={stage.uuid}
                                    position_id={position_id}
                                    request_id={request_id}
                                />
                            ) : undefined
                        }
                    />
                ))}
            </div>
            {!isPositionDisabled && (
                <CreateInterviewStage
                    request_id={request_id}
                    position_id={position_id}
                    candidate_email={candidate_email}
                />
            )}
        </div>
    )
}

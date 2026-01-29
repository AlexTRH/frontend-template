import { useCallback, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@shared/ui/button'
import type { UuId } from '@shared/types'
import { InterviewStageCard } from '@entities/interview/stage'

type Props = {
    position_id: UuId
    request_id: UuId
    candidate_email: string
}
export function CreateInterviewStage({ position_id, request_id, candidate_email }: Props) {
    const [createMode, setCreateMode] = useState<boolean>(false)

    const handleOpen = useCallback(() => {
        setCreateMode(true)
    }, [])
    const handleClose = useCallback(() => {
        setCreateMode(false)
    }, [])

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        if (createMode) {
            scrollToBottom()
        }
    }, [createMode])

    return (
        <div className="flex flex-col">
            {createMode ? (
                <InterviewStageCard
                    position_id={position_id}
                    request_id={request_id}
                    initialMode="create"
                    closeStage={handleClose}
                    candidate_email={candidate_email}
                />
            ) : (
                <Button variant="outline" size="icon_lg" className="rounded-full self-center mb-8" onClick={handleOpen}>
                    <Plus />
                </Button>
            )}
        </div>
    )
}

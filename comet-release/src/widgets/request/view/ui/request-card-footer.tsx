import { CardFooter } from '@shared/ui/card'
import { Button } from '@shared/ui/button'
import type { UuId } from '@shared/types'
import { CloseRequestBtn } from '@features/request/close-request'

type Props = {
    request_uuid: UuId
    isEditMode: boolean
    setEditMode: (value: boolean) => void
    onCancelClick: () => void
    formId: string
    isSaveBtnDisabled: boolean
}

export function RequestCardFooter({
    request_uuid,
    isEditMode,
    setEditMode,
    formId,
    onCancelClick,
    isSaveBtnDisabled,
}: Props) {
    return (
        <CardFooter className="flex gap-4 justify-end">
            {isEditMode ? (
                <>
                    <Button variant="outline" type="button" onClick={onCancelClick}>
                        Cancel
                    </Button>
                    <Button variant="default" type="submit" form={formId} disabled={isSaveBtnDisabled}>
                        Save changes
                    </Button>
                </>
            ) : (
                <>
                    <Button variant="outline" type="button" onClick={() => setEditMode(true)}>
                        Edit request
                    </Button>
                    <CloseRequestBtn request_uuid={request_uuid} />
                </>
            )}
        </CardFooter>
    )
}

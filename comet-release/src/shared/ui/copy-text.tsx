import { toast } from 'sonner'
import { Copy } from 'lucide-react'
import { WithTooltip } from '@shared/ui/with'
import { Button } from '@shared/ui/button'

type Props = {
    copiedText: string
    toastText?: string
    tooltipText?: string
}
export function CopyText({ copiedText, toastText = 'Copied', tooltipText = 'Copy' }: Props) {
    const copyLink = async () => {
        await navigator.clipboard.writeText(copiedText)
        toast.success(toastText)
    }

    return (
        <WithTooltip tooltip={tooltipText}>
            <Button onClick={copyLink} variant="ghost" size="sm">
                <Copy className="size-5" />
            </Button>
        </WithTooltip>
    )
}

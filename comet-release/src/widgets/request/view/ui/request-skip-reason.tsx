import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@shared/ui/accordion'

type Props = {
    skip_reason: string | null
}
export function RequestSkipReason({ skip_reason }: Props) {
    return (
        <>
            {skip_reason?.trim() && (
                <Accordion type="single" collapsible className="w-full md:w-1/2">
                    <AccordionItem value="skip_reason">
                        <AccordionTrigger className="text-base pt-0">Skip Reason</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>{skip_reason}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </>
    )
}

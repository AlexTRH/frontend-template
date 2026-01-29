import type { Log } from 'src/entities/logs'
import { Dot } from 'lucide-react'

type Props = {
    logs: Log[]
}

export function LogsList({ logs }: Props) {
    return (
        <ul className="space-y-4 text-secondary-foreground text-sm">
            {logs.length ? (
                logs.map((log, index) => (
                    <li key={index} className="flex gap-x-4">
                        <div className="flex items-center gap-4 w-4/5 break-all">
                            <Dot className="size-4 shrink-0" />
                            {log.message}
                        </div>
                        <p className="w-1/5">{log.date}</p>
                    </li>
                ))
            ) : (
                <li>Activity history is empty for now</li>
            )}
        </ul>
    )
}

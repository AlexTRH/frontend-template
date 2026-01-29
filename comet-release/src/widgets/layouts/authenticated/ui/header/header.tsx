import { AppNavigation } from './navigation'
import { AppMenu } from './menu'

export function Header() {
    return (
        <header>
            <div className="container mx-auto p-4 h-16 flex justify-between items-center gap-x-4">
                <AppNavigation />
                <AppMenu />
            </div>
        </header>
    )
}

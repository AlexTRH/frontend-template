import { Sun, MoonStar } from 'lucide-react'
import { Switch } from '@shared/ui/switch'
import { Label } from '@shared/ui/label'
import { useTheme } from '@shared/contexts/theme'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Label htmlFor="dark-mode" className="flex justify-between w-full cursor-pointer">
            <div className="flex items-center gap-4">
                {theme === 'dark' ? <MoonStar /> : <Sun />}
                Dark mode
            </div>
            <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
        </Label>
    )
}

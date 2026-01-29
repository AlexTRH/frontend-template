import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/ui/dropdown-menu'
import { Button } from '@shared/ui/button'
import { useAuthStore } from '@shared/store/auth'
import { AppRoutes, RoutePath } from '@shared/config/router'

export function UserMenu() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { user, logout } = useAuthStore()

    const handleSettings = () => {
        void navigate(RoutePath[AppRoutes.SETTINGS])
    }

    const handleLogout = () => {
        logout()
        void navigate(RoutePath[AppRoutes.LOGIN], { replace: true })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                    <span className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
                        <User className="size-4" />
                    </span>
                    <span className="hidden sm:inline">{user?.name ?? user?.email ?? 'User'}</span>
                    <ChevronDown className="size-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleSettings}>
                    <Settings className="size-4" />
                    {t('common:common.profile.settings')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="size-4" />
                    {t('common:common.profile.logout')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

import { Link } from 'react-router-dom'
import { ChartNoAxesCombined, CircleUserRound, LogOut } from 'lucide-react'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@shared/ui/menubar'
import { logout } from '@shared/lib/auth'
import { RoutePath } from '@shared/config/router'
import { ThemeToggle } from '@features/theme-toggle'
import { useDecodeIdToken } from '@entities/auth/hooks'

export function AppMenu() {
    const userData = useDecodeIdToken()

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    <span className="block mr-4 font-semibold text-base">{userData?.name}</span>
                    <CircleUserRound />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem asChild>
                        <Link to={RoutePath.dashboard}>
                            <ChartNoAxesCombined />
                            <span className="ml-2">Dashboard</span>
                        </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onSelect={(e) => e.preventDefault()}>
                        <ThemeToggle />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={logout}>
                        <LogOut />
                        <span className="ml-2">Logout</span>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

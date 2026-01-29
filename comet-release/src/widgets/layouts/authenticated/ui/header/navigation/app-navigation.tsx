import { Link } from 'react-router-dom'
import { SidebarTrigger } from '@shared/ui/sidebar'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@shared/ui/navigation-menu'
import { useIsMobile } from '@shared/hooks'

import { APP_NAVIGATION_ITEMS } from '../../../config'

export function AppNavigation() {
    const isMobile = useIsMobile()

    if (isMobile) return <SidebarTrigger />
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {APP_NAVIGATION_ITEMS.map((item) => (
                    <NavigationMenuItem key={item.title}>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                            <Link to={item.url}>{item.title}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

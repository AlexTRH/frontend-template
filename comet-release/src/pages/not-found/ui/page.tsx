import { Link } from 'react-router-dom'
import { Error } from '@shared/ui/errors/error'
import { buttonVariants } from '@shared/ui/button'
import { RoutePath } from '@shared/config/router'

export function NotFoundPage() {
    return (
        <div className="fullscreen-center">
            <Error
                title="404"
                description="Ooooops... page not found"
                slot={
                    <Link to={RoutePath.main} className={buttonVariants({ variant: 'default' })}>
                        Go to main page
                    </Link>
                }
            />
        </div>
    )
}

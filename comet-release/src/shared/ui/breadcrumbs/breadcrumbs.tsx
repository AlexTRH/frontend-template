import type { To } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './breadcrumb'

type PathItem = {
    to?: To
    title?: string
    current?: boolean
}

type Paths = {
    paths: PathItem[]
}

export function Breadcrumbs({ paths }: Paths) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {paths.map((path, index) => {
                    return path.current ? (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbPage>{path.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    ) : (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={path.to || ''}>{path.title}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

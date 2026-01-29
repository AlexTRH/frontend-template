import { useSearchParams } from 'react-router-dom'
import { Department } from '@shared/constants'

export const useDepartmentSearchParam = (): Department => {
    const [searchParams] = useSearchParams()
    return (searchParams.get('department') as Department) || Department.BE
}

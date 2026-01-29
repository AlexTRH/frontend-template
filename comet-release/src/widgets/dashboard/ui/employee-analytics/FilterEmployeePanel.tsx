import { SelectDateRangeQuery, SelectWithSearchQueryAsync } from '@shared/ui'
import { extractFullNameFromEmail } from '@shared/lib/email'
import { useFetchCandidatesEmailQuery } from '@entities/catalogs'

import { useEmailSearchParam } from '../../hooks'

export function FilterEmployeePanel() {
    const { email } = useEmailSearchParam()

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap justify-between gap-2">
                <h3>{email ? extractFullNameFromEmail(email) : 'Search for a person to see analytics'}</h3>
                {email && <SelectDateRangeQuery />}
            </div>
            <SelectWithSearchQueryAsync
                query="email"
                useFetchQuery={useFetchCandidatesEmailQuery}
                placeholder="Search for a person..."
            />
        </div>
    )
}

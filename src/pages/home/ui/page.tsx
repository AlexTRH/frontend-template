import { useTranslation } from 'react-i18next'
import { Button } from '@shared/ui/button'
import { CreateItemModal } from '@features/create-item'
import { useItemsQuery } from '@entities/item'

export function HomePage() {
    const { t } = useTranslation()
    const { data: items, isLoading } = useItemsQuery()

    return (
        <div className="container mx-auto max-w-2xl space-y-6 p-6">
            <h1 className="text-3xl font-bold">{t('common:common.title')}</h1>
            <p className="text-muted-foreground">{t('common:common.home')}</p>

            <div className="flex items-center gap-4">
                <CreateItemModal trigger={<Button>{t('common:common.createItem')}</Button>} />
            </div>

            <section>
                <h2 className="mb-2 text-xl font-semibold">Example list (API)</h2>
                {isLoading && <p className="text-muted-foreground">Loading...</p>}
                {items && (
                    <ul className="list-inside list-disc space-y-1">
                        {items.map((item) => (
                            <li key={item.id}>{item.title}</li>
                        ))}
                    </ul>
                )}
                {!isLoading && items?.length === 0 && (
                    <p className="text-muted-foreground">No items yet. Create one above.</p>
                )}
            </section>
        </div>
    )
}

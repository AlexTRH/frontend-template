export type ItemStatus = 'active' | 'draft' | 'archived'

export type Item = {
    id: string
    title: string
    status: ItemStatus
    createdAt: string
}

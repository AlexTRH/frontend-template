export type ItemStatus = 'active' | 'draft' | 'archived'

export type Item = {
    id: string
    title: string
    status: ItemStatus
    createdAt: string
}

/** Payload for create/update item (title + status). */
export type ItemPayload = Pick<Item, 'title' | 'status'>

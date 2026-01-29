import type { Email } from '@shared/types'

type CreateChangeLog<TEntity> = {
    operation_type: 'CREATE'
    created_at: string
    updated_by?: Email
    changes: { new_state: TEntity }
}

export type UpdateChangeLogChanges<TEntity> = {
    [Key in keyof TEntity]?: {
        old_state: TEntity[Key]
        new_state: TEntity[Key]
    }
}

export type UpdateChangeLog<TEntity> = {
    operation_type: 'UPDATE'
    created_at: string
    updated_by?: Email
} & {
    changes: UpdateChangeLogChanges<TEntity>
}

export type GenericLog<TEntity> = CreateChangeLog<TEntity> | UpdateChangeLog<TEntity>

export type Log = {
    message: string
    date: string
}

import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'
import { Column, DEFAULT_COLUMNS } from '@/app/types/kanban'

type ColumnRow = Database['public']['Tables']['columns']['Row']

export class ColumnService {
    private supabase = createClient()

    // Convert database row to Column type
    private mapColumnFromDB(columnRow: ColumnRow): Column {
        return {
            id: columnRow.column_id,
            title: columnRow.title,
            order: columnRow.order_index,
            color: columnRow.color,
            isCustom: !['todo', 'inprogress', 'done'].includes(columnRow.column_id)
        }
    }

    // Get all columns for the specified user
    async getColumns(userId?: string): Promise<Column[]> {
        console.log('ColumnService.getColumns() called')

        let currentUserId = userId;
        if (!currentUserId) {
            try {
                const { data: { user }, error } = await this.supabase.auth.getUser()
                if (error || !user) {
                    throw new Error('User not authenticated')
                }
                currentUserId = user.id;
            } catch (error) {
                console.error('Failed to get user in ColumnService:', error)
                throw new Error('User not authenticated')
            }
        }

        console.log('User authenticated:', currentUserId)

        const { data: columns, error: columnsError } = await this.supabase
            .from('columns')
            .select('*')
            .eq('user_id', currentUserId)
            .order('order_index', { ascending: true })

        console.log('Columns query result:', { columns, columnsError })

        if (columnsError) {
            console.error('Error fetching columns:', columnsError)
            // If no columns exist for this user, create default ones
            if (columnsError.code === 'PGRST116') {
                console.log('No columns found, creating default columns')
                await this.createDefaultColumns(currentUserId)
                return DEFAULT_COLUMNS
            }
            throw columnsError
        }

        if (!columns || columns.length === 0) {
            console.log('No columns found, creating default columns')
            await this.createDefaultColumns(currentUserId)
            return DEFAULT_COLUMNS
        }

        const result = columns.map(column => this.mapColumnFromDB(column))
        console.log('Returning', result.length, 'columns')
        return result
    }

    // Create default columns for a new user
    async createDefaultColumns(userId: string): Promise<void> {
        console.log('Creating default columns for user:', userId)

        const defaultColumnsData = DEFAULT_COLUMNS.map(column => ({
            user_id: userId,
            column_id: column.id,
            title: column.title,
            order_index: column.order,
            color: column.color || '#6b7280'
        }))

        const { error } = await this.supabase
            .from('columns')
            .insert(defaultColumnsData)

        if (error) {
            console.error('Error creating default columns:', error)
            throw error
        }

        console.log('Default columns created successfully')
    }

    // Update a column
    async updateColumn(columnId: string, updates: Partial<Column>, userId?: string): Promise<Column> {
        let currentUserId = userId;
        if (!currentUserId) {
            const { data: { user } } = await this.supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')
            currentUserId = user.id;
        }

        console.log('Updating column:', columnId, 'with:', updates)

        const updateData: {
            title?: string;
            order_index?: number;
            color?: string;
            updated_at: string;
        } = {
            updated_at: new Date().toISOString(),
        }

        if (updates.title !== undefined) updateData.title = updates.title
        if (updates.order !== undefined) updateData.order_index = updates.order
        if (updates.color !== undefined) updateData.color = updates.color

        const { data: updatedColumn, error } = await this.supabase
            .from('columns')
            .update(updateData)
            .eq('column_id', columnId)
            .eq('user_id', currentUserId)
            .select()
            .single()

        if (error) {
            console.error('Error updating column:', error)
            throw error
        }

        console.log('Column updated successfully:', updatedColumn)
        return this.mapColumnFromDB(updatedColumn)
    }

    // Create a new column
    async createColumn(column: Omit<Column, 'isCustom'>, userId?: string): Promise<Column> {
        let currentUserId = userId;
        if (!currentUserId) {
            const { data: { user } } = await this.supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')
            currentUserId = user.id;
        }

        console.log('Creating new column:', column)

        const { data: newColumn, error } = await this.supabase
            .from('columns')
            .insert({
                user_id: currentUserId,
                column_id: column.id,
                title: column.title,
                order_index: column.order,
                color: column.color || '#6b7280'
            })
            .select()
            .single()

        if (error) {
            console.error('Error creating column:', error)
            throw error
        }

        console.log('Column created successfully:', newColumn)
        return this.mapColumnFromDB(newColumn)
    }

    // Delete a column
    async deleteColumn(columnId: string, userId?: string): Promise<void> {
        let currentUserId = userId;
        if (!currentUserId) {
            const { data: { user } } = await this.supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')
            currentUserId = user.id;
        }

        console.log('Deleting column:', columnId)

        // Don't allow deleting default columns
        if (['todo', 'inprogress', 'done'].includes(columnId)) {
            throw new Error('Cannot delete default columns')
        }

        const { error } = await this.supabase
            .from('columns')
            .delete()
            .eq('column_id', columnId)
            .eq('user_id', currentUserId)

        if (error) {
            console.error('Error deleting column:', error)
            throw error
        }

        console.log('Column deleted successfully')
    }
} 
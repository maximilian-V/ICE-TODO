import { createClient } from '@/lib/supabase/client'
import { Task, Subtask } from '@/app/types/kanban'
import { Database } from '@/lib/supabase/database.types'

type TaskRow = Database['public']['Tables']['tasks']['Row']
type SubtaskRow = Database['public']['Tables']['subtasks']['Row']

export class TaskService {
    private supabase = createClient()

    // Convert database row to Task type
    private mapTaskFromDB(taskRow: TaskRow, subtasks: SubtaskRow[] = []): Task {
        return {
            id: taskRow.id,
            title: taskRow.title,
            description: taskRow.description || undefined,
            impact: taskRow.impact,
            confidence: taskRow.confidence,
            ease: taskRow.ease,
            iceScore: taskRow.ice_score,
            columnId: taskRow.column_id,
            orderIndex: taskRow.order_index,
            subtasks: subtasks.map(this.mapSubtaskFromDB),
            createdAt: new Date(taskRow.created_at),
            updatedAt: new Date(taskRow.updated_at),
        }
    }

    // Convert database row to Subtask type
    private mapSubtaskFromDB(subtaskRow: SubtaskRow): Subtask {
        return {
            id: subtaskRow.id,
            title: subtaskRow.title,
            completed: subtaskRow.completed,
            taskId: subtaskRow.task_id,
        }
    }

    // Get all tasks for the specified user
    async getTasks(userId?: string): Promise<Task[]> {
        console.log('TaskService.getTasks() called')

        let currentUserId = userId;
        if (!currentUserId) {
            // Fallback to getUser if no userId provided, but with timeout
            try {
                const userPromise = this.supabase.auth.getUser();
                const timeoutPromise = new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error('getUser timeout')), 3000)
                );

                const result = await Promise.race([userPromise, timeoutPromise]);
                const { data: { user }, error } = result as Awaited<typeof userPromise>;

                if (error || !user) {
                    throw new Error('User not authenticated');
                }
                currentUserId = user.id;
            } catch (error) {
                console.error('Failed to get user in TaskService:', error);
                throw new Error('User not authenticated');
            }
        }

        console.log('User authenticated:', currentUserId)

        const { data: tasks, error: tasksError } = await this.supabase
            .from('tasks')
            .select('*')
            .eq('user_id', currentUserId)
            .order('order_index', { ascending: true })

        console.log('Tasks query result:', { tasks, tasksError })

        if (tasksError) throw tasksError

        // Only query subtasks if we have tasks
        let subtasks: SubtaskRow[] = []
        if (tasks && tasks.length > 0) {
            console.log('Querying subtasks for', tasks.length, 'tasks')
            const { data: subtasksData, error: subtasksError } = await this.supabase
                .from('subtasks')
                .select('*')
                .in('task_id', tasks.map(t => t.id))

            console.log('Subtasks query result:', { subtasksData, subtasksError })

            if (subtasksError) throw subtasksError
            subtasks = subtasksData || []
        } else {
            console.log('No tasks found, skipping subtasks query')
        }

        const result = tasks?.map(task => {
            const taskSubtasks = subtasks?.filter(st => st.task_id === task.id) || []
            return this.mapTaskFromDB(task, taskSubtasks)
        }) || []

        console.log('Returning', result.length, 'tasks')
        return result
    }

    // Create a new task
    async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, userId?: string): Promise<Task> {
        let currentUserId = userId;
        if (!currentUserId) {
            const { data: { user } } = await this.supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')
            currentUserId = user.id;
        }

        // Get the highest order index for this column and user
        const { data: maxOrderTask } = await this.supabase
            .from('tasks')
            .select('order_index')
            .eq('user_id', currentUserId)
            .eq('column_id', task.columnId)
            .order('order_index', { ascending: false })
            .limit(1)
            .single()

        const nextOrderIndex = maxOrderTask ? maxOrderTask.order_index + 1 : 0

        const { data: newTask, error: taskError } = await this.supabase
            .from('tasks')
            .insert({
                user_id: currentUserId,
                title: task.title,
                description: task.description,
                impact: task.impact,
                confidence: task.confidence,
                ease: task.ease,
                ice_score: task.iceScore,
                column_id: task.columnId,
                order_index: task.orderIndex ?? nextOrderIndex,
            })
            .select()
            .single()

        if (taskError) throw taskError

        // Create subtasks if any
        if (task.subtasks.length > 0) {
            const { error: subtasksError } = await this.supabase
                .from('subtasks')
                .insert(
                    task.subtasks.map(subtask => ({
                        task_id: newTask.id,
                        title: subtask.title,
                        completed: subtask.completed,
                    }))
                )

            if (subtasksError) throw subtasksError
        }

        return this.mapTaskFromDB(newTask, task.subtasks.map(st => ({
            id: `temp-${Date.now()}`,
            task_id: newTask.id,
            title: st.title,
            completed: st.completed,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })))
    }

    // Update an existing task
    async updateTask(taskId: string, updates: Partial<Task>, userId?: string): Promise<Task> {
        let currentUserId = userId;
        if (!currentUserId) {
            const { data: { user } } = await this.supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')
            currentUserId = user.id;
        }

        const { data: updatedTask, error: taskError } = await this.supabase
            .from('tasks')
            .update({
                ...(updates.title && { title: updates.title }),
                ...(updates.description !== undefined && { description: updates.description }),
                ...(updates.impact && { impact: updates.impact }),
                ...(updates.confidence && { confidence: updates.confidence }),
                ...(updates.ease && { ease: updates.ease }),
                ...(updates.iceScore && { ice_score: updates.iceScore }),
                ...(updates.columnId && { column_id: updates.columnId }),
                ...(updates.orderIndex !== undefined && { order_index: updates.orderIndex }),
                updated_at: new Date().toISOString(),
            })
            .eq('id', taskId)
            .eq('user_id', currentUserId)
            .select()
            .single()

        if (taskError) throw taskError

        // Update subtasks if provided
        if (updates.subtasks) {
            // Delete existing subtasks
            await this.supabase
                .from('subtasks')
                .delete()
                .eq('task_id', taskId)

            // Insert new subtasks
            if (updates.subtasks.length > 0) {
                const { error: subtasksError } = await this.supabase
                    .from('subtasks')
                    .insert(
                        updates.subtasks.map(subtask => ({
                            task_id: taskId,
                            title: subtask.title,
                            completed: subtask.completed,
                        }))
                    )

                if (subtasksError) throw subtasksError
            }
        }

        // Get updated subtasks
        const { data: subtasks } = await this.supabase
            .from('subtasks')
            .select('*')
            .eq('task_id', taskId)

        return this.mapTaskFromDB(updatedTask, subtasks || [])
    }

    // Delete a task
    async deleteTask(taskId: string, userId?: string): Promise<void> {
        let currentUserId = userId;
        if (!currentUserId) {
            const { data: { user } } = await this.supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')
            currentUserId = user.id;
        }

        // Delete subtasks first (due to foreign key constraint)
        await this.supabase
            .from('subtasks')
            .delete()
            .eq('task_id', taskId)

        // Delete the task
        const { error } = await this.supabase
            .from('tasks')
            .delete()
            .eq('id', taskId)
            .eq('user_id', currentUserId)

        if (error) throw error
    }

    // Toggle subtask completion
    async toggleSubtask(taskId: string, subtaskId: string, userId?: string): Promise<void> {
        let currentUserId = userId;
        if (!currentUserId) {
            const { data: { user } } = await this.supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')
            currentUserId = user.id;
        }

        // Get current subtask
        const { data: subtask, error: getError } = await this.supabase
            .from('subtasks')
            .select('*')
            .eq('id', subtaskId)
            .eq('task_id', taskId)
            .single()

        if (getError) throw getError

        // Toggle completion
        const { error: updateError } = await this.supabase
            .from('subtasks')
            .update({
                completed: !subtask.completed,
                updated_at: new Date().toISOString(),
            })
            .eq('id', subtaskId)

        if (updateError) throw updateError

        // Update parent task's updated_at
        await this.supabase
            .from('tasks')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', taskId)
            .eq('user_id', currentUserId)
    }

    // Update task orders in bulk
    async updateTaskOrders(taskOrders: { id: string; orderIndex: number; columnId?: string }[], userId?: string): Promise<void> {
        let currentUserId = userId;
        if (!currentUserId) {
            const { data: { user } } = await this.supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')
            currentUserId = user.id;
        }

        // Update each task's order
        for (const taskOrder of taskOrders) {
            const updateData: {
                order_index: number;
                updated_at: string;
                column_id?: string;
            } = {
                order_index: taskOrder.orderIndex,
                updated_at: new Date().toISOString(),
            }

            if (taskOrder.columnId) {
                updateData.column_id = taskOrder.columnId
            }

            const { error } = await this.supabase
                .from('tasks')
                .update(updateData)
                .eq('id', taskOrder.id)
                .eq('user_id', currentUserId)

            if (error) throw error
        }
    }
} 
'use client';

import { useState, useEffect } from 'react';
import { TaskService } from '@/lib/services/tasks';
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
} from '@dnd-kit/sortable';
import { Task, COLUMNS } from '@/app/types/kanban';
import { KanbanColumn } from './KanbanColumn';
import { TaskFormDialog } from './TaskFormDialog';
import { TaskCard } from './TaskCard';
import { DeleteTaskDialog } from './DeleteTaskDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from './AuthProvider';

export function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [newTaskColumnId, setNewTaskColumnId] = useState<string>('todo');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    const { user, signOut } = useAuth();
    const taskService = new TaskService();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    // Load tasks when user changes
    useEffect(() => {
        const loadTasks = async () => {
            if (!user) {
                setTasks([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                console.log('Loading tasks for user:', user.email);

                const userTasks = await taskService.getTasks(user.id);
                setTasks(userTasks);
                console.log('Loaded tasks:', userTasks.length);
            } catch (error) {
                console.error('Error loading tasks:', error);
                setError('Failed to load tasks');
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, [user]);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const activeId = active.id as string;
        const task = tasks.find((t) => t.id === activeId);
        setActiveTask(task || null);
    };

    const handleDragOver = () => {
        // We'll handle all the logic in handleDragEnd instead
        // This function is kept for potential future visual feedback
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over || !user) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        console.log('Drag end:', { activeId, overId });

        if (activeId === overId) return;

        const activeTask = tasks.find((t) => t.id === activeId);
        if (!activeTask) return;

        // Use the original task state for comparison (in case local state was modified during drag)
        const originalColumnId = activeTask.columnId;

        const overColumn = COLUMNS.find((col) => col.id === overId);
        const overTask = tasks.find((t) => t.id === overId);

        console.log('Drag end details:', {
            activeTask: { id: activeTask.id, title: activeTask.title, columnId: activeTask.columnId },
            overColumn: overColumn?.id,
            overTask: overTask ? { id: overTask.id, title: overTask.title, columnId: overTask.columnId } : null
        });

        // Get the original task state from the database perspective (not the potentially modified local state)
        const originalActiveTask = tasks.find((t) => t.id === activeId);
        console.log('Original active task state:', originalActiveTask ? {
            id: originalActiveTask.id,
            title: originalActiveTask.title,
            columnId: originalActiveTask.columnId,
            orderIndex: originalActiveTask.orderIndex
        } : null);

        try {
            let updatedTasks = [...tasks];
            const tasksToUpdate: { id: string; orderIndex: number; columnId?: string }[] = [];

            if (overColumn) {
                // Dropped on a column
                console.log('Dropped on column:', overColumn.id);
                if (originalColumnId !== overColumn.id) {
                    // Moving to different column
                    const tasksInTargetColumn = tasks.filter(t => t.columnId === overColumn.id);
                    const newOrderIndex = tasksInTargetColumn.length;

                    console.log('Moving to different column:', {
                        from: originalColumnId,
                        to: overColumn.id,
                        newOrderIndex
                    });

                    updatedTasks = tasks.map(task =>
                        task.id === activeId
                            ? { ...task, columnId: overColumn.id, orderIndex: newOrderIndex }
                            : task
                    );

                    tasksToUpdate.push({
                        id: activeId,
                        orderIndex: newOrderIndex,
                        columnId: overColumn.id
                    });
                }
            } else if (overTask) {
                // Dropped on a task
                const targetColumnId = overTask.columnId;

                if (originalColumnId === targetColumnId) {
                    // Reordering within the same column
                    const tasksInColumn = tasks.filter(t => t.columnId === targetColumnId);
                    const activeIndex = tasksInColumn.findIndex(t => t.id === activeId);
                    const overIndex = tasksInColumn.findIndex(t => t.id === overId);

                    if (activeIndex !== -1 && overIndex !== -1) {
                        const reorderedTasks = arrayMove(tasksInColumn, activeIndex, overIndex);

                        // Update order indices for all tasks in this column
                        reorderedTasks.forEach((task, index) => {
                            tasksToUpdate.push({
                                id: task.id,
                                orderIndex: index
                            });
                        });

                        // Update local state
                        updatedTasks = tasks.map(task => {
                            const reorderedTask = reorderedTasks.find(t => t.id === task.id);
                            if (reorderedTask) {
                                return {
                                    ...task,
                                    orderIndex: reorderedTasks.findIndex(t => t.id === task.id)
                                };
                            }
                            return task;
                        });
                    }
                } else {
                    // Moving to a different column - insert at the position of the overTask
                    const tasksInTargetColumn = tasks.filter(t => t.columnId === targetColumnId);
                    const overIndex = tasksInTargetColumn.findIndex(t => t.id === overId);
                    const newOrderIndex = overIndex >= 0 ? overIndex : tasksInTargetColumn.length;

                    // Update the moved task
                    updatedTasks = tasks.map(task =>
                        task.id === activeId
                            ? { ...task, columnId: targetColumnId, orderIndex: newOrderIndex }
                            : task
                    );

                    // Add the moved task to updates
                    tasksToUpdate.push({
                        id: activeId,
                        orderIndex: newOrderIndex,
                        columnId: targetColumnId
                    });

                    // Reorder other tasks in the target column that come after the insertion point
                    tasksInTargetColumn.forEach((task, index) => {
                        if (index >= newOrderIndex) {
                            tasksToUpdate.push({
                                id: task.id,
                                orderIndex: index + 1
                            });
                            updatedTasks = updatedTasks.map(t =>
                                t.id === task.id ? { ...t, orderIndex: index + 1 } : t
                            );
                        }
                    });
                }
            }

            // Update local state immediately for better UX
            setTasks(updatedTasks);

            // Update database
            if (tasksToUpdate.length > 0) {
                console.log('About to update database with:', tasksToUpdate);
                await taskService.updateTaskOrders(tasksToUpdate, user.id);
                console.log('Task orders updated successfully');

                // Verify the update by checking the local state
                const updatedTask = updatedTasks.find(t => t.id === activeId);
                console.log('Updated task in local state:', updatedTask);
            }

        } catch (error) {
            console.error('Error updating task order:', error);
            setError('Failed to update task order');
            // Reload tasks to revert to database state
            const userTasks = await taskService.getTasks(user.id);
            setTasks(userTasks);
        }
    };

    const handleAddTask = (columnId: string) => {
        setNewTaskColumnId(columnId);
        setEditingTask(null);
        setIsDialogOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setIsDialogOpen(true);
    };

    const handleDeleteTask = (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            setTaskToDelete(task);
            setDeleteDialogOpen(true);
        }
    };

    const confirmDeleteTask = async () => {
        if (!user || !taskToDelete) return;

        try {
            await taskService.deleteTask(taskToDelete.id, user.id);
            setTasks((tasks) => tasks.filter((t) => t.id !== taskToDelete.id));
            console.log('Task deleted:', taskToDelete.id);
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task');
        } finally {
            setTaskToDelete(null);
        }
    };

    const handleToggleSubtask = async (taskId: string, subtaskId: string) => {
        if (!user) return;

        try {
            await taskService.toggleSubtask(taskId, subtaskId, user.id);

            // Update local state
            setTasks((tasks) =>
                tasks.map((task) => {
                    if (task.id === taskId) {
                        const updatedSubtasks = task.subtasks.map((subtask) =>
                            subtask.id === subtaskId
                                ? { ...subtask, completed: !subtask.completed }
                                : subtask
                        );
                        return { ...task, subtasks: updatedSubtasks, updatedAt: new Date() };
                    }
                    return task;
                })
            );
            console.log('Subtask toggled:', subtaskId);
        } catch (error) {
            console.error('Error toggling subtask:', error);
            setError('Failed to update subtask');
        }
    };

    const handleSaveTask = async (taskData: Partial<Task>) => {
        if (!user) return;

        try {
            if (editingTask) {
                // Update existing task
                const updatedTask = await taskService.updateTask(editingTask.id, taskData, user.id);
                setTasks((tasks) =>
                    tasks.map((t) =>
                        t.id === editingTask.id ? updatedTask : t
                    )
                );
                console.log('Task updated:', updatedTask.id);
            } else {
                // Create new task
                const targetColumnId = taskData.columnId || newTaskColumnId;
                const tasksInColumn = tasks.filter(t => t.columnId === targetColumnId);
                const newOrderIndex = tasksInColumn.length;

                const newTaskData = {
                    ...taskData,
                    columnId: targetColumnId,
                    orderIndex: newOrderIndex,
                } as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

                const newTask = await taskService.createTask(newTaskData, user.id);
                setTasks((tasks) => [...tasks, newTask]);
                console.log('Task created:', newTask.id);
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error saving task:', error);
            setError('Failed to save task');
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const getTasksByColumn = (columnId: string) => {
        return tasks.filter((task) => task.columnId === columnId);
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Card className="w-full max-w-md">
                    <CardContent className="flex items-center justify-center p-6">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                            <p>Loading your tasks...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-red-600">Error</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>{error}</p>
                        <div className="flex gap-2">
                            <Button onClick={() => window.location.reload()}>
                                Retry
                            </Button>
                            <Button variant="outline" onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Not authenticated (shouldn't happen since this component is only rendered for authenticated users)
    if (!user) {
        return (
            <div className="flex items-center justify-center h-64">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Authentication Required</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">Please sign in to access your kanban board.</p>
                        <Button onClick={() => window.location.href = '/auth/login'}>
                            Sign In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <>
            {/* User info and sign out */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-sm text-gray-600">
                        Welcome back, <span className="font-medium">{user.email}</span>
                    </p>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                    Sign Out
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                    {COLUMNS.map((column) => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            tasks={getTasksByColumn(column.id)}
                            onAddTask={handleAddTask}
                            onEditTask={handleEditTask}
                            onDeleteTask={handleDeleteTask}
                            onToggleSubtask={handleToggleSubtask}
                        />
                    ))}
                </div>
                <DragOverlay className="drag-overlay">
                    {activeTask ? (
                        <TaskCard
                            task={activeTask}
                            onEdit={() => { }}
                            onDelete={() => { }}
                            onToggleSubtask={() => { }}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>

            <TaskFormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                task={editingTask}
                onSave={handleSaveTask}
                columnId={newTaskColumnId}
            />

            <DeleteTaskDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                task={taskToDelete}
                onConfirm={confirmDeleteTask}
            />
        </>
    );
} 
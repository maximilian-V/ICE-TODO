'use client';

import { useState, useEffect } from 'react';
import { TaskService } from '@/lib/services/tasks';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
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

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over || !user) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeTask = tasks.find((t) => t.id === activeId);
        if (!activeTask) return;

        // Check if we're over a column (not a task)
        const overColumn = COLUMNS.find((col) => col.id === overId);
        const overTask = tasks.find((t) => t.id === overId);

        if (overColumn && activeTask.columnId !== overColumn.id) {
            // Moving to a different column
            const tasksInTargetColumn = tasks.filter(t => t.columnId === overColumn.id);
            const newOrderIndex = tasksInTargetColumn.length;

            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === activeId
                        ? { ...task, columnId: overColumn.id, orderIndex: newOrderIndex }
                        : task
                )
            );
        } else if (overTask && overTask.columnId !== activeTask.columnId) {
            // Moving to a different column by hovering over a task
            const tasksInTargetColumn = tasks.filter(t => t.columnId === overTask.columnId && t.id !== activeId);
            const overTaskIndex = tasksInTargetColumn.findIndex(t => t.id === overTask.id);
            const newOrderIndex = overTaskIndex >= 0 ? overTaskIndex : tasksInTargetColumn.length;

            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === activeId
                        ? { ...task, columnId: overTask.columnId, orderIndex: newOrderIndex }
                        : task
                )
            );
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over || !user) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId === overId) return;

        const activeTask = tasks.find((t) => t.id === activeId);
        if (!activeTask) return;

        const overColumn = COLUMNS.find((col) => col.id === overId);
        const overTask = tasks.find((t) => t.id === overId);

        try {
            let updatedTasks = [...tasks];
            const tasksToUpdate: { id: string; orderIndex: number; columnId?: string }[] = [];

            if (overColumn) {
                // Dropped on a column
                if (activeTask.columnId !== overColumn.id) {
                    // Moving to different column
                    const tasksInTargetColumn = tasks.filter(t => t.columnId === overColumn.id);
                    const newOrderIndex = tasksInTargetColumn.length;

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
                const tasksInColumn = tasks.filter(t => t.columnId === targetColumnId);
                const activeIndex = tasksInColumn.findIndex(t => t.id === activeId);
                const overIndex = tasksInColumn.findIndex(t => t.id === overId);

                if (activeIndex !== -1 && overIndex !== -1) {
                    // Reorder within the same column or move to different column
                    const reorderedTasks = arrayMove(tasksInColumn, activeIndex, overIndex);

                    // Update order indices
                    reorderedTasks.forEach((task, index) => {
                        tasksToUpdate.push({
                            id: task.id,
                            orderIndex: index,
                            columnId: targetColumnId !== activeTask.columnId ? targetColumnId : undefined
                        });
                    });

                    // Update local state
                    updatedTasks = tasks.map(task => {
                        const updatedTask = reorderedTasks.find(t => t.id === task.id);
                        if (updatedTask) {
                            return {
                                ...task,
                                orderIndex: reorderedTasks.findIndex(t => t.id === task.id),
                                columnId: targetColumnId
                            };
                        }
                        return task;
                    });
                }
            }

            // Update local state immediately for better UX
            setTasks(updatedTasks);

            // Update database
            if (tasksToUpdate.length > 0) {
                await taskService.updateTaskOrders(tasksToUpdate, user.id);
                console.log('Task orders updated:', tasksToUpdate);
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

    const handleDeleteTask = async (taskId: string) => {
        if (!user) return;

        try {
            await taskService.deleteTask(taskId, user.id);
            setTasks((tasks) => tasks.filter((t) => t.id !== taskId));
            console.log('Task deleted:', taskId);
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task');
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
        </>
    );
} 
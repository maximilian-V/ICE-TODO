'use client'

import { KanbanColumn } from '../components/KanbanColumn';
import { TaskFormDialog } from '../components/TaskFormDialog';
import { TaskCard } from '../components/TaskCard';
import { DeleteTaskDialog } from '../components/DeleteTaskDialog';
import { Navigation } from '../components/Navigation';
import { Task, DEFAULT_COLUMNS } from '@/app/types/kanban';
import { useState } from 'react';
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

export default function DemoPage() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            title: 'Test Task 1',
            description: 'This is a test task',
            impact: 8,
            confidence: 7,
            ease: 6,
            iceScore: 336,
            columnId: 'todo',
            orderIndex: 0,
            subtasks: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            title: 'Test Task 2',
            description: 'Another test task',
            impact: 5,
            confidence: 8,
            ease: 9,
            iceScore: 360,
            columnId: 'inprogress',
            orderIndex: 0,
            subtasks: [
                { id: 'st1', title: 'Subtask 1', completed: false, taskId: '2' },
                { id: 'st2', title: 'Subtask 2', completed: true, taskId: '2' },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [newTaskColumnId, setNewTaskColumnId] = useState<string>('todo');
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const getTasksByColumn = (columnId: string) => {
        return tasks.filter((task) => task.columnId === columnId);
    };

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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId === overId) return;

        const activeTask = tasks.find((t) => t.id === activeId);
        if (!activeTask) return;

        const overColumn = DEFAULT_COLUMNS.find((col) => col.id === overId);
        const overTask = tasks.find((t) => t.id === overId);

        if (overColumn) {
            // Dropped on a column
            if (activeTask.columnId !== overColumn.id) {
                // Moving to different column
                const tasksInTargetColumn = tasks.filter(t => t.columnId === overColumn.id);
                const newOrderIndex = tasksInTargetColumn.length;

                setTasks((tasks) =>
                    tasks.map((task) =>
                        task.id === activeId
                            ? { ...task, columnId: overColumn.id, orderIndex: newOrderIndex }
                            : task
                    )
                );
            }
        } else if (overTask) {
            // Dropped on a task
            const targetColumnId = overTask.columnId;

            if (activeTask.columnId === targetColumnId) {
                // Reordering within the same column
                const tasksInColumn = tasks.filter(t => t.columnId === targetColumnId);
                const activeIndex = tasksInColumn.findIndex(t => t.id === activeId);
                const overIndex = tasksInColumn.findIndex(t => t.id === overId);

                if (activeIndex !== -1 && overIndex !== -1) {
                    const reorderedTasks = arrayMove(tasksInColumn, activeIndex, overIndex);

                    setTasks((tasks) =>
                        tasks.map((task) => {
                            const reorderedTask = reorderedTasks.find(t => t.id === task.id);
                            if (reorderedTask) {
                                return {
                                    ...task,
                                    orderIndex: reorderedTasks.findIndex(t => t.id === task.id)
                                };
                            }
                            return task;
                        })
                    );
                }
            } else {
                // Moving to a different column
                const tasksInTargetColumn = tasks.filter(t => t.columnId === targetColumnId);
                const overIndex = tasksInTargetColumn.findIndex(t => t.id === overId);
                const newOrderIndex = overIndex >= 0 ? overIndex : tasksInTargetColumn.length;

                setTasks((tasks) =>
                    tasks.map((task) =>
                        task.id === activeId
                            ? { ...task, columnId: targetColumnId, orderIndex: newOrderIndex }
                            : task
                    )
                );
            }
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

    const confirmDeleteTask = () => {
        if (taskToDelete) {
            setTasks((tasks) => tasks.filter((t) => t.id !== taskToDelete.id));
            setTaskToDelete(null);
        }
    };

    const handleToggleSubtask = (taskId: string, subtaskId: string) => {
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
    };

    const handleSaveTask = (taskData: Partial<Task>) => {
        if (editingTask) {
            // Update existing task
            setTasks((tasks) =>
                tasks.map((t) =>
                    t.id === editingTask.id ? { ...t, ...taskData, updatedAt: new Date() } : t
                )
            );
        } else {
            // Create new task
            const targetColumnId = taskData.columnId || newTaskColumnId;
            const tasksInColumn = tasks.filter(t => t.columnId === targetColumnId);
            const newOrderIndex = tasksInColumn.length;

            const newTask: Task = {
                id: Date.now().toString(),
                title: taskData.title!,
                description: taskData.description,
                impact: taskData.impact!,
                confidence: taskData.confidence!,
                ease: taskData.ease!,
                iceScore: taskData.iceScore!,
                columnId: targetColumnId,
                orderIndex: newOrderIndex,
                subtasks: taskData.subtasks || [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            setTasks((tasks) => [...tasks, newTask]);
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="container mx-auto p-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">ICE Score Kanban Board - Demo</h1>
                    <p className="text-gray-600 mt-2">
                        Try out the kanban board functionality without creating an account - changes are not saved
                    </p>
                </header>
                <main className="h-[calc(100vh-200px)]">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                            {DEFAULT_COLUMNS.map((column) => (
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
                </main>
            </div>
        </div>
    );
}
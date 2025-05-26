'use client';

import { useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
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

export function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [newTaskColumnId, setNewTaskColumnId] = useState<string>('todo');

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = () => {
        // Handle drag start if needed
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeTask = tasks.find((t) => t.id === activeId);
        if (!activeTask) return;

        // Check if we're over a column
        const overColumn = COLUMNS.find((col) => col.id === overId);
        if (overColumn && activeTask.columnId !== overColumn.id) {
            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === activeId
                        ? { ...task, columnId: overColumn.id }
                        : task
                )
            );
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId !== overId) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (activeIndex !== -1 && overIndex !== -1) {
                    return arrayMove(tasks, activeIndex, overIndex);
                }
                return tasks;
            });
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
        setTasks((tasks) => tasks.filter((t) => t.id !== taskId));
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
                    t.id === editingTask.id
                        ? { ...t, ...taskData, updatedAt: new Date() }
                        : t
                )
            );
        } else {
            // Create new task
            const newTask: Task = {
                id: `task-${Date.now()}`,
                title: taskData.title!,
                description: taskData.description,
                impact: taskData.impact!,
                confidence: taskData.confidence!,
                ease: taskData.ease!,
                iceScore: taskData.iceScore!,
                columnId: taskData.columnId!,
                subtasks: taskData.subtasks || [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            setTasks((tasks) => [...tasks, newTask]);
        }
    };

    const getTasksByColumn = (columnId: string) => {
        return tasks.filter((task) => task.columnId === columnId);
    };

    return (
        <>
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
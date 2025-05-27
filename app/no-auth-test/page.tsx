'use client'

import { KanbanColumn } from '../components/KanbanColumn';
import { TaskFormDialog } from '../components/TaskFormDialog';
import { Navigation } from '../components/Navigation';
import { Task, COLUMNS } from '@/app/types/kanban';
import { useState } from 'react';

export default function NoAuthTestPage() {
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

    const getTasksByColumn = (columnId: string) => {
        return tasks.filter((task) => task.columnId === columnId);
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
                    t.id === editingTask.id ? { ...t, ...taskData, updatedAt: new Date() } : t
                )
            );
        } else {
            // Create new task
            const newTask: Task = {
                id: Date.now().toString(),
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
            setTasks((tasks) => [newTask, ...tasks]);
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="container mx-auto p-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">ICE Score Kanban Board (Demo)</h1>
                    <p className="text-gray-600 mt-2">
                        Testing the kanban board without authentication - data is not saved
                    </p>
                </header>
                <main className="h-[calc(100vh-200px)]">
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

                    <TaskFormDialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        task={editingTask}
                        onSave={handleSaveTask}
                        columnId={newTaskColumnId}
                    />
                </main>
            </div>
        </div>
    );
}
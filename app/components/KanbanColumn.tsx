'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Edit } from 'lucide-react';
import { Task, Column } from '@/app/types/kanban';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface KanbanColumnProps {
    column: Column;
    tasks: Task[];
    onAddTask: (columnId: string) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
    onToggleSubtask: (taskId: string, subtaskId: string) => void;
    onRenameColumn?: (column: Column) => void;
}

export function KanbanColumn({
    column,
    tasks,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onToggleSubtask,
    onRenameColumn,
}: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    // Sort tasks by order index (lowest first)
    const sortedTasks = [...tasks].sort((a, b) => a.orderIndex - b.orderIndex);
    const taskIds = sortedTasks.map((task) => task.id);

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                        {column.title}
                        <span className="ml-2 text-sm text-gray-500 font-normal">
                            ({sortedTasks.length})
                        </span>
                    </CardTitle>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onAddTask(column.id)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                        {onRenameColumn && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onRenameColumn(column)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Rename Column
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent
                ref={setNodeRef}
                className="flex-1 overflow-y-auto min-h-[200px]"
            >
                <SortableContext
                    items={taskIds}
                    strategy={verticalListSortingStrategy}
                >
                    {sortedTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                            onToggleSubtask={onToggleSubtask}
                        />
                    ))}
                </SortableContext>
                {sortedTasks.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <p className="text-sm">No tasks yet</p>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={() => onAddTask(column.id)}
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Task
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 
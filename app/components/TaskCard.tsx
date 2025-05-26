'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { GripVertical, Edit2, Trash2 } from 'lucide-react';
import { Task } from '@/app/types/kanban';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleSubtask }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const getIceScoreColor = (score: number) => {
        if (score >= 500) return 'bg-green-500';
        if (score >= 200) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const completedSubtasks = task.subtasks.filter(st => st.completed).length;
    const totalSubtasks = task.subtasks.length;
    const completionPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className="mb-3 cursor-move hover:shadow-lg transition-shadow"
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                        <div
                            {...attributes}
                            {...listeners}
                            className="mt-1 cursor-grab active:cursor-grabbing"
                        >
                            <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>
                        <CardTitle className="text-base font-medium">{task.title}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onEdit(task)}
                        >
                            <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onDelete(task.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                {task.description && (
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                )}

                {/* Subtasks section */}
                {task.subtasks.length > 0 && (
                    <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-600">
                                Subtasks ({completedSubtasks}/{totalSubtasks})
                            </span>
                            {totalSubtasks > 0 && (
                                <span className="text-xs text-gray-500">{Math.round(completionPercentage)}%</span>
                            )}
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                            <div
                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${completionPercentage}%` }}
                            />
                        </div>

                        {/* Subtask list */}
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                            {task.subtasks.map((subtask) => (
                                <div key={subtask.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={subtask.id}
                                        checked={subtask.completed}
                                        onCheckedChange={() => onToggleSubtask(task.id, subtask.id)}
                                        className="h-4 w-4"
                                    />
                                    <label
                                        htmlFor={subtask.id}
                                        className={`text-sm flex-1 cursor-pointer ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'
                                            }`}
                                    >
                                        {subtask.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex gap-2 text-xs">
                        <Badge variant="outline">I: {task.impact}</Badge>
                        <Badge variant="outline">C: {task.confidence}</Badge>
                        <Badge variant="outline">E: {task.ease}</Badge>
                    </div>
                    <Badge className={`${getIceScoreColor(task.iceScore)} text-white`}>
                        ICE: {task.iceScore}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
} 
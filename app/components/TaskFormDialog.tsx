'use client';

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Task, Subtask } from '@/app/types/kanban';
import { Plus, X } from 'lucide-react';

interface TaskFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task?: Task | null;
    onSave: (task: Partial<Task>) => void;
    columnId: string;
}

export function TaskFormDialog({
    open,
    onOpenChange,
    task,
    onSave,
    columnId,
}: TaskFormDialogProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        impact: 5,
        confidence: 5,
        ease: 5,
    });

    const [subtasks, setSubtasks] = useState<Subtask[]>([]);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                impact: task.impact,
                confidence: task.confidence,
                ease: task.ease,
            });
            setSubtasks(task.subtasks || []);
        } else {
            setFormData({
                title: '',
                description: '',
                impact: 5,
                confidence: 5,
                ease: 5,
            });
            setSubtasks([]);
        }
        setNewSubtaskTitle('');
    }, [task]);

    const calculateIceScore = () => {
        return formData.impact * formData.confidence * formData.ease;
    };

    const handleAddSubtask = () => {
        if (newSubtaskTitle.trim()) {
            const newSubtask: Subtask = {
                id: `subtask-${Date.now()}`,
                title: newSubtaskTitle.trim(),
                completed: false,
                taskId: task?.id || '',
            };
            setSubtasks([...subtasks, newSubtask]);
            setNewSubtaskTitle('');
        }
    };

    const handleRemoveSubtask = (subtaskId: string) => {
        setSubtasks(subtasks.filter(st => st.id !== subtaskId));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...(task && { id: task.id }),
            ...formData,
            iceScore: calculateIceScore(),
            columnId: task?.columnId || columnId,
            subtasks: subtasks,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
                        <DialogDescription>
                            Set the task details and ICE scores. ICE Score = Impact × Confidence × Ease
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                placeholder="Enter task title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                placeholder="Enter task description (optional)"
                                rows={3}
                            />
                        </div>

                        {/* Subtasks section */}
                        <div className="grid gap-2">
                            <Label>Subtasks</Label>
                            <div className="space-y-2">
                                {subtasks.map((subtask) => (
                                    <div key={subtask.id} className="flex items-center gap-2">
                                        <Input
                                            value={subtask.title}
                                            onChange={(e) => {
                                                const updated = subtasks.map(st =>
                                                    st.id === subtask.id ? { ...st, title: e.target.value } : st
                                                );
                                                setSubtasks(updated);
                                            }}
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveSubtask(subtask.id)}
                                            className="h-8 w-8"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={newSubtaskTitle}
                                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                                        placeholder="Add a subtask"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddSubtask();
                                            }
                                        }}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={handleAddSubtask}
                                        className="h-8 w-8"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="impact">
                                    Impact ({formData.impact})
                                </Label>
                                <Input
                                    id="impact"
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={formData.impact}
                                    onChange={(e) =>
                                        setFormData({ ...formData, impact: parseInt(e.target.value) })
                                    }
                                    className="w-full"
                                />
                                <p className="text-xs text-gray-600 text-center">Value generated</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confidence">
                                    Confidence ({formData.confidence})
                                </Label>
                                <Input
                                    id="confidence"
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={formData.confidence}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            confidence: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full"
                                />
                                <p className="text-xs text-gray-600 text-center">Success certainty</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ease">
                                    Ease ({formData.ease})
                                </Label>
                                <Input
                                    id="ease"
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={formData.ease}
                                    onChange={(e) =>
                                        setFormData({ ...formData, ease: parseInt(e.target.value) })
                                    }
                                    className="w-full"
                                />
                                <p className="text-xs text-gray-600 text-center">How easy to do</p>
                            </div>
                        </div>
                        <div className="text-center p-3 bg-gray-100 rounded-md">
                            <p className="text-sm text-gray-600">Total ICE Score</p>
                            <p className="text-2xl font-bold">{calculateIceScore()}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">{task ? 'Update' : 'Create'} Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 
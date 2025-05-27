'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Task } from '@/app/types/kanban'

interface DeleteTaskDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    task: Task | null
    onConfirm: () => void
}

export function DeleteTaskDialog({
    open,
    onOpenChange,
    task,
    onConfirm,
}: DeleteTaskDialogProps) {
    const handleConfirm = () => {
        onConfirm()
        onOpenChange(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Task</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete &ldquo;{task?.title}&rdquo;? This action cannot be undone.
                        {task?.subtasks && task.subtasks.length > 0 && (
                            <span className="block mt-2 text-sm font-medium">
                                This will also delete {task.subtasks.length} subtask{task.subtasks.length > 1 ? 's' : ''}.
                            </span>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        Delete Task
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
} 
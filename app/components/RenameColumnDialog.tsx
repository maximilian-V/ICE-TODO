'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Column } from '@/app/types/kanban';

interface RenameColumnDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    column: Column | null;
    onConfirm: (columnId: string, newTitle: string) => Promise<void>;
}

export function RenameColumnDialog({
    open,
    onOpenChange,
    column,
    onConfirm,
}: RenameColumnDialogProps) {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (column) {
            setTitle(column.title);
            setError(null);
        }
    }, [column]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!column) return;

        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            setError('Column title cannot be empty');
            return;
        }

        if (trimmedTitle === column.title) {
            onOpenChange(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await onConfirm(column.id, trimmedTitle);
            onOpenChange(false);
        } catch (error) {
            console.error('Error renaming column:', error);
            setError('Failed to rename column. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (column) {
            setTitle(column.title);
        }
        setError(null);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rename Column</DialogTitle>
                    <DialogDescription>
                        Change the title of &ldquo;{column?.title}&rdquo; column.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter column title"
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>
                        {error && (
                            <div className="text-sm text-red-600 text-center">
                                {error}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 
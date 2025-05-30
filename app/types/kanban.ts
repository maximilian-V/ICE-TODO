export interface Subtask {
    id: string;
    title: string;
    completed: boolean;
    taskId: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    impact: number; // 1-10
    confidence: number; // 1-10
    ease: number; // 1-10
    iceScore: number; // Impact * Confidence * Ease
    columnId: string;
    orderIndex: number;
    subtasks: Subtask[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Column {
    id: string;
    title: string;
    order: number;
    color?: string;
    isCustom?: boolean;
}

export type ColumnId = 'todo' | 'inprogress' | 'done' | string;

export const DEFAULT_COLUMNS: Column[] = [
    { id: 'todo', title: 'To Do', order: 0, color: '#6b7280' },
    { id: 'inprogress', title: 'In Progress', order: 1, color: '#6b7280' },
    { id: 'done', title: 'Done', order: 2, color: '#6b7280' },
]; 
-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    impact INTEGER NOT NULL CHECK (impact >= 1 AND impact <= 10),
    confidence INTEGER NOT NULL CHECK (confidence >= 1 AND confidence <= 10),
    ease INTEGER NOT NULL CHECK (ease >= 1 AND ease <= 10),
    ice_score INTEGER NOT NULL,
    column_id TEXT NOT NULL CHECK (column_id IN ('todo', 'inprogress', 'done')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create subtasks table
CREATE TABLE IF NOT EXISTS public.subtasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security on tables
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtasks ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks table
CREATE POLICY "Users can view their own tasks" ON public.tasks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks" ON public.tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" ON public.tasks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" ON public.tasks
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for subtasks table
CREATE POLICY "Users can view subtasks of their tasks" ON public.subtasks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.tasks 
            WHERE tasks.id = subtasks.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert subtasks for their tasks" ON public.subtasks
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.tasks 
            WHERE tasks.id = subtasks.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update subtasks of their tasks" ON public.subtasks
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.tasks 
            WHERE tasks.id = subtasks.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete subtasks of their tasks" ON public.subtasks
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.tasks 
            WHERE tasks.id = subtasks.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_column_id ON public.tasks(column_id);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON public.tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_subtasks_task_id ON public.subtasks(task_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_tasks_updated_at 
    BEFORE UPDATE ON public.tasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subtasks_updated_at 
    BEFORE UPDATE ON public.subtasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 
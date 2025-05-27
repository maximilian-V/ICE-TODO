-- Create columns table for custom column configurations
CREATE TABLE IF NOT EXISTS public.columns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    column_id TEXT NOT NULL, -- 'todo', 'inprogress', 'done', or custom IDs
    title TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    color TEXT DEFAULT '#6b7280', -- Optional color for the column
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, column_id)
);

-- Enable Row Level Security
ALTER TABLE public.columns ENABLE ROW LEVEL SECURITY;

-- Create policies for columns table
CREATE POLICY "Users can view their own columns" ON public.columns
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own columns" ON public.columns
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own columns" ON public.columns
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own columns" ON public.columns
    FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_columns_user_id ON public.columns(user_id);
CREATE INDEX IF NOT EXISTS idx_columns_order ON public.columns(user_id, order_index);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_columns_updated_at 
    BEFORE UPDATE ON public.columns 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default columns for existing users (migration)
-- This will create default column configurations for users who don't have any
INSERT INTO public.columns (user_id, column_id, title, order_index)
SELECT DISTINCT user_id, 'todo', 'To Do', 0
FROM public.tasks
WHERE user_id NOT IN (SELECT DISTINCT user_id FROM public.columns WHERE column_id = 'todo')
ON CONFLICT (user_id, column_id) DO NOTHING;

INSERT INTO public.columns (user_id, column_id, title, order_index)
SELECT DISTINCT user_id, 'inprogress', 'In Progress', 1
FROM public.tasks
WHERE user_id NOT IN (SELECT DISTINCT user_id FROM public.columns WHERE column_id = 'inprogress')
ON CONFLICT (user_id, column_id) DO NOTHING;

INSERT INTO public.columns (user_id, column_id, title, order_index)
SELECT DISTINCT user_id, 'done', 'Done', 2
FROM public.tasks
WHERE user_id NOT IN (SELECT DISTINCT user_id FROM public.columns WHERE column_id = 'done')
ON CONFLICT (user_id, column_id) DO NOTHING; 
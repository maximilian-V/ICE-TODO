export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            columns: {
                Row: {
                    id: string
                    user_id: string
                    column_id: string
                    title: string
                    order_index: number
                    color: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    column_id: string
                    title: string
                    order_index?: number
                    color?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    column_id?: string
                    title?: string
                    order_index?: number
                    color?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            tasks: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    impact: number
                    confidence: number
                    ease: number
                    ice_score: number
                    column_id: string
                    order_index: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description?: string | null
                    impact: number
                    confidence: number
                    ease: number
                    ice_score: number
                    column_id: string
                    order_index?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    description?: string | null
                    impact?: number
                    confidence?: number
                    ease?: number
                    ice_score?: number
                    column_id?: string
                    order_index?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            subtasks: {
                Row: {
                    id: string
                    task_id: string
                    title: string
                    completed: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    task_id: string
                    title: string
                    completed?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    task_id?: string
                    title?: string
                    completed?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
} 
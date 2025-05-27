import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    console.log('[Supabase Client] Creating client with URL:', supabaseUrl)

    return createBrowserClient<Database>(
        supabaseUrl,
        supabaseKey,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                flowType: 'pkce'
            },
            global: {
                headers: {
                    'x-application-name': 'ice-todo'
                }
            },
            db: {
                schema: 'public'
            }
        }
    )
} 
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TestConnectionPage() {
    const [logs, setLogs] = useState<string[]>([])
    const [testing, setTesting] = useState(false)

    const addLog = (message: string) => {
        const logEntry = `${new Date().toISOString()}: ${message}`
        console.log(logEntry)
        setLogs(prev => [...prev, logEntry])
    }

    const testSupabaseConnection = async () => {
        setTesting(true)
        setLogs([])

        try {
            addLog('Creating Supabase client...')
            const supabase = createClient()
            addLog('Supabase client created')

            addLog(`URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
            addLog(`Key exists: ${!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)

            // Test 1: Simple fetch to check if Supabase is reachable
            addLog('Testing direct fetch to Supabase...')
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
                    }
                })
                addLog(`Direct fetch status: ${response.status} ${response.statusText}`)
            } catch (fetchError) {
                addLog(`Direct fetch error: ${fetchError}`)
            }

            // Test 2: Try getSession with a timeout
            addLog('Testing getSession with timeout...')
            const sessionPromise = supabase.auth.getSession()
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('getSession timeout after 5 seconds')), 5000)
            )

            try {
                const result = await Promise.race([sessionPromise, timeoutPromise])
                const { data, error } = result as Awaited<typeof sessionPromise>
                if (error) {
                    addLog(`getSession error: ${error.message}`)
                } else {
                    addLog(`getSession success: ${data?.session ? 'Session exists' : 'No session'}`)
                }
            } catch (timeoutError) {
                addLog(`getSession timed out: ${timeoutError}`)
            }

            // Test 3: Try a simple database query
            addLog('Testing database query...')
            try {
                const { data, error } = await supabase
                    .from('tasks')
                    .select('count')
                    .limit(1)
                    .single()

                if (error) {
                    addLog(`Database query error: ${error.message}`)
                } else {
                    addLog(`Database query success: ${JSON.stringify(data)}`)
                }
            } catch (dbError) {
                addLog(`Database query exception: ${dbError}`)
            }

        } catch (error) {
            addLog(`Unexpected error: ${error}`)
        } finally {
            setTesting(false)
            addLog('Test complete')
        }
    }

    useEffect(() => {
        // Run test automatically on mount
        testSupabaseConnection()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Supabase Connection Test</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-x-2">
                            <Button
                                onClick={testSupabaseConnection}
                                disabled={testing}
                            >
                                {testing ? 'Testing...' : 'Run Test Again'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/'}
                            >
                                Back to Home
                            </Button>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Test Logs:</h3>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="text-xs font-mono space-y-1 max-h-96 overflow-y-auto">
                                    {logs.length === 0 ? (
                                        <div className="text-gray-500">No logs yet...</div>
                                    ) : (
                                        logs.map((log, i) => (
                                            <div key={i} className="whitespace-pre-wrap">{log}</div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 
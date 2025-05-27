'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TestSupabasePage() {
    const [status, setStatus] = useState('Testing...')
    const [logs, setLogs] = useState<string[]>([])
    const [user, setUser] = useState<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
    const supabase = createClient()

    const addLog = (message: string) => {
        console.log(message)
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    }

    useEffect(() => {
        const testConnection = async () => {
            try {
                addLog('Starting Supabase connection test...')

                // Test 1: Check environment variables
                addLog(`Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
                addLog(`Supabase Key exists: ${!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)

                // Test 2: Test basic connection
                addLog('Testing basic connection...')
                try {
                    // First try a simple query that doesn't require auth
                    const { error } = await supabase.from('tasks').select('count').limit(1)
                    if (error) {
                        addLog(`Connection test failed: ${error.message}`)
                        addLog(`Error details: ${JSON.stringify(error)}`)
                    } else {
                        addLog('Connection test successful!')
                    }
                } catch (connError) {
                    addLog(`Connection test exception: ${connError}`)
                }

                // Test 3: Test auth
                addLog('Testing auth.getUser()...')
                try {
                    const authPromise = supabase.auth.getUser()
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Auth timeout after 5 seconds')), 5000)
                    )

                    const result = await Promise.race([authPromise, timeoutPromise])
                    const { data: { user }, error: userError } = result as Awaited<typeof authPromise>

                    if (userError) {
                        addLog(`Auth test failed: ${userError.message}`)
                    } else {
                        addLog(`Auth test successful. User: ${user ? user.email : 'No user'}`)
                        setUser(user)
                    }
                } catch (authError) {
                    addLog(`Auth test exception: ${authError}`)
                }

                // Test 4: Test session
                addLog('Testing auth.getSession()...')
                try {
                    const sessionPromise = supabase.auth.getSession()
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Session timeout after 5 seconds')), 5000)
                    )

                    const result = await Promise.race([sessionPromise, timeoutPromise])
                    const { data: { session }, error: sessionError } = result as Awaited<typeof sessionPromise>

                    if (sessionError) {
                        addLog(`Session test failed: ${sessionError.message}`)
                    } else {
                        addLog(`Session test successful. Session: ${session ? 'Active' : 'None'}`)
                    }
                } catch (sessionError) {
                    addLog(`Session test exception: ${sessionError}`)
                }

                setStatus('Tests completed')

            } catch (error) {
                addLog(`Unexpected error: ${error}`)
                setStatus('Tests failed')
            }
        }

        testConnection()
    }, [])

    const handleSignIn = () => {
        window.location.href = '/auth/login'
    }

    const handleSignOut = async () => {
        addLog('Signing out...')
        const { error } = await supabase.auth.signOut()
        if (error) {
            addLog(`Sign out error: ${error.message}`)
        } else {
            addLog('Sign out successful')
            setUser(null)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Supabase Connection Test</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>Status:</strong> {status}</p>

                        <div className="space-x-2">
                            <Button onClick={() => window.location.reload()}>
                                Refresh Test
                            </Button>
                            <Button onClick={() => window.location.href = '/'}>
                                Go to Home
                            </Button>
                            {user ? (
                                <Button onClick={handleSignOut} variant="outline">
                                    Sign Out
                                </Button>
                            ) : (
                                <Button onClick={handleSignIn} variant="outline">
                                    Sign In
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Test Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-gray-100 p-4 rounded max-h-64 overflow-y-auto">
                            {logs.length === 0 ? (
                                <p className="text-gray-500">No logs yet...</p>
                            ) : (
                                logs.map((log, index) => (
                                    <div key={index} className="text-sm font-mono">
                                        {log}
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 
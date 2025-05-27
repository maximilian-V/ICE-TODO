'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AuthTestPage() {
    const [logs, setLogs] = useState<string[]>([])
    const [user, setUser] = useState<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
    const [preventRedirect, setPreventRedirect] = useState(true)

    const addLog = (message: string) => {
        const logEntry = `${new Date().toISOString()}: ${message}`
        console.log(logEntry)
        setLogs(prev => [...prev.slice(-20), logEntry])
    }

    useEffect(() => {
        const supabase = createClient()
        let mounted = true

        addLog('Setting up auth test...')

        // Set up auth state listener only
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                addLog(`Auth event: ${event}, session: ${session ? 'exists' : 'null'}`)

                if (!mounted) return

                if (session?.user) {
                    addLog(`User found: ${session.user.email}`)
                    setUser(session.user)
                } else {
                    addLog('No user found')
                    setUser(null)

                    if (event === 'SIGNED_OUT' && !preventRedirect) {
                        addLog('Would redirect to login (prevented)')
                        // window.location.href = '/auth/login'
                    }
                }
            }
        )

        return () => {
            mounted = false
            subscription.unsubscribe()
            addLog('Cleanup complete')
        }
    }, [preventRedirect])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Auth State Test</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="text-lg">
                                User: {user ? user.email : 'Not authenticated'}
                            </div>
                            <Button
                                variant={preventRedirect ? "destructive" : "outline"}
                                onClick={() => setPreventRedirect(!preventRedirect)}
                            >
                                Redirect Prevention: {preventRedirect ? 'ON' : 'OFF'}
                            </Button>
                        </div>

                        <div className="space-x-2">
                            <Button onClick={() => window.location.href = '/'}>
                                Back to Home
                            </Button>
                            <Button onClick={() => window.location.href = '/auth/login'}>
                                Go to Login
                            </Button>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Auth Logs:</h3>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="text-xs font-mono space-y-1 max-h-96 overflow-y-auto">
                                    {logs.map((log, i) => (
                                        <div key={i}>{log}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 
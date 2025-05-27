'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { User } from '@supabase/supabase-js'

interface AuthState {
    user: User | null
    error: Error | null
}

export default function DebugPage() {
    const [authState, setAuthState] = useState<AuthState | null>(null)
    const [loading, setLoading] = useState(true)
    const [logs, setLogs] = useState<string[]>([])
    const supabase = createClient()

    const addLog = (message: string) => {
        console.log(message)
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                addLog('Checking authentication state...')

                const { data: { user }, error } = await supabase.auth.getUser()

                if (error) {
                    addLog(`Auth error: ${error.message}`)
                } else {
                    addLog(`User: ${user ? user.email : 'Not authenticated'}`)
                }

                setAuthState({ user, error })

                const { data: { session } } = await supabase.auth.getSession()
                addLog(`Session: ${session ? 'Active' : 'None'}`)

            } catch (error) {
                addLog(`Unexpected error: ${error}`)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                addLog(`Auth event: ${event}, Session: ${session ? 'Active' : 'None'}`)
            }
        )

        return () => subscription.unsubscribe()
    }, [supabase])

    const handleSignOut = async () => {
        addLog('Attempting to sign out...')
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                addLog(`Sign out error: ${error.message}`)
            } else {
                addLog('Sign out successful')
            }
        } catch (error) {
            addLog(`Sign out exception: ${error}`)
        }
    }

    const handleClearSession = () => {
        addLog('Clearing local storage...')
        localStorage.clear()
        sessionStorage.clear()
        addLog('Local storage cleared')
    }

    const handleGoToLogin = () => {
        window.location.href = '/auth/login'
    }

    const handleGoToHome = () => {
        window.location.href = '/'
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Authentication Debug Page</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <Button onClick={handleGoToHome} variant="outline">
                                Go to Home
                            </Button>
                            <Button onClick={handleGoToLogin} variant="outline">
                                Go to Login
                            </Button>
                            <Button onClick={handleSignOut} variant="outline">
                                Sign Out
                            </Button>
                            <Button onClick={handleClearSession} variant="destructive">
                                Clear Storage
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Authentication State</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                                {JSON.stringify(authState, null, 2)}
                            </pre>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Debug Logs</CardTitle>
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

                <Card>
                    <CardHeader>
                        <CardTitle>Environment Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
                            <p><strong>Supabase Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
                            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 
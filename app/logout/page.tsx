'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function LogoutPage() {
    const [status, setStatus] = useState('Signing out...')
    const supabase = createClient()

    useEffect(() => {
        const logout = async () => {
            try {
                console.log('Starting logout process...')
                setStatus('Signing out...')

                // Sign out from Supabase
                const { error } = await supabase.auth.signOut()

                if (error) {
                    console.error('Logout error:', error)
                    setStatus('Error signing out. Redirecting anyway...')
                } else {
                    console.log('Successfully signed out')
                    setStatus('Signed out successfully. Redirecting...')
                }

                // Wait a moment then redirect
                setTimeout(() => {
                    console.log('Redirecting to login...')
                    window.location.href = '/auth/login'
                }, 1000)

            } catch (error) {
                console.error('Unexpected logout error:', error)
                setStatus('Error occurred. Redirecting...')

                // Force redirect even if there's an error
                setTimeout(() => {
                    window.location.href = '/auth/login'
                }, 2000)
            }
        }

        logout()

        // Fallback redirect in case something goes wrong
        const fallbackTimeout = setTimeout(() => {
            console.log('Fallback redirect triggered')
            window.location.href = '/auth/login'
        }, 5000)

        return () => clearTimeout(fallbackTimeout)
    }, [supabase])

    const handleManualRedirect = () => {
        window.location.href = '/auth/login'
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Signing Out</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center text-gray-600">
                        {status}
                    </p>
                    <div className="text-center">
                        <Button
                            variant="outline"
                            onClick={handleManualRedirect}
                            className="mt-4"
                        >
                            Go to Login Manually
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 
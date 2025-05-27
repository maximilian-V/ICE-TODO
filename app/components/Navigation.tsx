'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuth } from './AuthProvider'

export function Navigation() {
    const { user, signOut } = useAuth()

    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to home page after sign out
            window.location.href = '/'
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <nav className="bg-white border-b border-gray-200 mb-6">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            ICE Kanban
                        </Link>
                        <div className="hidden md:flex space-x-2">
                            <Button variant="ghost" asChild>
                                <Link href="/">
                                    {user ? 'Dashboard' : 'Home'}
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link href="/no-auth-test">Demo</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-600 hidden sm:block">
                                    {user.email}
                                </span>
                                <Button variant="outline" onClick={handleSignOut}>
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href="/auth/login">Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/auth/signup">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
} 
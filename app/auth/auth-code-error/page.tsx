'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuthCodeErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
                    <CardDescription className="text-center">
                        There was a problem with the authentication process
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600 text-center space-y-2">
                        <p>This could happen if:</p>
                        <ul className="list-disc list-inside space-y-1 text-left">
                            <li>The email confirmation link has expired</li>
                            <li>The link has already been used</li>
                            <li>There was a network error during authentication</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <Button asChild className="w-full">
                            <Link href="/auth/login">
                                Try Signing In Again
                            </Link>
                        </Button>

                        <Button variant="outline" asChild className="w-full">
                            <Link href="/auth/signup">
                                Create New Account
                            </Link>
                        </Button>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        If you continue to have problems, please try signing up again or contact support.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle, Target, TrendingUp, Users } from 'lucide-react'

export function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        ICE Score Kanban Board
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Prioritize your tasks effectively using the ICE scoring method.
                        Organize by Impact, Confidence, and Ease to maximize your productivity.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/auth/signup">Get Started Free</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/demo">Try Demo</Link>
                        </Button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <Card>
                        <CardHeader>
                            <Target className="h-8 w-8 text-blue-600 mb-2" />
                            <CardTitle>ICE Scoring</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Rate tasks by Impact, Confidence, and Ease for data-driven prioritization.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                            <CardTitle>Auto-Sorting</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Tasks automatically sort by ICE score, keeping high-priority items visible.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CheckCircle className="h-8 w-8 text-purple-600 mb-2" />
                            <CardTitle>Subtasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Break down complex tasks into manageable subtasks with progress tracking.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Users className="h-8 w-8 text-orange-600 mb-2" />
                            <CardTitle>Personal Workspace</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Secure, personal kanban boards that sync across all your devices.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* How it Works */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">How ICE Scoring Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">I</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Impact</h3>
                            <p className="text-gray-600">
                                How much value will this task generate? Rate from 1-10.
                            </p>
                        </div>
                        <div>
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">C</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Confidence</h3>
                            <p className="text-gray-600">
                                How certain are you it will work? Rate your confidence 1-10.
                            </p>
                        </div>
                        <div>
                            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-purple-600">E</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Ease</h3>
                            <p className="text-gray-600">
                                How easy is it to implement? Rate the simplicity 1-10.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-sm max-w-md mx-auto">
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                            ICE Score = Impact × Confidence × Ease
                        </p>
                        <p className="text-gray-600">
                            Higher scores indicate higher priority tasks
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to Prioritize Like a Pro?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Join thousands of users who have improved their productivity with ICE scoring.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/auth/signup">Create Free Account</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/auth/login">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
} 
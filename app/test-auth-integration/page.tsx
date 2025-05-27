'use client'

import { useState, useEffect } from 'react'
import { TaskService } from '@/lib/services/tasks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '../components/AuthProvider'

export default function TestAuthIntegrationPage() {
    const [testResults, setTestResults] = useState<string[]>([])
    const [testing, setTesting] = useState(false)

    const { user, loading } = useAuth()
    const taskService = new TaskService()

    const addResult = (message: string) => {
        setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    }

    useEffect(() => {
        if (!loading) {
            addResult(user ? `User authenticated: ${user.email}` : 'No user authenticated')
        }
    }, [user, loading])

    const runTests = async () => {
        if (!user) {
            addResult('Cannot run tests - user not authenticated')
            return
        }

        setTesting(true)
        setTestResults([])

        try {
            addResult('Starting integration tests...')

            // Test 1: Load tasks
            addResult('Test 1: Loading tasks...')
            const tasks = await taskService.getTasks(user.id)
            addResult(`✅ Loaded ${tasks.length} tasks`)

            // Test 2: Create a test task
            addResult('Test 2: Creating test task...')
            const testTask = await taskService.createTask({
                title: 'Test Task',
                description: 'This is a test task created by the integration test',
                impact: 8,
                confidence: 7,
                ease: 6,
                iceScore: 336,
                columnId: 'todo',
                subtasks: [
                    { id: 'temp-1', title: 'Test subtask 1', completed: false, taskId: '' },
                    { id: 'temp-2', title: 'Test subtask 2', completed: true, taskId: '' }
                ]
            }, user.id)
            addResult(`✅ Created task: ${testTask.id}`)

            // Test 3: Update the task
            addResult('Test 3: Updating task...')
            const updatedTask = await taskService.updateTask(testTask.id, {
                title: 'Updated Test Task',
                columnId: 'inprogress'
            }, user.id)
            addResult(`✅ Updated task: ${updatedTask.title} in ${updatedTask.columnId}`)

            // Test 4: Toggle subtask
            if (updatedTask.subtasks.length > 0) {
                addResult('Test 4: Toggling subtask...')
                await taskService.toggleSubtask(testTask.id, updatedTask.subtasks[0].id, user.id)
                addResult(`✅ Toggled subtask: ${updatedTask.subtasks[0].title}`)
            }

            // Test 5: Delete the task
            addResult('Test 5: Deleting test task...')
            await taskService.deleteTask(testTask.id, user.id)
            addResult(`✅ Deleted task: ${testTask.id}`)

            addResult('🎉 All tests passed!')

        } catch (error) {
            addResult(`❌ Test failed: ${error}`)
        } finally {
            setTesting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Authentication & Database Integration Test</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p><strong>User:</strong> {user ? user.email : 'Not authenticated'}</p>
                                <p><strong>Status:</strong> {user ? '✅ Authenticated' : '❌ Not authenticated'}</p>
                            </div>
                            <div className="space-x-2">
                                <Button
                                    onClick={runTests}
                                    disabled={!user || testing}
                                >
                                    {testing ? 'Running Tests...' : 'Run Integration Tests'}
                                </Button>
                                <Button variant="outline" onClick={() => window.location.href = '/'}>
                                    Back to Home
                                </Button>
                            </div>
                        </div>

                        {!user && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-yellow-800">
                                    Please <a href="/auth/login" className="underline">sign in</a> to run the integration tests.
                                </p>
                            </div>
                        )}

                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Test Results:</h3>
                            <div className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto">
                                {testResults.length === 0 ? (
                                    <p className="text-gray-500">No test results yet...</p>
                                ) : (
                                    testResults.map((result, index) => (
                                        <div key={index} className="text-sm font-mono mb-1">
                                            {result}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 
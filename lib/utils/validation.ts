import { z } from 'zod'

// Task validation schema
export const taskSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(100, 'Title must be less than 100 characters')
        .trim(),
    description: z.string()
        .max(500, 'Description must be less than 500 characters')
        .trim()
        .optional(),
    impact: z.number()
        .int('Impact must be a whole number')
        .min(1, 'Impact must be at least 1')
        .max(10, 'Impact must be at most 10'),
    confidence: z.number()
        .int('Confidence must be a whole number')
        .min(1, 'Confidence must be at least 1')
        .max(10, 'Confidence must be at most 10'),
    ease: z.number()
        .int('Ease must be a whole number')
        .min(1, 'Ease must be at least 1')
        .max(10, 'Ease must be at most 10'),
    columnId: z.enum(['todo', 'inprogress', 'done'], {
        errorMap: () => ({ message: 'Invalid column' })
    })
})

// Subtask validation schema
export const subtaskSchema = z.object({
    title: z.string()
        .min(1, 'Subtask title is required')
        .max(100, 'Subtask title must be less than 100 characters')
        .trim(),
    completed: z.boolean().default(false)
})

// Authentication validation schemas
export const emailSchema = z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .max(254, 'Email is too long') // RFC 5321 limit

export const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string()
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required')
})

// Utility function to validate and sanitize input
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean
    data?: T
    errors?: string[]
} {
    try {
        const result = schema.parse(data)
        return { success: true, data: result }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.errors.map((err: z.ZodIssue) => err.message)
            }
        }
        return {
            success: false,
            errors: ['Invalid input']
        }
    }
}

// Sanitize HTML to prevent XSS (basic implementation)
export function sanitizeHtml(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
}

// Rate limiting helper
export function createRateLimiter(maxAttempts: number, windowMs: number) {
    const attempts = new Map<string, { count: number; resetTime: number }>()

    return {
        isAllowed: (identifier: string): boolean => {
            const now = Date.now()
            const userAttempts = attempts.get(identifier)

            if (!userAttempts || now > userAttempts.resetTime) {
                attempts.set(identifier, { count: 1, resetTime: now + windowMs })
                return true
            }

            if (userAttempts.count >= maxAttempts) {
                return false
            }

            userAttempts.count++
            return true
        },

        getRemainingAttempts: (identifier: string): number => {
            const userAttempts = attempts.get(identifier)
            if (!userAttempts || Date.now() > userAttempts.resetTime) {
                return maxAttempts
            }
            return Math.max(0, maxAttempts - userAttempts.count)
        }
    }
} 
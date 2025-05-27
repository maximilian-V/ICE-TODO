const isDevelopment = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

type LogData = Record<string, unknown> | string | number | boolean | null | undefined

export const logger = {
    debug: (message: string, data?: LogData) => {
        if (isDevelopment || isTest) {
            console.debug(`[DEBUG] ${message}`, data)
        }
    },

    info: (message: string, data?: LogData) => {
        if (isDevelopment || isTest) {
            console.info(`[INFO] ${message}`, data)
        }
        // In production, send to logging service
    },

    warn: (message: string, data?: LogData) => {
        if (isDevelopment || isTest) {
            console.warn(`[WARN] ${message}`, data)
        }
        // In production, send to logging service
    },

    error: (message: string, error?: Error | LogData) => {
        if (isDevelopment || isTest) {
            console.error(`[ERROR] ${message}`, error)
        }
        // In production, send to logging service (without sensitive data)
    },

    // Safe logging that never includes sensitive data
    audit: (action: string, userId?: string, metadata?: Record<string, unknown>) => {
        const auditLog = {
            timestamp: new Date().toISOString(),
            action,
            userId: userId ? `user_${userId.slice(0, 8)}...` : 'anonymous', // Partial ID only
            metadata: metadata ? sanitizeMetadata(metadata) : undefined
        }

        if (isDevelopment || isTest) {
            console.log(`[AUDIT] ${action}`, auditLog)
        }
        // In production, send to audit logging service
    }
}

// Remove sensitive fields from metadata
function sanitizeMetadata(metadata: Record<string, unknown>): Record<string, unknown> {
    const sensitiveFields = ['password', 'token', 'key', 'secret', 'email']
    const sanitized = { ...metadata }

    for (const field of sensitiveFields) {
        if (sanitized[field]) {
            sanitized[field] = '[REDACTED]'
        }
    }

    return sanitized
} 
import { z } from 'zod'

const isDebugMode = process.env.NODE_ENV !== 'production'

export const passwordSchema = (minLength = 6) => {
  const validationRules = z.string().min(minLength, {
    message: `Password must be at least ${minLength} characters long.`,
  })

  if (!isDebugMode) {
    return validationRules
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/\d/, {
        message: 'Password must contain at least one number.',
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character.',
      })
  }

  return validationRules
}

import { passwordSchema } from '@/schemas/auth/password'
import { z } from 'zod'

export const signUpSchema = () => {
  return z
    .object({
      name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .min(1, { message: 'Name is required.' }),
      email: z
        .string()
        .email({ message: 'Please enter a valid email address.' })
        .min(1, { message: 'Email is required.' }),
      password: passwordSchema(),
      passwordConfirmation: z.string().min(1, {
        message: 'Password confirmation is required.',
      }),
      accept: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions.',
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match.',
      path: ['passwordConfirmation'],
    })
}

export type SignUpSchema = z.infer<ReturnType<typeof signUpSchema>>

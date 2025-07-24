import { NextRequest } from 'next/server'

import { User } from '@prisma/client'
import { render } from '@react-email/render'

import { hashPwd, hashPwdSync } from '@/lib/bcrypt'
import prisma from '@/lib/prisma'
import { SignUpSchema, signUpSchema } from '@/schemas/auth/signup'
import { UserStatus, VerificationTokenType } from '@/models/user'
import { sendMail } from '@/services/send-mail'
import SendActivationEmail from '@/emails/send-activation'

async function sendVerificationEmail(user: User) {
  const tokens = await prisma.verificationToken.create({
    data: {
      identifier: user.id,
      token: hashPwdSync(user.id),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      type: VerificationTokenType.SIGN_UP,
    },
  })

  const url = `${process.env.NEXTAUTH_URL}/verify-email?token=${tokens.token}`

  // @ts-ignore
  const htmlContent = await render(SendActivationEmail({ user, verificationUrl: url }))
  await sendMail({
    to: user.email,
    subject: 'Account Activation',
    html: htmlContent,
  })
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body as JSON.
    const body = await request.json()

    // Validate the data using safeParse.
    const result = signUpSchema().safeParse(body)
    if (!result.success) {
      return new Response(
        JSON.stringify({
          message: 'Invalid input. Please check your data and try again.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const { email, password, name }: SignUpSchema = result.data

    // Check if a user with the given email already exists.
    const existingUser: User | null = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      if (existingUser.status === UserStatus.INACTIVE) {
        // Resend verification email for inactive user.
        await prisma.verificationToken.deleteMany({
          where: { identifier: existingUser.id },
        })

        await sendVerificationEmail(existingUser)
        return new Response(JSON.stringify({ message: 'Verification email resent. Please check your email.' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      } else {
        // User exists and is active.
        return new Response(JSON.stringify({ message: 'Email is already registered.' }), { status: 409 })
      }
    }

    // Hash the password.
    const hashedPassword = await hashPwd(password)

    // Create a new user with INACTIVE status.
    const user: User = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        status: UserStatus.INACTIVE,
      },
    })

    // Send the verification email.
    await sendVerificationEmail(user)

    return new Response(
      JSON.stringify({
        message: 'Signup successful! Please check your email to verify your account.',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    console.error('Error in signup route:', e)
    return new Response('Internal Server Error', { status: 500 })
  }
}

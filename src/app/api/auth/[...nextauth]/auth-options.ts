import { JWT } from '@auth/core/jwt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthConfig, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { comparePwd } from '@/lib/bcrypt'
import prisma from '@/lib/prisma'
import { UserStatus } from '@/models/user'

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember me', type: 'boolean' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error(
            JSON.stringify({
              code: 400,
              message: 'Please enter both email and password.',
            }),
          )
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user) {
          throw new Error(
            JSON.stringify({
              code: 404,
              message: 'User not found. Please register first.',
            }),
          )
        }

        const isPasswordValid = await comparePwd(credentials.password as string, user.password || '')

        if (!isPasswordValid) {
          throw new Error(
            JSON.stringify({
              code: 401,
              message: 'Invalid credentials. Incorrect password.',
            }),
          )
        }

        if (user.status !== UserStatus.ACTIVE) {
          throw new Error(
            JSON.stringify({
              code: 403,
              message: 'Account not activated. Please verify your email.',
            }),
          )
        }

        // Update `lastSignInAt` field
        await prisma.user.update({
          where: { id: user.id },
          data: { lastSignInAt: new Date() },
        })

        return {
          id: user.id,
          status: user.status,
          email: user.email,
          name: user.name || 'Anonymous',
          avatar: user.avatar,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({
      token,
      user,
      session,
      trigger,
    }: {
      token: JWT
      user: User
      session?: Session
      trigger?: 'signIn' | 'signUp' | 'update'
    }) {
      if (trigger === 'update' && session?.user) {
        token = session.user
      } else {
        if (user) {
          token.id = (user.id || token.sub) as string
          token.email = user.email
          token.name = user.name || 'Anonymous'
          token.avatar = user.avatar
          token.status = user.status
        }
      }

      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.avatar = token.avatar
        session.user.status = token.status
      }
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
}

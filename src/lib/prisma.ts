import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.APP_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : [],
  })

if (process.env.APP_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma

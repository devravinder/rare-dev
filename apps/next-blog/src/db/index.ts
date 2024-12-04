export * from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()
console.log('✓ 😀 DB connection established successfully') // suto connection // db.$connect()
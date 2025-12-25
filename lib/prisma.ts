import { PrismaClient } from '../prisma/generated/client' // Adjust path based on your schema output
import { PrismaPg } from '@prisma/adapter-pg'


// 1. Declare the global object to store the instance
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// 2. Initialize the adapter as per official Prisma 7 docs
const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
})

// 3. Create the singleton instance
export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter })

// 4. In development, save the instance to the global object 
// to prevent re-initialization on every hot-reload
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
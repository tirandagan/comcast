import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Disable all Prisma logging except errors
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.DEBUG?.includes('prisma') 
    ? ['query', 'error', 'warn'] 
    : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
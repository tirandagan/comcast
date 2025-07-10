import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Disable all Prisma logging except errors
const prismaClientOptions = process.env.DEBUG?.includes('prisma') 
  ? { log: ['query', 'error', 'warn'] as const }
  : { log: ['error'] as const };

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "@/shared/config/config";

const adapter = new PrismaPg({ connectionString: config.databaseUrl });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: config.isDevelopment ? ["query", "warn", "error"] : ["error"],
  });

if (!config.isProduction) {
  globalForPrisma.prisma = prisma;
}

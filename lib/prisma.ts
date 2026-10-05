import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

// pg-connection-string warns when sslmode is 'require', 'prefer', or 'verify-ca'
// because those will lose their current meaning in pg v9. Normalise to 'verify-full'
// now to keep identical semantics and silence the warning.
function normalizeConnectionString(url: string): string {
  try {
    const u = new URL(url)
    const mode = u.searchParams.get("sslmode")
    if (mode === "require" || mode === "prefer" || mode === "verify-ca") {
      u.searchParams.set("sslmode", "verify-full")
    }
    return u.toString()
  } catch {
    return url
  }
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL is not set")

  if (url.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url })
  }

  const adapter = new PrismaPg({ connectionString: normalizeConnectionString(url) })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

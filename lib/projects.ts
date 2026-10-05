import { getIdentity } from "./project-access"
import { prisma } from "./prisma"
import { type Project } from "@/app/generated/prisma/client"

export type { Project }

export interface ProjectLists {
  owned: Project[]
  shared: Project[]
}

export async function getProjectsForUser(): Promise<ProjectLists> {
  const identity = await getIdentity()
  if (!identity) return { owned: [], shared: [] }

  const [owned, sharedCollaborations] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: identity.userId },
      orderBy: { createdAt: "desc" },
    }),
    identity.email
      ? prisma.projectCollaborator.findMany({
          where: { email: identity.email },
          include: { project: true },
          orderBy: { createdAt: "desc" },
        })
      : [],
  ])

  const shared = sharedCollaborations.map((c) => c.project)
  return { owned, shared }
}

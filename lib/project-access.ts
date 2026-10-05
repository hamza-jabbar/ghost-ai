import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "./prisma"
import { type Project } from "@/app/generated/prisma/client"

export interface ClerkIdentity {
  userId: string
  email: string | null
}

export async function getIdentity(): Promise<ClerkIdentity | null> {
  const { userId } = await auth()
  if (!userId) return null
  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress ?? null
  return { userId, email }
}

export async function getProjectAccess(
  projectId: string
): Promise<{ project: Project | null; allowed: boolean }> {
  const identity = await getIdentity()
  if (!identity) return { project: null, allowed: false }

  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project) return { project: null, allowed: false }

  if (project.ownerId === identity.userId) return { project, allowed: true }

  if (identity.email) {
    const collaborator = await prisma.projectCollaborator.findUnique({
      where: { projectId_email: { projectId, email: identity.email } },
    })
    if (collaborator) return { project, allowed: true }
  }

  return { project, allowed: false }
}

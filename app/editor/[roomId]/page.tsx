import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { getProjectAccess } from "@/lib/project-access"
import { getProjectsForUser } from "@/lib/projects"
import { AccessDenied } from "@/components/editor/access-denied"
import { WorkspaceShell } from "@/components/editor/workspace-shell"

interface WorkspacePageProps {
  params: Promise<{ roomId: string }>
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { roomId } = await params

  const { isAuthenticated } = await auth()
  if (!isAuthenticated) redirect("/sign-in")

  const { project, allowed } = await getProjectAccess(roomId)
  if (!allowed || !project) return <AccessDenied />

  const { owned, shared } = await getProjectsForUser()

  return (
    <WorkspaceShell
      project={project}
      ownedProjects={owned}
      sharedProjects={shared}
    />
  )
}

"use client"

import { useState } from "react"
import { cn } from "cn"
import { WorkspaceNavbar } from "./workspace-navbar"
import { ProjectSidebar } from "./project-sidebar"
import { ProjectDialogsProvider } from "./project-dialogs-context"
import { CreateProjectDialog } from "./create-project-dialog"
import { RenameProjectDialog } from "./rename-project-dialog"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { useProjectActions } from "@/hooks/use-project-actions"
import { type Project } from "@/app/generated/prisma/client"

interface WorkspaceShellProps {
  project: Project
  ownedProjects: Project[]
  sharedProjects: Project[]
}

export function WorkspaceShell({ project, ownedProjects, sharedProjects }: WorkspaceShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAiOpen, setIsAiOpen] = useState(false)
  const actions = useProjectActions()

  return (
    <ProjectDialogsProvider value={actions}>
      <div className="h-screen overflow-hidden bg-base">
        <WorkspaceNavbar
          projectName={project.name}
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen((v) => !v)}
          isAiOpen={isAiOpen}
          onAiToggle={() => setIsAiOpen((v) => !v)}
        />

        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          ownedProjects={ownedProjects}
          sharedProjects={sharedProjects}
          activeProjectId={project.id}
          onOpenCreate={actions.openCreate}
          onOpenRename={actions.openRename}
          onOpenDelete={actions.openDelete}
        />

        <CreateProjectDialog
          open={actions.dialog === "create"}
          onClose={actions.closeDialog}
          name={actions.formName}
          onNameChange={actions.setFormName}
          roomIdPreview={actions.roomIdPreview}
          onSubmit={actions.submitCreate}
          isLoading={actions.isLoading}
        />
        <RenameProjectDialog
          open={actions.dialog === "rename"}
          onClose={actions.closeDialog}
          project={actions.selectedProject}
          name={actions.formName}
          onNameChange={actions.setFormName}
          onSubmit={actions.submitRename}
          isLoading={actions.isLoading}
        />
        <DeleteProjectDialog
          open={actions.dialog === "delete"}
          onClose={actions.closeDialog}
          project={actions.selectedProject}
          onConfirm={actions.submitDelete}
          isLoading={actions.isLoading}
        />

        <div className="flex h-full pt-12">
          {/* Canvas area */}
          <div
            className={cn(
              "flex flex-1 flex-col overflow-hidden transition-[margin-right] duration-200 ease-in-out",
              isAiOpen ? "mr-80" : "mr-0"
            )}
          >
            <div className="flex h-full items-center justify-center bg-base">
              <p className="text-sm text-copy-muted">Canvas coming soon</p>
            </div>
          </div>

          {/* AI sidebar */}
          <aside
            className={cn(
              "fixed top-12 right-0 z-30 flex h-[calc(100vh-3rem)] w-80 flex-col bg-surface border-l border-surface-border transition-transform duration-200 ease-in-out",
              isAiOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-copy-muted">AI chat coming soon</p>
            </div>
          </aside>
        </div>
      </div>
    </ProjectDialogsProvider>
  )
}

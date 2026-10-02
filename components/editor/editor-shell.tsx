"use client"

import { useState } from "react"
import { EditorNavbar } from "./editor-navbar"
import { ProjectSidebar } from "./project-sidebar"
import { ProjectDialogsProvider } from "./project-dialogs-context"
import { CreateProjectDialog } from "./create-project-dialog"
import { RenameProjectDialog } from "./rename-project-dialog"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

interface EditorShellProps {
  children: React.ReactNode
}

export function EditorShell({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dialogs = useProjectDialogs()

  return (
    <ProjectDialogsProvider value={dialogs}>
      <div className="h-screen overflow-hidden bg-base">
        <EditorNavbar
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen((v) => !v)}
        />
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          projects={dialogs.projects}
          onOpenCreate={dialogs.openCreate}
          onOpenRename={dialogs.openRename}
          onOpenDelete={dialogs.openDelete}
        />
        <CreateProjectDialog
          open={dialogs.dialog === "create"}
          onClose={dialogs.closeDialog}
          name={dialogs.formName}
          onNameChange={dialogs.setFormName}
          onSubmit={dialogs.createProject}
          isLoading={dialogs.isLoading}
        />
        <RenameProjectDialog
          open={dialogs.dialog === "rename"}
          onClose={dialogs.closeDialog}
          project={dialogs.selectedProject}
          name={dialogs.formName}
          onNameChange={dialogs.setFormName}
        />
        <DeleteProjectDialog
          open={dialogs.dialog === "delete"}
          onClose={dialogs.closeDialog}
          project={dialogs.selectedProject}
        />
        <main className="h-full pt-12">{children}</main>
      </div>
    </ProjectDialogsProvider>
  )
}

"use client"

import { X, Plus, Pencil, Trash2 } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type MockProject } from "@/hooks/use-project-dialogs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: MockProject[]
  onOpenCreate: () => void
  onOpenRename: (project: MockProject) => void
  onOpenDelete: (project: MockProject) => void
}

interface ProjectItemProps {
  project: MockProject
  onRename: (project: MockProject) => void
  onDelete: (project: MockProject) => void
  showActions: boolean
}

function ProjectItem({ project, onRename, onDelete, showActions }: ProjectItemProps) {
  return (
    <div className="group flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-elevated">
      <span className="flex-1 truncate text-sm text-copy-secondary">
        {project.name}
      </span>
      {showActions && (
        <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-6 w-6 text-copy-muted hover:text-copy-primary"
            onClick={() => onRename(project)}
          >
            <Pencil className="h-3.5 w-3.5" />
            <span className="sr-only">Rename</span>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-6 w-6 text-copy-muted hover:text-error"
            onClick={() => onDelete(project)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )}
    </div>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onOpenCreate,
  onOpenRename,
  onOpenDelete,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.owned)
  const sharedProjects = projects.filter((p) => !p.owned)

  return (
    <>
      {/* Mobile backdrop scrim */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-12 left-0 z-30 flex h-[calc(100vh-3rem)] w-72 flex-col bg-surface border-r border-surface-border transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
          <span className="text-sm font-medium text-copy-primary">Projects</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-copy-muted hover:text-copy-primary"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <Tabs defaultValue="my-projects" className="flex flex-1 flex-col overflow-hidden px-4 pt-3">
          <TabsList className="w-full">
            <TabsTrigger value="my-projects" className="flex-1">My Projects</TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">Shared</TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex flex-1 flex-col overflow-hidden">
            {ownedProjects.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-copy-muted">No projects yet.</p>
              </div>
            ) : (
              <ScrollArea className="flex-1 py-2">
                <div className="flex flex-col gap-0.5">
                  {ownedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      showActions={project.owned}
                      onRename={onOpenRename}
                      onDelete={onOpenDelete}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="shared" className="flex flex-1 flex-col overflow-hidden">
            {sharedProjects.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-copy-muted">No shared projects.</p>
              </div>
            ) : (
              <ScrollArea className="flex-1 py-2">
                <div className="flex flex-col gap-0.5">
                  {sharedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      showActions={false}
                      onRename={onOpenRename}
                      onDelete={onOpenDelete}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t border-surface-border">
          <Button className="w-full gap-2" onClick={onOpenCreate}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

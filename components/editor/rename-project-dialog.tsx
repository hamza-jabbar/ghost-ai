"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { type MockProject } from "@/hooks/use-project-dialogs"

interface RenameProjectDialogProps {
  open: boolean
  onClose: () => void
  project: MockProject | null
  name: string
  onNameChange: (v: string) => void
}

export function RenameProjectDialog({
  open,
  onClose,
  project,
  name,
  onNameChange,
}: RenameProjectDialogProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="rounded-3xl sm:max-w-md" showCloseButton={false}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename project</DialogTitle>
            {project && (
              <DialogDescription>
                Renaming &ldquo;{project.name}&rdquo;
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="py-4">
            <Input
              placeholder="Project name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              autoFocus
            />
          </div>

          <DialogFooter className="rounded-b-3xl">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!name.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

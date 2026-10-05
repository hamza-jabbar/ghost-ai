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
import { type Project } from "@/app/generated/prisma/client"

interface RenameProjectDialogProps {
  open: boolean
  onClose: () => void
  project: Project | null
  name: string
  onNameChange: (v: string) => void
  onSubmit: () => Promise<void>
  isLoading: boolean
}

export function RenameProjectDialog({
  open,
  onClose,
  project,
  name,
  onNameChange,
  onSubmit,
  isLoading,
}: RenameProjectDialogProps) {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    await onSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isLoading && onClose()}>
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
              disabled={isLoading}
            />
          </div>

          <DialogFooter className="rounded-b-3xl">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!name.trim() || isLoading}>
              {isLoading ? "Renaming…" : "Rename"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

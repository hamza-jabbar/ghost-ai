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
import { Button } from "@/components/ui/button"
import { type Project } from "@/app/generated/prisma/client"

interface DeleteProjectDialogProps {
  open: boolean
  onClose: () => void
  project: Project | null
  onConfirm: () => Promise<void>
  isLoading: boolean
}

export function DeleteProjectDialog({
  open,
  onClose,
  project,
  onConfirm,
  isLoading,
}: DeleteProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isLoading && onClose()}>
      <DialogContent className="rounded-3xl sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>
            {project
              ? `"${project.name}" will be permanently deleted. This cannot be undone.`
              : "This project will be permanently deleted. This cannot be undone."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="rounded-b-3xl">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting…" : "Delete project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

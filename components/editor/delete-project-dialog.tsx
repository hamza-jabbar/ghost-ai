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
import { type MockProject } from "@/hooks/use-project-dialogs"

interface DeleteProjectDialogProps {
  open: boolean
  onClose: () => void
  project: MockProject | null
}

export function DeleteProjectDialog({
  open,
  onClose,
  project,
}: DeleteProjectDialogProps) {
  function handleConfirm() {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

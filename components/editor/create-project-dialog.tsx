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

interface CreateProjectDialogProps {
  open: boolean
  onClose: () => void
  name: string
  onNameChange: (v: string) => void
  roomIdPreview: string
  onSubmit: () => Promise<void>
  isLoading: boolean
}

export function CreateProjectDialog({
  open,
  onClose,
  name,
  onNameChange,
  roomIdPreview,
  onSubmit,
  isLoading,
}: CreateProjectDialogProps) {
  const canSubmit = name.trim().length > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    await onSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isLoading && onClose()}>
      <DialogContent className="rounded-3xl sm:max-w-md" showCloseButton={false}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>
              Give your architecture workspace a name.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="project-name"
                className="text-xs font-medium text-copy-secondary"
              >
                Project name
              </label>
              <Input
                id="project-name"
                placeholder="My Project"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                autoFocus
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-copy-secondary">
                Room ID preview
              </label>
              <Input
                value={roomIdPreview}
                readOnly
                disabled
                className="font-mono text-xs text-copy-muted"
                placeholder="my-project-xxxxx"
              />
            </div>
          </div>

          <DialogFooter className="rounded-b-3xl">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!canSubmit || isLoading}>
              {isLoading ? "Creating…" : "Create project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useEffect, useState } from "react"
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

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
}

interface CreateProjectDialogProps {
  open: boolean
  onClose: () => void
  name: string
  onNameChange: (v: string) => void
  onSubmit: (name: string, slug: string) => Promise<void>
  isLoading: boolean
}

export function CreateProjectDialog({
  open,
  onClose,
  name,
  onNameChange,
  onSubmit,
  isLoading,
}: CreateProjectDialogProps) {
  const [slug, setSlug] = useState("")
  const [slugTouched, setSlugTouched] = useState(false)

  // Reset slug state when dialog opens
  useEffect(() => {
    if (open) {
      setSlug(toSlug(name))
      setSlugTouched(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Auto-derive slug from name until the user manually edits it
  useEffect(() => {
    if (!slugTouched) {
      setSlug(toSlug(name))
    }
  }, [name, slugTouched])

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(e.target.value)
    setSlugTouched(true)
  }

  const isSlugValid = slug.length > 0
  const canSubmit = name.trim().length > 0 && isSlugValid

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    await onSubmit(name, slug)
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
              <label
                htmlFor="project-slug"
                className="text-xs font-medium text-copy-secondary"
              >
                Slug
              </label>
              <Input
                id="project-slug"
                placeholder="my-project"
                value={slug}
                onChange={handleSlugChange}
                disabled={isLoading}
                className="font-mono text-xs"
                aria-invalid={slugTouched && !isSlugValid}
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

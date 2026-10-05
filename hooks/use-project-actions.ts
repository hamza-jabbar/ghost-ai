"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { type Project } from "@/app/generated/prisma/client"

export type { Project }
export type DialogType = "create" | "rename" | "delete" | null

export interface UseProjectActionsReturn {
  dialog: DialogType
  selectedProject: Project | null
  formName: string
  roomIdPreview: string
  isLoading: boolean
  setFormName: (v: string) => void
  openCreate: () => void
  openRename: (project: Project) => void
  openDelete: (project: Project) => void
  closeDialog: () => void
  submitCreate: () => Promise<void>
  submitRename: () => Promise<void>
  submitDelete: () => Promise<void>
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function shortSuffix(): string {
  return Math.random().toString(36).slice(2, 7)
}

export function useProjectActions(): UseProjectActionsReturn {
  const router = useRouter()
  const pathname = usePathname()

  const [dialog, setDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [formName, setFormName] = useState("")
  const [suffix, setSuffix] = useState(() => shortSuffix())
  const [isLoading, setIsLoading] = useState(false)

  const roomIdPreview = formName.trim()
    ? `${slugify(formName.trim())}-${suffix}`
    : ""

  function openCreate() {
    setFormName("")
    setSuffix(shortSuffix())
    setSelectedProject(null)
    setDialog("create")
  }

  function openRename(project: Project) {
    setFormName(project.name)
    setSelectedProject(project)
    setDialog("rename")
  }

  function openDelete(project: Project) {
    setSelectedProject(project)
    setDialog("delete")
  }

  function closeDialog() {
    setDialog(null)
  }

  async function submitCreate() {
    if (!formName.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName.trim() }),
      })
      if (!res.ok) throw new Error("Failed to create project")
      const project: Project = await res.json()
      setDialog(null)
      router.push(`/editor/${project.id}`)
    } finally {
      setIsLoading(false)
    }
  }

  async function submitRename() {
    if (!selectedProject || !formName.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName.trim() }),
      })
      if (!res.ok) throw new Error("Failed to rename project")
      setDialog(null)
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  async function submitDelete() {
    if (!selectedProject) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete project")
      setDialog(null)
      if (pathname === `/editor/${selectedProject.id}`) {
        router.push("/editor")
      } else {
        router.refresh()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    dialog,
    selectedProject,
    formName,
    roomIdPreview,
    isLoading,
    setFormName,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    submitCreate,
    submitRename,
    submitDelete,
  }
}

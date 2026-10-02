"use client"

import { useState } from "react"

export interface MockProject {
  id: string
  name: string
  slug: string
  owned: boolean
}

export type DialogType = "create" | "rename" | "delete" | null

export interface UseProjectDialogsReturn {
  projects: MockProject[]
  dialog: DialogType
  selectedProject: MockProject | null
  formName: string
  setFormName: (v: string) => void
  isLoading: boolean
  openCreate: () => void
  openRename: (project: MockProject) => void
  openDelete: (project: MockProject) => void
  closeDialog: () => void
  createProject: (name: string, slug: string) => Promise<void>
}

const INITIAL_PROJECTS: MockProject[] = [
  { id: "1", name: "E-Commerce Platform", slug: "e-commerce-platform", owned: true },
  { id: "2", name: "Auth Service", slug: "auth-service", owned: true },
  { id: "3", name: "Analytics Dashboard", slug: "analytics-dashboard", owned: false },
]

export function useProjectDialogs(): UseProjectDialogsReturn {
  const [projects, setProjects] = useState<MockProject[]>(INITIAL_PROJECTS)
  const [dialog, setDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null)
  const [formName, setFormName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function openCreate() {
    setFormName("")
    setSelectedProject(null)
    setDialog("create")
  }

  function openRename(project: MockProject) {
    setFormName(project.name)
    setSelectedProject(project)
    setDialog("rename")
  }

  function openDelete(project: MockProject) {
    setSelectedProject(project)
    setDialog("delete")
  }

  function closeDialog() {
    setDialog(null)
  }

  async function createProject(name: string, slug: string) {
    setIsLoading(true)
    await new Promise<void>((resolve) => setTimeout(resolve, 800))
    setProjects((prev) => [
      ...prev,
      { id: Date.now().toString(), name: name.trim(), slug, owned: true },
    ])
    setIsLoading(false)
    setDialog(null)
  }

  return {
    projects,
    dialog,
    selectedProject,
    formName,
    setFormName,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    createProject,
  }
}

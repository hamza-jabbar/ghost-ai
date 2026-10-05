"use client"

import { createContext, useContext } from "react"
import { type UseProjectActionsReturn } from "@/hooks/use-project-actions"

const ProjectDialogsContext = createContext<UseProjectActionsReturn | null>(null)

export function ProjectDialogsProvider({
  value,
  children,
}: {
  value: UseProjectActionsReturn
  children: React.ReactNode
}) {
  return (
    <ProjectDialogsContext.Provider value={value}>
      {children}
    </ProjectDialogsContext.Provider>
  )
}

export function useProjectDialogsContext(): UseProjectActionsReturn {
  const ctx = useContext(ProjectDialogsContext)
  if (!ctx) throw new Error("useProjectDialogsContext must be used within ProjectDialogsProvider")
  return ctx
}

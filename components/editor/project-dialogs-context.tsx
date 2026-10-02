"use client"

import { createContext, useContext } from "react"
import { type UseProjectDialogsReturn } from "@/hooks/use-project-dialogs"

const ProjectDialogsContext = createContext<UseProjectDialogsReturn | null>(null)

export function ProjectDialogsProvider({
  value,
  children,
}: {
  value: UseProjectDialogsReturn
  children: React.ReactNode
}) {
  return (
    <ProjectDialogsContext.Provider value={value}>
      {children}
    </ProjectDialogsContext.Provider>
  )
}

export function useProjectDialogsContext(): UseProjectDialogsReturn {
  const ctx = useContext(ProjectDialogsContext)
  if (!ctx) throw new Error("useProjectDialogsContext must be used within ProjectDialogsProvider")
  return ctx
}

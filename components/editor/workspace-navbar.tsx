"use client"

import { PanelLeftOpen, PanelLeftClose, Share2, Bot } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

interface WorkspaceNavbarProps {
  projectName: string
  isSidebarOpen: boolean
  onSidebarToggle: () => void
  isAiOpen: boolean
  onAiToggle: () => void
}

export function WorkspaceNavbar({
  projectName,
  isSidebarOpen,
  onSidebarToggle,
  isAiOpen,
  onAiToggle,
}: WorkspaceNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-12 items-center bg-surface border-b border-surface-border px-3">
      <div className="flex flex-1 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="h-8 w-8 text-copy-muted hover:text-copy-primary"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <span className="max-w-[240px] truncate text-sm font-medium text-copy-primary">
          {projectName}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-copy-muted hover:text-copy-primary"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAiToggle}
          className={cn(
            "h-8 w-8",
            isAiOpen
              ? "text-accent-ai hover:text-accent-ai"
              : "text-copy-muted hover:text-copy-primary"
          )}
        >
          <Bot className="h-5 w-5" />
          <span className="sr-only">Toggle AI sidebar</span>
        </Button>
        <UserButton />
      </div>
    </header>
  )
}

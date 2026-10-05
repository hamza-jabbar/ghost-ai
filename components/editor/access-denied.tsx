import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AccessDenied() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-base">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-elevated">
        <Lock className="h-5 w-5 text-copy-muted" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-base font-semibold text-copy-primary">Access denied</h1>
        <p className="max-w-xs text-sm text-copy-muted">
          This project doesn&apos;t exist or you don&apos;t have permission to view it.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link href="/editor">Back to projects</Link>
      </Button>
    </div>
  )
}

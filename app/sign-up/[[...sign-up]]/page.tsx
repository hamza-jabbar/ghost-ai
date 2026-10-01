import { SignUp } from "@clerk/nextjs"
import { Cpu, Share2, FileText, Zap } from "lucide-react"

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="h-9 w-9 shrink-0 rounded-xl bg-accent-dim flex items-center justify-center">
        <span className="text-brand [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-copy-primary">{title}</p>
        <p className="text-xs text-copy-muted mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 shrink-0 bg-elevated flex-col px-12 py-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-brand flex items-center justify-center">
            <Zap className="h-4 w-4 text-[#080809]" />
          </div>
          <span className="text-sm font-semibold text-copy-primary tracking-tight">Ghost AI</span>
        </div>

        {/* Heading + features */}
        <div className="flex-1 flex flex-col justify-center gap-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-copy-primary leading-tight tracking-tight">
              Design systems at the<br />speed of thought.
            </h1>
            <p className="text-sm text-copy-secondary leading-relaxed max-w-sm">
              Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.
            </p>
          </div>

          <div className="space-y-5">
            <FeatureItem
              icon={<Cpu />}
              title="AI Architecture Generation"
              description="Describe your system, AI maps it to nodes and edges on a live canvas."
            />
            <FeatureItem
              icon={<Share2 />}
              title="Real-time Collaboration"
              description="Live cursors, presence indicators, and shared node editing across your team."
            />
            <FeatureItem
              icon={<FileText />}
              title="Instant Spec Generation"
              description="Export a complete Markdown technical spec directly from the canvas graph."
            />
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-copy-faint">© 2026 Ghost AI. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-base flex items-center justify-center px-6 py-16">
        <SignUp />
      </div>
    </main>
  )
}

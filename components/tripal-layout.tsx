import type { ReactNode } from "react"

interface TripalLayoutProps {
  children: ReactNode
}

export function TripalLayout({ children }: TripalLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-400 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-blue-600 tracking-wide">TRIPAL</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

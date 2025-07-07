import { Loader2 } from "lucide-react"

interface LoadingStatusProps {
  message?: string
}

export function LoadingStatus({ message = "Generating answer..." }: LoadingStatusProps) {
  return (
    <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
      <span className="text-gray-600 text-sm">{message}</span>
      <div className="bg-blue-600 rounded-full p-2">
        <Loader2 className="h-4 w-4 text-white animate-spin" />
      </div>
    </div>
  )
}

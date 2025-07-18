import { Card, CardContent } from "@/components/ui/card"

interface ChatMessageProps {
  message: string
  isUser?: boolean
}

export function ChatMessage({ message, isUser = false }: ChatMessageProps) {
  return (
    <div className={`mb-6 ${isUser ? "flex justify-end" : ""}`}>
      <Card className={`${isUser ? "bg-blue-600 text-white max-w-md" : "bg-white/90 backdrop-blur-sm"} shadow-lg`}>
        <CardContent className="p-4">
          <p className="text-sm leading-relaxed">{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}

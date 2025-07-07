import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ItineraryItem {
  day: string
  location: string
  accommodation?: string
  contact?: string
  transportation?: string
  activities?: string[]
}

interface ItineraryCardProps {
  title: string
  items: ItineraryItem[]
}

export function ItineraryCard({ title, items }: ItineraryCardProps) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-l-2 border-blue-200 pl-4">
            <h3 className="font-medium text-gray-800 mb-1">
              {item.day}: {item.location}
            </h3>
            {item.accommodation && <p className="text-sm text-gray-600 mb-1">• Accommodation: {item.accommodation}</p>}
            {item.contact && <p className="text-sm text-gray-600 mb-1">• Contact: {item.contact}</p>}
            {item.transportation && (
              <p className="text-sm text-gray-600 mb-1">• Transportation: {item.transportation}</p>
            )}
            {item.activities &&
              item.activities.map((activity, actIndex) => (
                <p key={actIndex} className="text-sm text-gray-600 mb-1">
                  • {activity}
                </p>
              ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

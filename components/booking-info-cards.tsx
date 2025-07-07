import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FlightOption {
  airline: string
  price: string
}

interface HotelOption {
  name: string
  price: string
}

interface BookingInfoProps {
  flights: FlightOption[]
  hotels: HotelOption[]
  itineraryHighlights: string[]
}

export function BookingInfoCards({ flights, hotels, itineraryHighlights }: BookingInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Flight Information */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Flight Naples-Palermo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {flights.map((flight, index) => (
            <p key={index} className="text-sm text-gray-600">
              {flight.airline} - {flight.price}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Hotel Information */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Hotel Positano:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {hotels.map((hotel, index) => (
            <p key={index} className="text-sm text-gray-600">
              {hotel.name} - {hotel.price}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Itinerary Highlights */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Itinerary:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {itineraryHighlights.map((highlight, index) => (
            <p key={index} className="text-sm text-gray-600">
              {highlight}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

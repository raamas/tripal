import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, MapPin, Calendar } from "lucide-react"

export function InsightsSection() {
  return (
    <section id="insights" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Leading customer feedback intelligence for travel industry
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Transform how you understand and respond to traveler needs with our comprehensive analytics platform.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Predictive Analytics",
                  description: "Forecast travel trends and demand patterns to optimize your offerings",
                },
                {
                  icon: MapPin,
                  title: "Location Intelligence",
                  description: "Understand regional preferences and customize experiences by destination",
                },
                {
                  icon: Calendar,
                  title: "Seasonal Insights",
                  description: "Optimize pricing and availability based on seasonal travel patterns",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-500/20 rounded-lg p-3">
                    <item.icon className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Mockup */}
          <div className="relative">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <CardContent className="p-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold">Travel Insights Dashboard</h3>
                    <div className="text-blue-300 text-sm">Live</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">94%</div>
                      <div className="text-white/60 text-sm">Satisfaction Rate</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-400/20 to-blue-500/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">12.5K</div>
                      <div className="text-white/60 text-sm">Monthly Bookings</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-2">Top Destinations This Month</div>
                    <div className="space-y-2">
                      {["Rome, Italy", "Barcelona, Spain", "Paris, France"].map((destination, index) => (
                        <div key={destination} className="flex justify-between items-center">
                          <span className="text-white text-sm">{destination}</span>
                          <div className="w-16 bg-white/20 rounded-full h-1">
                            <div
                              className="bg-blue-300 h-1 rounded-full"
                              style={{ width: `${85 - index * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

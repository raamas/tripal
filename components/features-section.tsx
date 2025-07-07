import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Globe, Users, Zap } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Feature */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Everything you need to plan the perfect trip</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From AI-powered recommendations to real-time booking insights, TRIPAL provides all the tools you need for
            exceptional travel experiences.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative mb-20">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Analytics Chart */}
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Travel Analytics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white/80">
                      <span>Bookings</span>
                      <span>+23%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Revenue</span>
                      <span>$45.2K</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-blue-300 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>

                {/* Destination Insights */}
                <div className="bg-gradient-to-br from-blue-400/20 to-blue-500/20 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Popular Destinations</h3>
                  <div className="space-y-3">
                    {["Italy", "France", "Spain", "Greece"].map((destination, index) => (
                      <div key={destination} className="flex items-center justify-between">
                        <span className="text-white/80">{destination}</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-white/20 rounded-full h-1 mr-2">
                            <div
                              className="bg-blue-300 h-1 rounded-full"
                              style={{ width: `${90 - index * 15}%` }}
                            ></div>
                          </div>
                          <span className="text-white/60 text-sm">{90 - index * 15}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Activity */}
                <div className="bg-gradient-to-br from-blue-300/20 to-blue-400/20 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">User Activity</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">2,847</div>
                    <div className="text-white/60 text-sm mb-4">Active Users</div>
                    <div className="w-20 h-20 mx-auto bg-blue-400/30 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-blue-200" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: BarChart3,
              title: "Smart Analytics",
              description: "Get deep insights into travel patterns and user preferences",
            },
            {
              icon: Globe,
              title: "Global Coverage",
              description: "Access destinations and services worldwide with local expertise",
            },
            {
              icon: Users,
              title: "Personalization",
              description: "AI-powered recommendations tailored to each traveler",
            },
            {
              icon: Zap,
              title: "Real-time Updates",
              description: "Live flight status, weather, and booking confirmations",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors"
            >
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

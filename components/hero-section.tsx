import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Transform travel planning into
          <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
            {" "}
            seamless experiences
          </span>
        </h1>

        <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          Leverage AI-powered insights to create personalized travel itineraries, optimize booking experiences, and turn
          every trip into an unforgettable journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 px-8 py-3">
            Start Planning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-8 py-3">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Company Logos */}
        <div className="text-white/60 text-sm mb-8">Trusted by leading travel companies</div>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {["Expedia", "Booking.com", "Airbnb", "TripAdvisor", "Kayak", "Skyscanner"].map((company) => (
            <div key={company} className="text-white/40 font-medium text-lg">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

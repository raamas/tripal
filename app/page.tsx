import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { InsightsSection } from "@/components/insights-section"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <InsightsSection />
      </main>
      <Footer />
    </div>
  )
}

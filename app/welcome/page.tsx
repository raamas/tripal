import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Star, MapPin, Plane, Calendar } from "lucide-react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import ButtonCTA from "@/components/ButtonCTA";

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <HeroSection />
      {/* Features Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for perfect trips
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered features designed to make travel planning effortless
              and enjoyable.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-black text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <MapPin className="h-6 w-6 text-blue-400" />
                  <div className="text-xs text-gray-400">SMART PLANNING</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Instant itineraries
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get personalized travel plans in seconds based on your
                  preferences
                </p>
                <div className="bg-gray-800 rounded p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="text-xs text-gray-400">
                      Planning your trip...
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Plane className="h-6 w-6 text-blue-400" />
                  <div className="text-xs text-gray-400">REAL-TIME HELP</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Live assistance</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get instant answers and recommendations while traveling
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="text-xs text-gray-400">Flight updates</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="text-xs text-gray-400">Local tips</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="h-6 w-6 text-blue-400" />
                  <div className="text-xs text-gray-400">ORGANIZE</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Trip management</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Keep all your bookings, documents, and plans in one place
                </p>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-black"></div>
                  <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-black"></div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-black"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Loved by travelers worldwide
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-gray-600">Highly rated by users</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "This AI assistant planned my entire European trip perfectly.
                  The recommendations were spot-on and saved me hours of
                  research."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Travel Enthusiast</div>
                    <div className="text-sm text-gray-500">
                      Frequent Traveler
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The real-time assistance during my trip was incredible. Got
                  instant help when my flight was delayed and found amazing
                  local restaurants."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Adventure Seeker</div>
                    <div className="text-sm text-gray-500">Solo Traveler</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Planning family vacations used to be stressful. Now the AI
                  handles everything and suggests activities perfect for kids
                  and adults."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Family Traveler</div>
                    <div className="text-sm text-gray-500">Parent</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to travel smarter?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join travelers who have discovered the power of AI-assisted trip
            planning.
          </p>
          <ButtonCTA />
          <p className="text-sm text-gray-400 mt-4">
            No credit card required • Free trial available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl mb-4">TravelMind</div>
              <p className="text-gray-600 mb-4">
                Your personal AI travel assistant for smarter trip planning.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Mobile App
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Travel Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">
              © 2024 TravelMind. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

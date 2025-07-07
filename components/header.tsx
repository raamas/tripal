import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              TRIPAL
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-white/80 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-white/80 hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Link href='/signin'>
              Sign In
              </Link>
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-white/90">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

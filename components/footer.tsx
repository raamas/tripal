import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">TRIPAL</div>
            <p className="text-white/60 text-sm">
              Transform your travel planning experience with AI-powered insights and personalized recommendations.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Features
              </Link>
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Analytics
              </Link>
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Integrations
              </Link>
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                API
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                About
              </Link>
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Blog
              </Link>
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Careers
              </Link>
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Help Center
              </Link>
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Documentation
              </Link>
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Status
              </Link>
              <Link href="#" className="block text-white/60 hover:text-white text-sm">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">© 2025 TRIPAL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

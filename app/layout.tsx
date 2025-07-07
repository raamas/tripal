import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { FaviconGenerator } from "@/components/favicon-generator"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
// import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={inter.className}>
        <FaviconGenerator />
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
            {children}
          {/* </ThemeProvider> */}
      </body>
    </html>
  )
}

import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
// import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tripal AI",
  description: "Hey",
  generator: "me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}

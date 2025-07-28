"use server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { getSession } from "@/lib/utils";

export default async function Header() {
  const supabase = await createClient();
  const isLoggedIn = await getSession(supabase);

  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="font-bold text-4xl self-center max-w-fit text-blue-800">
              TRIPAL
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="/plans" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signin" className="text-gray-600 hover:text-gray-900">
              {!isLoggedIn && "Sign in"}
            </Link>
            <Button className="bg-blue-800 hover:bg-blue-900 text-white">
              {isLoggedIn ? (
                <Link href="/chat">Start Chat</Link>
              ) : (
                <Link href="/signin">Get Started</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

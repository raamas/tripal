"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export function Header() {
  const [user, setUser] = useState<User>();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(
          "Error getting user object (/welcome header): ",
          error.message
        );
        return error;
      }
      setUser(data.user);
      console.log(data.user);
      return user;
    };
    getUser();
  }, []);

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
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signin" className="text-gray-600 hover:text-gray-900">
              {!user && "Sign in"}
            </Link>
            <Button className="bg-blue-800 hover:bg-blue-900 text-white">
              {user ? (
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

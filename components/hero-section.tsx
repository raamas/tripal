"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Badge } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import Link from "next/link";

export function HeroSection() {
  const supabase = createClient();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(
          "Error getting user object (/welcome: hero): ",
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
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-6">
              AI-powered travel planning
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your personal{" "}
              <span className="text-blue-800">travel AI assistant.</span> Plan
              smarter.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get personalized travel recommendations, instant itinerary
              planning, and real-time assistance for your perfect trip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-800 hover:bg-blue-900 text-white"
              >
                <Link href={user ? "/chat" : "/signin"}>Start Planning</Link>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Free trial available • No credit card required
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

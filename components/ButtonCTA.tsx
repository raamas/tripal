"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";

export default function ButtonCTA() {
  const supabase = createClient();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("Error getting user object (app/)");
        return error;
      }
      setUser(data.user);
      console.log(data.user);
      return user;
    };
    getUser();
  }, []);
  return (
    <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white">
      <Link href={user ? "/chat" : "/signin"}>Start your journey</Link>
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

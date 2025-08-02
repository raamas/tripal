"use server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getSession } from "@/lib/utils";

export default async function ButtonCTA() {
  const supabase = await createClient();
  const user = await getSession(supabase);

  return (
    <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white">
      <Link href={user ? "/chat" : "/signin"}>Start your journey</Link>
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

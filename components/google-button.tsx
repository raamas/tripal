// "use server";
import type React from "react";
import { Button } from "./ui/button";
// import { Children } from "react";
// import { handleGoogleLogin } from "@/utils/loginFunction";
import { createClient } from "@/utils/supabase/client";
import { handleGoogleLogin } from "@/app/actions/auth";

interface GoogleButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function GoogleButton({
  className,
  children,
}: GoogleButtonProps) {
  const supabase = createClient();

  return (
    <form action={handleGoogleLogin}>
      <Button type="submit" className={className}>
        {children}
      </Button>
    </form>
  );
}

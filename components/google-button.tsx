// "use server";
import type React from "react";
import { Button } from "./ui/button";
// import { Children } from "react";
import { createClient } from "@/utils/supabase/client";

interface GoogleButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function GoogleButton({
  className,
  children,
}: GoogleButtonProps) {
  const handleClick = async () => {
    console.log("DEBUG: sign in with google");
    console.log(`DEBUG: CreateClient`);
    const supabase = await createClient();
    console.log(`DEBUG: Created`);
    // const { data: user, error } = await supabase.auth.signUp({
    //   email: "omardenilson007@gmail.com",
    //   password: "password 99.",
    // });
    console.log(`DEBUG: running auth`);
    console.log();
    const { data: user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    console.log(`DEBUG: running done`);

    if (error) {
      console.log("DEBUG: errorCoño manooo");
      console.log(error);
    }
    console.log("DEBUG: done?");
    console.log(user);
  };

  return (
    <Button onClick={handleClick} className={className}>
      {children}
    </Button>
  );
}

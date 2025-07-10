"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const handleGoogleLogin = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });

  if (error || !data) {
    console.log("Error signing user in. (sign in component)");
    console.log(error);
  }
  if (data.url) {
    console.log(
      "########################################### Redirecting to: ",
      data.url
    );
    redirect(data.url);
  }
};

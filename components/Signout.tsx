import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default function SignOut() {
  const supabase = createClient();
  const handler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error signing user out: ", error);
      return;
    }
    redirect("welcome");
    // console.log("sucesss");
  };

  return (
    <Button
      onClick={handler}
      className="border-2 bg-white text-blue-700 hover:bg-white border-blue-700 hover:scale-102 transition-transform ease-in-out hover:border-blue-800 w-full"
    >
      Sign Out
    </Button>
  );
}

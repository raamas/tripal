"use server";
import SignOut from "@/components/Signout";
import { getUserMetadata } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default async function Header() {
  const supabase = await createClient();
  const { user, error } = await getUserMetadata(supabase);
  if (error) {
    console.log("Error getting the user object. (app/users/me)");
    redirect("/welcome");
  }

  return (
    <section
      id="heading"
      className=" w-[80vw] flex flex-row items-center justify-between self-center mt-24"
    >
      <div className="w-2/3">
        <h2 className="text-xl font-semibold">
          {user ? user.name : "No user"}
        </h2>
        <SignOut />
      </div>

      <img
        src={user?.avatar_url}
        alt="profile_image"
        className="rounded-full"
        width="48px"
      />
    </section>
  );
}

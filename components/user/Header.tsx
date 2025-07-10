"use client";
import { useEffect, useState } from "react";
import SignOut from "@/components/Signout";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default function Header() {
  const supabase = createClient();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("Error getting the user object. (app/users/me)");
        redirect("/welcome");
        return error;
      }

      setUser(data.user);
    };

    getUser();
  }, []);

  return (
    <section
      id="heading"
      className=" w-[80vw] flex flex-row items-center justify-between self-center mt-20"
    >
      <div className="w-2/3">
        <h2 className="text-xl font-semibold">
          {user && user.user_metadata ? user?.user_metadata?.name : "No user"}
        </h2>
        <SignOut />
      </div>

      <img
        src={user?.user_metadata.avatar_url}
        alt="profile_image"
        className="rounded-full"
        width="48px"
      />
    </section>
  );
}

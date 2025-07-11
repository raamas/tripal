"use client";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { MessageCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function ChatHeader() {
  const [user, setUser] = useState<User>();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.log(
          "Error fetching user object (chatHeader): ",
          error ? error : "No supabase error message"
        );
        return;
      }

      setUser(user);
    };

    getUser();
  }, []);

  return (
    <div className="w-full bg-white z-10 flex items-center justify-between p-4 border-b border-neutral-200/80 shadow-xs mb-4 fixed">
      <h1 className="font-bold text-4xl self-center max-w-fit text-blue-800  ">
        <Link href="/welcome">TRIPAL</Link>
      </h1>
      <div className="flex items-center gap-2">
        <Link href="/chat">
          <MessageCircle className="text-xl text-blue-800" />
        </Link>
        <Link href="/users/me">
          <Suspense>
            <img
              src={
                user && user.user_metadata
                  ? user.user_metadata.picture || user.user_metadata.avatar_url
                  : "https://gravatar.com/avatar/25bfd5a94d5a812b662eb18cf906a25a?s=400&d=mp&r=x"
              }
              alt=""
              width="36px"
              className="rounded-full "
            />
          </Suspense>
        </Link>
      </div>
    </div>
  );
}

"use client";
import UserMetadataForm from "@/components/user/UserMetadataForm";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function UserMetadata() {
  const supabase = createClient();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("Error getting the user object. (app/users/me)");
        return error;
      }

      setUser(data.user);

      return user;
    };

    getUser();
  }, []);
  return (
    <section id="data" className="w-full flex flex-col items-center">
      {user && user.user_metadata.city && (
        <div
          id="metadata"
          className="p-4 border border-gray-300 shadow mt-4  w-[80vw] rounded-md shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Your info</h2>
          <div>
            <p className="font-light">Your city:</p>
            <h3 className="text-lg text-blue-800">{user.user_metadata.city}</h3>
          </div>

          <div>
            <p className="font-light">Your average budget:</p>
            <h3 className="text-lg text-blue-800">
              $ {user.user_metadata.budget.toLocaleString()} USD
            </h3>
          </div>

          <div>
            <p className="font-light">Your interests:</p>
            {user.user_metadata.likes.map((l: string) => {
              <h3 className="text-lg text-blue-800">{l}</h3>;
            })}
          </div>
        </div>
      )}
      {user && !user.user_metadata.city && (
        <UserMetadataForm setUser={setUser} />
      )}
    </section>
  );
}

"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Me() {
  const supabase = createClient();
  const [user, setUser] = useState({});
  //   get the user object from supabase
  // ask the user for their location information
  // their avg travel budget
  // their "likes"
  // and provide those as context for the model
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        return error;
      }
      setUser(data.user);
      console.log(data.user);
      return user;
    };
    getUser();
  }, []);
  return <h1>{user.email}</h1>;
}

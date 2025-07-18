"use client";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface UserData {
  city: string;
  budget: number;
  likes: string;
}

export default function UserMetadataForm({
  setUser,
}: {
  setUser: (user: User | undefined) => void;
}) {
  const supabase = createClient();
  const [userData, setUserData] = useState<UserData>({
    city: "",
    budget: 0,
    likes: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.updateUser({
      data: {
        city: userData.city,
        budget: userData.budget,
        likes: userData.likes.split(","),
      },
    });

    if (error) {
      console.log("Error updating the user metadata: ", error.message);
      throw error;
    }

    setUser(data.user);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border border-gray-300 shadow-lg mt-4 rounded-md"
    >
      <h2 className="text-xl font-semibold mb-4">Complete your profile!</h2>
      <div className="city">
        <Label htmlFor="city">Your city</Label>
        <Input
          className="mb-4 focus-visible:ring-blue-800"
          type="text"
          name="city"
          id="city"
          value={userData.city}
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev!,
              city: e.target.value,
            }))
          }
        />
      </div>
      <div className="budget">
        <Label htmlFor="budget">What's your average budget (USD):</Label>
        <Input
          className="mb-4 focus-visible:ring-blue-800"
          type="number"
          name="budget"
          id="budget"
          value={userData.budget}
          onChange={(e) =>
            setUserData((userData) => ({
              ...userData!,
              budget: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="likes">
        <Label>What are your interests</Label>
        <Textarea
          className="focus-visible:ring-blue-800"
          value={userData.likes}
          onChange={(e) =>
            setUserData((userData) => ({
              ...userData!,
              likes: e.target.value,
            }))
          }
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-800 mt-4 hover:bg-blue-950"
      >
        Done!
      </Button>
    </form>
  );
}

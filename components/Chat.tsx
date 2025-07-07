"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
// import { useState } from "react";

export default function Chat({
  handleSubmit,
  userPrompt,
  setUserPrompt,
  loading,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  userPrompt: string;
  setUserPrompt: (value: string) => void;
  loading: boolean;
}) {
  // const [userPrompt, setUserPrompt] = useState("");
  // const supabase = createClient();

  // const loadingStyles = ;
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        id="userinput "
        className="w-full bg-background flex flex-row  rounded-3xl px-2 pr-4 p-1 border border-gray-300 items-center focus-within:border-blue-600"
      >
        <Input
          type="text"
          placeholder="Plan my next trip to..."
          value={userPrompt}
          name="userPrompt"
          onChange={(e) => setUserPrompt(e.target.value)}
          className="border-none focus-visible:ring-transparent "
        />
        {/* <Button type="submit">Ask!</Button> */}
        {loading && <LoaderCircle className="animate-spin" />}
      </div>
    </form>
  );
}

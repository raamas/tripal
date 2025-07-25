"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, LoaderCircle } from "lucide-react";
// import { useState } from "react";

export default function ChatInput({
  handleSubmit,
  inputValue,
  handleInputChange,
  loading,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  loading: boolean;
}) {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        id="userinput "
        className="w-full bg-background flex flex-row rounded-3xl px-2 pr-2 p-1 border border-gray-300 items-center focus-within:border-blue-600 shadow-lg/20 shadow-black"
      >
        <Input
          type="text"
          placeholder="Plan my next trip to..."
          value={inputValue}
          name="userPrompt"
          onChange={handleInputChange}
          className="border-none focus-visible:ring-transparent "
        />

        {loading ? (
          <LoaderCircle className="animate-spin mr-2 text-blue-800" />
        ) : (
          <Button
            type="submit"
            className="rounded-4xl bg-blue-800 hover:bg-blue-950"
          >
            {" "}
            <ArrowUp />{" "}
          </Button>
        )}
      </div>
    </form>
  );
}

"use client";
import Chat from "@/components/Chat";
import MessageBox from "@/components/MessageBox";
import { createClient } from "@/utils/supabase/client";
import { time } from "console";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
// import { GeminiChat } from "./model";

interface Message {
  id: number;
  type: "modelResponse" | "userPrompt";
  text: string;
}

export default function ChatPage() {
  const [messageHistory, setMessages] = useState<Message[]>([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const userPromptInput = form.elements.namedItem(
      "userPrompt"
    ) as HTMLInputElement;
    userPromptInput.disabled = true;

    setUserPrompt("");
    setMessages((messageHistory) => [
      {
        id: messageHistory.length + 1,
        type: "userPrompt",
        text: userPrompt,
      },
      ...messageHistory,
    ]);

    setLoading(true);

    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    // const modelResponse = await GeminiChat.sendMessage({ message: userPrompt });
    const res = await fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    const { modelResponse } = await res.json();
    if (modelResponse) {
      setUserPrompt("");
    }

    setMessages((messageHistory: Message[]) => [
      {
        id: messageHistory.length + 1,
        type: "modelResponse",
        text: modelResponse,
      },
      ...messageHistory,
    ]);
    userPromptInput.disabled = false;
    setTimeout(() => {}, 30000);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 flex flex-col items-center justify-center p-4">
      <div className="messageHistory w-full flex flex-col-reverse overflow-auto min-h-[80vh] max-h-[85vh] no-scrollbar scroll-smooth snap-y scroll-pb-4">
        {messageHistory.map((m: Message) => (
          <MessageBox key={m.id} type={m.type} loading={loading}>
            {m.text}
          </MessageBox>
        ))}
        {/* <div className="anchor"></div> */}
      </div>
      <div className="chat-container w-full">
        <Chat
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}

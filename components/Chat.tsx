"use client";
import { useEffect, useState } from "react";
import MessageBox from "@/components/MessageBox";
import ChatInput from "@/components/chat/Input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

interface Message {
  id: number;
  type: "modelResponse" | "userPrompt";
  text: string;
}
export default function Chat() {
  const [messageHistory, setMessages] = useState<Message[]>([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  interface Part {
    text: string;
  }
  interface ChatHistory {
    role: "user" | "model";
    parts: Part[];
  }

  useEffect(() => {
    const getMessageHistory = async () => {
      const {
        error: userError,
        data: { user },
      } = await supabase.auth.getUser();
      if (userError || !user) {
        console.log("Error getting user object: ", userError);
        return;
      }
      const { error: chatsError, data } = await supabase
        .from("user_chats")
        .select("raw_chat_history")
        .eq("user_id", user.id)
        .maybeSingle();

      if (chatsError) {
        console.log("Error getting user's chat history: ", chatsError);
        return;
      }

      const raw_chat_history = data?.raw_chat_history;
      const newChatHistory: Message[] = [];

      console.log(raw_chat_history);

      raw_chat_history.forEach((element: ChatHistory, index: number) => {
        if (index != 0 && index != 1) {
          newChatHistory.push({
            id: newChatHistory.length,
            text: element.parts[0].text,
            type: element.role === "model" ? "modelResponse" : "userPrompt",
          });
        }
      });

      setMessages(newChatHistory);
    };

    getMessageHistory();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages((messageHistory) => [
      ...messageHistory,
      {
        id: messageHistory.length + 1,
        type: "userPrompt",
        text: userPrompt,
      },
    ]);

    const form = e.target as HTMLFormElement;
    const userPromptInput = form.elements.namedItem(
      "userPrompt"
    ) as HTMLInputElement;

    userPromptInput.disabled = true;

    setUserPrompt("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    const { modelResponse } = await res.json();
    if (!modelResponse) {
      setMessages((messageHistory: Message[]) => [
        ...messageHistory,
        {
          id: messageHistory.length + 1,
          type: "modelResponse",
          text: "Server error, Try again later. If the error persists contact [the developer](https://x.com/ramaas70)",
        },
      ]);
      setLoading(false);
      return;
    }
    setUserPrompt("");

    setMessages((messageHistory: Message[]) => [
      ...messageHistory,
      {
        id: messageHistory.length + 1,
        type: "modelResponse",
        text: modelResponse,
      },
    ]);

    userPromptInput.disabled = false;
    setLoading(false);
  };

  return (
    <div className="flex justify-center">
      {/* <Messages /> */}
      <div className="messageHistory w-[80vw] flex flex-col min-h-[80vh] my-20 ">
        {messageHistory.map((m: Message) => (
          <MessageBox key={m.id} type={m.type} loading={loading}>
            {m.text}
          </MessageBox>
        ))}
      </div>

      {/* <ChatContainer /> */}
      <div className="chat-container w-full fixed bottom-0 p-2 pb-4">
        {!loading && messageHistory.length === 0 && userPrompt === "" && (
          <div className="w-full px-4 py-2 items-center justify-center text-sm">
            {[
              "Where could i go for my trip next weekend?",
              "What is a fun travel destination for my budget next summer?",
              "What are some cool activities to do in Colombia?",
            ].map((m, i) => (
              <Button
                key={i}
                className="bg-white text-blue-800 hover:bg-white w-full border m-1 rounded-md hover:scale-102 transition-transform ease-in-out shadow-sm/10 hover:shadow-md/10 "
                onClick={(e) => {
                  setUserPrompt(
                    (e.target as HTMLButtonElement).textContent || ""
                  );
                }}
              >
                {m}
              </Button>
            ))}
          </div>
        )}

        <ChatInput
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}

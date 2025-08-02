"use client";
import { useState, useRef, useEffect } from "react";
import MessageBox from "@/components/MessageBox";
import ChatInput from "@/components/chat/Input";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";

export default function Chat({ mode }: { mode: "demo" | "user" }) {
  const [loading, setLoading] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, error, reload } =
    useChat({
      maxSteps: 5,
      body: {
        mode,
      },
    });

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    if (scrollRef.current) {
      // Option 1: Using scrollTo with smooth behavior
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex justify-center">
      {/* <Messages /> */}
      <div
        className="messageHistory min-h-[88vh] max-h-[90vh] w-full flex flex-col items-center py-1 overflow-y-scroll no-scrollbar"
        ref={scrollRef}
      >
        <div className="w-[80vw] pt-16">
          {messages.map((m, index) => (
            <span key={index} className="w-full  flex flex-col">
              {m.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <MessageBox key={`${m.id}-${i}`} type={m.role}>
                        {part.text}
                      </MessageBox>
                    );
                  case "tool-invocation":
                    return <p key={`${m.id}-${i}`}>Loading...</p>;
                }
              })}
            </span>
          ))}
        </div>
        {error && (
          <>
            <div className="text-red-800 italic font-semibold">
              An error occurred.
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => reload()}
            >
              Retry
            </Button>
          </>
        )}
      </div>
      {/* <ChatContainer /> */}
      <div className="chat-container w-full fixed bottom-0 p-2 pb-4">
        <ChatInput
          inputValue={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

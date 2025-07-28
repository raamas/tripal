"use client";
import { useState } from "react";
import MessageBox from "@/components/MessageBox";
import ChatInput from "@/components/chat/Input";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });

  return (
    <div className="flex justify-center">
      {/* <Messages /> */}
      <div className="messageHistory w-[80vw] flex flex-col min-h-[80vh] py-18 ">
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
                // case "tool-invocation":
                //   return (
                //     <pre key={`${m.id}-${i}`}>
                //       {JSON.stringify(part.toolInvocation, null, 2)}
                //     </pre>
                //   );
              }
            })}
          </span>
        ))}
        {error && <p>{error}</p>}
      </div>
      {/* <ChatContainer /> */}
      <div className="chat-container w-full fixed bottom-0 p-2 pb-4">
        <ChatInput
          inputValue={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}

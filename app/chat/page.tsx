import ChatHeader from "@/components/ChatHeader";
import Chat from "@/components/Chat";
import { Suspense } from "react";
import ChatSkeleton from "@/components/ChatSkeleton";

export default function ChatPage() {
  return (
    <>
      <ChatHeader />
      {/* <ChatSkeleton /> */}
      <Suspense fallback={<ChatSkeleton />}>
        <Chat />
      </Suspense>
    </>
  );
}

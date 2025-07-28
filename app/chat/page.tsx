"use server";
import ChatHeader from "@/components/AppHeader";
import Chat from "@/components/Chat";

export default async function ChatPage() {
  return (
    <>
      <ChatHeader />
      <Chat />
    </>
  );
}

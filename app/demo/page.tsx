"use server";
import ChatHeader from "@/components/AppHeader";
import Chat from "@/components/Chat";
import Header from "@/components/header";

export default async function ChatPage() {
  return (
    <>
      <Header />
      <Chat mode="demo" />
    </>
  );
}

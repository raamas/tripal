import ChatHeader from "@/components/ChatHeader";
import Header from "@/components/user/Header";
import UserMetadata from "@/components/user/UserMetadata";

export default async function Me() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ChatHeader />
      <Header />
      <UserMetadata />
    </div>
  );
}

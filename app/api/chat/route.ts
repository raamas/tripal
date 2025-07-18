import { createClient } from "@/utils/supabase/server";
import { createChatConfig } from "@/app/api/model";
import { GoogleGenAI } from "@google/genai";
import { Message, ChatHistoryMessage } from "@/lib/utils";

async function getUserChatHistory(
  userId: string
): Promise<ChatHistoryMessage[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_chats")
    .select("raw_chat_history")
    .eq("user_id", userId)
    .single();

  if (error) {
    return null;
  }
  return data.raw_chat_history;
}

async function updateUserChatHistory(
  userId: string,
  prevHistory: Message[]
): Promise<null | string> {
  const supabase = await createClient();

  if (!prevHistory) {
    const { error: updateError, data } = await supabase
      .from("user_chats")
      .insert({ user_id: userId, raw_chat_history: history })
      .select()
      .single();

    if (updateError) {
      console.log(
        "Error updating user chat history (app/api/chat: insert): ",
        updateError
      );
      return updateError.message;
    }
    return null;
  } else {
    const { error: updateError, data } = await supabase
      .from("user_chats")
      .update({ raw_chat_history: history })
      .eq("user_id", userId)
      .select()
      .single();

    if (updateError) {
      console.log(
        "Error updating user chat history (app/api/chat: update): ",
        updateError
      );
      return updateError.message;
    }
    return null;
  }
}

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.log("Error getting user object (api/chat)");
    return Response.json(error);
  }

  const { error: chatHistoryError, data: chatHistory } = await supabase
    .from("user_chats")
    .select("raw_chat_history")
    .maybeSingle();

  if (error) {
    console.log("Error getting user's chat history: ", chatHistoryError);
    return Response.json(chatHistoryError);
  }

  //

  const { name, city, budget, likes } = user.user_metadata;

  const config = chatHistory
    ? await getUserChatHistory(user.id)
    : createChatConfig(name, city, budget, likes);

  const Gemini = new GoogleGenAI({});
  const GeminiChat = Gemini.chats.create({
    model: "gemini-2.5-flash",
    history: config as ChatHistoryMessage[],
  });

  const response = await GeminiChat.sendMessage({
    message: prompt,
  });

  const history = GeminiChat.getHistory();

  return Response.json({
    status: "200",
    modelResponse: response.text,
    history: history,
  });
}

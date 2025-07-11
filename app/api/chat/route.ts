import { createClient } from "@/utils/supabase/server";
import { createChatConfig } from "@/app/api/model";
import { GoogleGenAI } from "@google/genai";

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
    ? user.user_metadata.chatHistory
    : createChatConfig(name, city, budget, likes);

  const Gemini = new GoogleGenAI({});
  const GeminiChat = Gemini.chats.create({
    model: "gemini-2.5-flash",
    history: config,
  });

  const response = await GeminiChat.sendMessage({
    message: prompt,
  });

  const history = GeminiChat.getHistory();

  if (!chatHistory) {
    const { error: updateError, data } = await supabase
      .from("user_chats")
      .insert({ user_id: user.id, raw_chat_history: history })
      .select()
      .single();

    if (updateError) {
      console.log(
        "Error updating user chat history (app/api/chat: insert): ",
        updateError
      );
      return Response.json(updateError);
    }
    console.log(data);
  } else {
    const { error: updateError, data } = await supabase
      .from("user_chats")
      .update({ raw_chat_history: history })
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      console.log(
        "Error updating user chat history (app/api/chat: update): ",
        updateError
      );
      return Response.json(updateError);
    }
    console.log(data);
  }

  return Response.json({
    status: "200",
    modelResponse: response.text,
    history: history,
  });
}

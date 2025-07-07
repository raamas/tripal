import { GoogleGenAI } from "@google/genai";
import { GeminiChat } from "./model";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  console.log(prompt);

  const response = await GeminiChat.sendMessage({
    message: prompt,
  });

  console.log(response.text);
  return Response.json({ status: "200", modelResponse: response.text });
}

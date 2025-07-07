// import { GoogleGenAI } from "@google/genai";
import { GeminiChat } from "./model";
import { StreamingTextResponse, streamText } from "ai";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  console.log(prompt);

  const response = await GeminiChat.sendMessageStream({
    message: prompt,
  });

  console.log(response.text);
  Streaming;
  return Response.json({ status: "200", modelResponse: response.text });
}

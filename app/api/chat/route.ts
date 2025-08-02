import { createClient } from "@/utils/supabase/server";
import { createChatConfig } from "@/app/api/model";
import { ChatHistoryMessage } from "@/lib/utils";
import { AmadeusClient } from "amadeusnode";
import { streamText, tool } from "ai";
import { google } from "@ai-sdk/google";
import z from "zod";
import * as chrono from "chrono-node";

const AmadeusAPI = new AmadeusClient(
  process.env.AMADEUS_KEY!,
  process.env.AMADEUS_SECRET!
);

async function getUserChatHistory(
  userId: string
): Promise<ChatHistoryMessage[] | never[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_chats")
    .select("raw_chat_history")
    .eq("user_id", userId)
    .single();

  if (error) {
    return [];
  }

  return data.raw_chat_history;
}

async function updateUserChatHistory(
  userId: string,
  newHistory: ChatHistoryMessage[],
  prevHistory: ChatHistoryMessage[]
): Promise<null | string> {
  const supabase = await createClient();

  if (!prevHistory) {
    const { error: updateError, data } = await supabase
      .from("user_chats")
      .insert({ user_id: userId, raw_chat_history: newHistory })
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
      .update({ raw_chat_history: newHistory })
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

export const maxDuration = 15;
export async function POST(request: Request) {
  const { messages } = await request.json();
  console.log(">>>>>>>>>>>>>> messages: ", messages);
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.log("Error getting user object. location: api/chat.");
    console.log(userError?.message);
    return Response.json(userError);
  }

  const { name, city, budget, likes } = await user.user_metadata;

  const result = await streamText({
    system: createChatConfig(name, city, budget, likes),
    model: google("gemini-2.5-flash"),
    messages,
    tools: {
      formatDates: tool({
        description: "turn loosely provided dates to specific date string",
        parameters: z.object({
          date: z.string().describe("date of traveling in english"),
        }),
        execute: async ({ date }) => {
          const formatDate = chrono.parseDate(date);
          return formatDate?.toISOString().slice(0, 10);
        },
      }),
      findFlights: tool({
        description: "Find flight prices in USD to a locations",
        parameters: z.object({
          origin: z.string().describe("Airport code for the origin location"),
          destination: z.string().describe("Destination's main airport's code"),
          date: z
            .string()
            .describe(
              "the estimated departure date turned to a specific date in YYYY-MM-DD format"
            ),
        }),
        execute: async ({ origin, destination, date }) => {
          const data = await AmadeusAPI.getFlightOffers(
            origin,
            destination,
            date
          );
          return {
            data,
          };
        },
      }),
      updateBudget: tool({
        description: "keep the budget up-to-date with the decisions made",
        parameters: z.object({
          update: z
            .number()
            .describe("the update to apply to the budget i.e. +500, -900"),
          budget: z.number().describe("user's current budget"),
        }),
        execute: async ({ update, budget }) => {
          return eval(`${budget} ${update}`);
        },
      }),
      findCityHotels: tool({
        description: "find the list of hotels in a city",
        parameters: z.object({
          cityCode: z
            .string()
            .describe(
              "city's 3-character IATA code. usually it's the same as the airport code"
            ),
        }),
        execute: async ({ cityCode }) => {
          const data = await AmadeusAPI.getHotelsByCity(cityCode);
          return {
            data,
          };
        },
      }),
      getHotelOffer: tool({
        description: "find the hotel's acommodation offer",
        parameters: z.object({
          hotelId: z.string().describe("hotel's amadeus id"),
        }),
        execute: async ({ hotelId }) => {
          const data = await AmadeusAPI.getHotelOffers([hotelId]);
          if (data.data) {
            console.log(data);
            return {
              data: data.data.offers,
            };
          } else {
            console.log(data);

            return {
              data: data,
            };
          }
        },
      }),
    },
  });

  console.log(">>>>>>>>>>>>>>> result: ", result);
  return result.toDataStreamResponse();
}

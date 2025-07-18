import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface Message {
  id: number;
  type: "modelResponse" | "userPrompt";
  text: string;
}
interface Part {
  text: string;
}
export interface ChatHistoryMessage {
  role: "user" | "model";
  parts: Part[];
}

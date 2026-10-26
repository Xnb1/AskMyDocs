
import ollama from "ollama";
import { env } from "../config/env.js";
// import dotenv from "dotenv";
// dotenv.config();

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/**
 * Sends the conversation to the model and calls onPiece()
 * every time a new piece of the answer arrives.
 * To switch to Claude or another model later, only this file changes.
 */
export async function streamAnswer(
  messages: ChatMessage[],
  onPiece: (text: string) => void
) {
  const stream = await ollama.chat({
    model: env.model,
    stream: true,
    options: { num_ctx: env.numCtx },
    messages,
  });

  for await (const chunk of stream) {
    if (chunk.message.content) onPiece(chunk.message.content);
  }
}

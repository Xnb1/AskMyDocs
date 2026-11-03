import { API_URL } from "./config.js";
import type { Msg } from "../types/chat.js";

/**
 * Sends the conversation to the server and reads the answer piece by piece.
 * onText is called with the full answer so far every time a new piece arrives.
 */
export async function streamChat(
  messages: Msg[],
  onText: (answerSoFar: string) => void
): Promise<string> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Server error (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let answer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    answer += decoder.decode(value, { stream: true });
    onText(answer);
  }

  return answer;
}

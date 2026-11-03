import { useState } from "react";
import { streamChat } from "../api/chatApi";
import type { Msg } from "../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      await streamChat(next, (answer) =>
        setMessages([...next, { role: "assistant", content: answer }])
      );
    } catch (err) {
      const reason = err instanceof Error ? err.message : "Something went wrong";
      setMessages([
        ...next,
        { role: "assistant", content: `⚠️ ${reason}. Is the server running?` },
      ]);
    } finally {
      setLoading(false); // always runs, so the button never gets stuck
    }
  }

  return { messages, loading, send };
}

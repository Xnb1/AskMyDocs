import type { Msg } from "../types/chat.js";

export default function MessageList({ messages }: { messages: Msg[] }) {
  return (
    <div>
      {messages.map((m, i) => (
        <p key={i} style={{ whiteSpace: "pre-wrap" }}>
          <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
        </p>
      ))}
    </div>
  );
}

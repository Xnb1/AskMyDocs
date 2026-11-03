import { useChat } from "../hooks/useChat.js";
import MessageList from "./MessageList.js";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const { messages, loading, send } = useChat();

  return (
    <div>
      <MessageList messages={messages} />
      <ChatInput onSend={send} disabled={loading} />
    </div>
  );
}

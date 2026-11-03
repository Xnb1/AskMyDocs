import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
  disabled: boolean;
};

export default function ChatInput({ onSend, disabled }: Props) {
  const [input, setInput] = useState("");

  function submit() {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  }

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Ask something..."
        style={{ width: "80%", padding: 8 }}
      />
      <button onClick={submit} disabled={disabled}>
        Send
      </button>
    </div>
  );
}

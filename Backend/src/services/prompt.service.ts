import { env } from "../config/env.js";
import type { StoredDoc } from "./document.store.js";

export function buildSystemPrompt(doc: StoredDoc | null): string {
  if (!doc) {
    return "You are a helpful assistant. Answer clearly and briefly.";
  }

  return `Answer the user's questions using ONLY the document below.
If the answer is not in the document, say "I can't find that in the document."

Document name: ${doc.name}

<document>
${doc.text.slice(0, env.maxDocChars)}
</document>`;
}
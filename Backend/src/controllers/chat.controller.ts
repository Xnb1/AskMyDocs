import type { Request, Response } from "express";
import { streamAnswer, type ChatMessage } from "../services/llm.service.js";
// import { getCurrentDoc, MAX_CHARS } from "../services/document.store.js";
import { getCurrentDoc } from "../services/document.store.js";
import {buildSystemPrompt } from "../services/prompt.service.js";

export async function chat(req: Request, res: Response) {
  const incoming = req.body?.messages;

  if (!Array.isArray(incoming) || incoming.length === 0) {
    res.status(400).json({ error: "messages must be a non-empty array" });
    return;
  }

  // Only accept user/assistant messages from the browser.
  // The system prompt is always built on the server.
  const history: ChatMessage[] = incoming.filter(
    (m): m is ChatMessage =>
      m &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string"
  );

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");

  try {
    const system = buildSystemPrompt(getCurrentDoc());
    await streamAnswer(
      [{ role: "system", content: system }, ...history],
      (piece) => res.write(piece)
    );
  } catch (err) {
    console.error(err);
    res.write("\n[Something went wrong]");
  }

  res.end();
}

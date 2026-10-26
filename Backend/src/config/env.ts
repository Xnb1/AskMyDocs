

import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Find the folder this file is in (src/config), then go one level up to src/
const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(here, "../.env") });

export const env = {
  port: Number(process.env.PORT ?? 3000),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  model: process.env.OLLAMA_MODEL ?? "gemma4:e2b",
  numCtx: Number(process.env.NUM_CTX ?? 8192),
  maxDocChars: Number(process.env.MAX_DOC_CHARS ?? 20000),
  maxUploadMb: 10,
};
// import multer from "multer";
// import { extractText, getDocumentProxy } from "unpdf";
// import app from '../app.js';

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
// });

// // Phase 2 only: one document kept in memory. We'll do per-user storage later.
// let currentDoc: { name: string; text: string } | null = null;
// const MAX_CHARS = 20000; // small models can only read so much at once

// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       res.status(400).json({ error: "No file uploaded" });
//       return;
//     }
//     const pdf = await getDocumentProxy(new Uint8Array(req.file.buffer));
//     const { totalPages, text } = await extractText(pdf, { mergePages: true });

//     if (!text.trim()) {
//       res.status(422).json({ error: "No text found (maybe a scanned PDF)" });
//       return;
//     }

//     currentDoc = { name: req.file.originalname, text };
//     res.json({
//       name: currentDoc.name,
//       pages: totalPages,
//       chars: text.length,
//       truncated: text.length > MAX_CHARS,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Could not read the PDF" });
//   }
// });

import { Router } from "express";
import { chat } from "../controllers/chat.controller.js";

const router = Router();

router.post("/", chat); // POST /api/chat

export default router;

import type { Request, Response } from "express";
import { extractPdfText } from "../services/pdf.service.js";
import { setCurrentDoc } from "../services/document.store.js";
import { env } from "../config/env.js";

export async function uploadDocument(req: Request, res: Response) {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const { totalPages, text } = await extractPdfText(req.file.buffer);

    if (!text.trim()) {
      res.status(422).json({ error: "No text found (maybe a scanned PDF)" });
      return;
    }

    setCurrentDoc({ name: req.file.originalname, text });

    res.json({
      name: req.file.originalname,
      pages: totalPages,
      chars: text.length,
      truncated: text.length > env.maxDocChars,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not read the PDF" });
  }
}

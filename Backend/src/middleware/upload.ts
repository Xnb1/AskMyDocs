import multer from "multer";
import { env } from "../config/env.js";

export const upload = multer({
  storage: multer.memoryStorage(),

  limits: { fileSize: env.maxUploadMb * 1024 * 1024 },
  
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(Object.assign(new Error("Only PDF files are allowed"), { status: 400 }));
      return;
    }
    cb(null, true);
  },
});

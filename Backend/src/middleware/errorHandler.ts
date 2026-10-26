import type { NextFunction, Request, Response } from "express";
import multer from "multer";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof multer.MulterError) {
    const tooLarge = err.code === "LIMIT_FILE_SIZE";
    res
      .status(tooLarge ? 413 : 400)
      .json({ error: tooLarge ? "File is too large" : err.message });
    return;
  }

  const status = (err as { status?: number })?.status ?? 500;
  if (status === 500) console.error(err);

  res.status(status).json({
    error: status === 500 ? "Internal server error" : (err as Error).message,
  });
}

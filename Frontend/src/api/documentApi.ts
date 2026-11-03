import { API_URL } from "./config.js";
import type { UploadResult } from "../types/document.js";

export async function uploadPdf(file: File): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/api/documents/upload`, {
    method: "POST",
    body: form, // don't set Content-Type here, the browser does it for files
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error ?? "Upload failed");
  }

  return data as UploadResult;
}

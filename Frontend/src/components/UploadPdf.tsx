import { useState } from "react";
import { uploadPdf } from "../api/documentApi.js";

export default function UploadPdf() {
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus("Uploading...");

    try {
      const result = await uploadPdf(file);
      setStatus(
        `Loaded: ${result.name} (${result.pages} pages)` +
          (result.truncated ? " ⚠️ too long, only the first part is used" : "")
      );
    } catch (err) {
      const reason = err instanceof Error ? err.message : "Upload failed";
      setStatus(`Error: ${reason}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        disabled={uploading}
      />
      {status && <p>{status}</p>}
    </div>
  );
}

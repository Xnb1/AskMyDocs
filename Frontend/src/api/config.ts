// Set VITE_API_URL in client/.env to change it (e.g. for deployment).
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type StoredDoc = { name: string; text: string };

// Phase 2 only: one document kept in memory for the whole server.
// Later phases replace this with per-user storage in a database.
let currentDoc: StoredDoc | null = null;

export function setCurrentDoc(doc: StoredDoc) {
  currentDoc = doc;
}

export function getCurrentDoc() {
  return currentDoc;
}